import { placeBid, checkBid } from '../../app/actions'
import { randomPick } from '../util'
import GameRoom from '../room/GameRoom'
import * as GameRoomUtils from '../room/GameRoomUtils'
import * as BidUtils from '../bid/BidUtils'

export function makeAIMove(room: GameRoom) {
    const remainingDiceCount = GameRoomUtils.getTotalDiceCount(room)
    const bids = BidUtils.nextBidsGenerator({
        startingBid: room.currentBid,
        maxQuantity: remainingDiceCount,
        isMaputoRound: room.isMaputoRound
    })
    const currentPlayer = room.players[room.currentTurnPlayerIndex]
    let candidates = []
    for (let i = 0; i < 35; i++) {
        let bid = bids.next().value
        if (bid) {
            candidates.push({
                bid: bid,
                probability: 100 * BidUtils.calculateBidProbability({
                    bid: bid,
                    knownDice: currentPlayer.dice,
                    remainingDiceCount: remainingDiceCount,
                    withJokers: !room.isMaputoRound
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