import { placeBid, checkBid } from '../../app/actions'
import { range, randomPick, sum, product } from '../util'
import Bid from '../bid/Bid'
import DiceSet from '../dice/DiceSet'
import DieFace from '../dice/face/DieFace'
import GameRoom from '../room/GameRoom'
import * as BidUtils from '../bid/BidUtils'
import * as DieUtils from '../dice/DieUtils'
import * as GameRoomUtils from '../room/GameRoomUtils'

export function makeAIMove(room: GameRoom) {
    const totalDiceCount = GameRoomUtils.getTotalDiceCount(room)
    const bids = BidUtils.nextBidsGenerator({
        startingBid: room.currentBid,
        maxQuantity: totalDiceCount,
        isMaputoRound: room.isMaputoRound
    })
    const currentPlayer = room.players[room.currentTurnPlayerIndex]
    let candidates = []
    for (let i = 0; i < 35; i++) {
        let bid = bids.next().value
        if (bid) {
            candidates.push({
                bid: bid,
                probability: 100 * calculateBidProbability({
                    bid: bid,
                    knownDice: currentPlayer.dice,
                    totalDiceCount: totalDiceCount,
                    isMaputoRound: room.isMaputoRound
                }),
            })
        } else {
            break
        }
    }
    candidates = candidates
        .filter((candidate) => candidate.probability >= currentPlayer.aiRiskCurrentValue)
        .sort((candidateA, candidateB) => candidateB.probability - candidateA.probability)
    if (candidates.length === 0) {
        return checkBid()
    } else {
        let topBidsThreshold = candidates[0].probability - currentPlayer.aiTopBidsSimilarityThreshold
        candidates = candidates.filter((candidate) => candidate.probability >= topBidsThreshold)
        return placeBid(randomPick(candidates)!.bid)
    }
}

function factorial(x: number): bigint {
    return range(1, x + 1)
        .map((element) => BigInt(element))
        .reduce(product, BigInt(1))
}

function numberOfCombinations(totalNumberOfElements: number, numberOfChosenElements: number): number {
    return Number(
        factorial(totalNumberOfElements)
        /
        (
            factorial(numberOfChosenElements)
            * factorial(totalNumberOfElements - numberOfChosenElements)
        )
    )
}

function exactlyNDiceMatchProbability(N: number, unknownDiceCount: number, numberOfMatchingFaces: number): number {
    return numberOfCombinations(unknownDiceCount, N)
        * (numberOfMatchingFaces / DieUtils.DIE_FACES) ** N
        * ((DieUtils.DIE_FACES - numberOfMatchingFaces) / DieUtils.DIE_FACES) ** (unknownDiceCount - N)
}

interface CalculateBidProbabilityArguments {
    bid: Bid,
    knownDice: DiceSet,
    totalDiceCount: number,
    isMaputoRound: boolean
}
function calculateBidProbability({ bid, knownDice, totalDiceCount, isMaputoRound }: CalculateBidProbabilityArguments) {
    // How many dice other players have?
    const unknownDiceCount = totalDiceCount - knownDice.length

    // How many matching dice we have?
    const knownMatchingDiceCount =
        knownDice
            .filter((die) => DieUtils.matches(die, bid.dieFace))
            .length
    
    // If the bid is a Joker, or we're playing a Maputo round,
    // then the probability of a single die matching the bid is 1/6 - only the same value would match the bid.
    // Otherwise, it's 2/6 - a die could have the same value or a Joker.
    const numberOfMatchingFaces = (bid.dieFace === DieFace.Joker || isMaputoRound) ? 1 : 2
    
    if (knownMatchingDiceCount >= bid.quantity) {
        // If we've got enough dice to fully cover the bid, the probability is 100%
        return 1.0
    } else {
        // Otherwise, the total probability of "at least X dice match" is the sum of "exactly N dice match" probabilities,
        // with N ranging from X to the number of unknown dice.
        // E.g. if other players have 5 dice, and we need to calculate a probability of at least 2 dice matching the bid,
        // the formula would be P(2+) = P(2) + P(3) + P(4) + P(5)
        return range(bid.quantity - knownMatchingDiceCount, unknownDiceCount + 1)
            .map((N) => exactlyNDiceMatchProbability(N, unknownDiceCount, numberOfMatchingFaces))
            .reduce(sum, 0.0)
    }
}
