import { range, product } from '../util'
import Bid from './Bid'
import Die from '../dice/Die'
import DieFace from '../dice/face/DieFace'
import * as DieUtils from '../dice/DieUtils'
import * as DieFaceUtils from '../dice/face/DieFaceUtils'

export function makeBid(quantity: number, dieFace: DieFace): Bid {
    return {
        quantity: quantity,
        dieFace: dieFace,
    }
}

export function makeNullBid(): Bid {
    return makeBid(0, DieFace.Joker)
}

export function isNullBid(bid: Bid) {
    return bid.quantity === 0
}

export function toNumber(bid: Bid): number {
    return (bid.dieFace === DieFace.Joker ? bid.quantity * 2 + 1 : bid.quantity) * 10 + DieFaceUtils.toNumber(bid.dieFace)
}

export function compare(bidA: Bid, bidB: Bid) {
    return toNumber(bidA) - toNumber(bidB)
}

export function* nextBidsGenerator({ startingBid, maxQuantity, isMaputoRound }: { startingBid: Bid, maxQuantity: number, isMaputoRound: boolean }) {
    const facesGenerator = function*(withJokers: boolean) {
        while (true) {
            yield (withJokers ? DieFace.Joker : DieFace.One)
            yield DieFace.Two
            yield DieFace.Three
            yield DieFace.Four
            yield DieFace.Five
            yield DieFace.Six
        }
    }
    const faces = facesGenerator(!isMaputoRound)
    const allPossibleBids: Bid[] =
        range(maxQuantity * DieUtils.MAX_FACES)
            .map((i) => makeBid(Math.floor(i / DieUtils.MAX_FACES) + 1, faces.next().value))
            .filter((bid) => {
                const increasingBidsRule = compare(bid, startingBid) > 0
                const firstBidIsNotAJokerRule = isNullBid(startingBid) ? bid.dieFace !== DieFace.Joker : true
                const maputoRule = isMaputoRound && startingBid.quantity > 0 ? bid.dieFace === startingBid.dieFace : true
                
                return increasingBidsRule
                    && firstBidIsNotAJokerRule
                    && maputoRule
            })
            .sort(compare)
    for (let bid of allPossibleBids) {
        yield bid
    }
}

export function calculateBidProbability({ bid, knownDice, remainingDiceCount, withJokers }: { bid: Bid, knownDice: Die[], remainingDiceCount: number, withJokers: boolean }) {
    const unknownDiceCount = remainingDiceCount - knownDice.length

    const knownDiceBonus =
        knownDice
            .filter((die) => DieUtils.matches(die, bid.dieFace))
            .length
    
    if (knownDiceBonus >= bid.quantity) {
        // if we've got enough dice on our own already, the probability is 100%
        return 1.0
    }

    const factorial = (x: number) =>
        range(1, x + 1)
            .map((element) => BigInt(element))
            .reduce(product, BigInt(1))
    
    const numberOfCombinations = (totalNumberOfElements: number, numberOfChosenElements: number) =>
        Number(
            factorial(totalNumberOfElements)
            / (
                factorial(numberOfChosenElements)
                * factorial(totalNumberOfElements - numberOfChosenElements)
            )
        )
    
    const exactlyNSameValuesProbability = (N: number) => {
        let numberOfGoodCases = (bid.dieFace === DieFace.Joker || !withJokers) ? 1.0 : 2.0
        return numberOfCombinations(unknownDiceCount, N)
            * (numberOfGoodCases / DieUtils.MAX_FACES) ** N
            * ((DieUtils.MAX_FACES - numberOfGoodCases) / DieUtils.MAX_FACES) ** (unknownDiceCount - N)
    }

    let result = 0.0
    for (let N = bid.quantity - knownDiceBonus; N <= unknownDiceCount; N++) {
        result += exactlyNSameValuesProbability(N)
    }
    return result
}