import { Bid, DieFace } from 'core/types'
import { DieUtils, range } from 'core/utils'

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
    return (bid.dieFace === DieFace.Joker ? bid.quantity * 2 + 1 : bid.quantity) * 10 + DieUtils.toNumber(bid.dieFace)
}

export function compare(bidA: Bid, bidB: Bid) {
    return toNumber(bidA) - toNumber(bidB)
}

interface MakeAvailableBidsArguments {
    startingBid: Bid
    numberOfBids: number
    maxBidQuantity: number
    isMaputoRound: boolean
}
export function makeAvailableBids({ startingBid, numberOfBids, maxBidQuantity, isMaputoRound }: MakeAvailableBidsArguments) {
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
    const isFirstTurn = isNullBid(startingBid)
    const availableBids: Bid[] =
        range(maxBidQuantity * DieUtils.DIE_FACES)
            .map((i) => makeBid(Math.floor(i / DieUtils.DIE_FACES) + 1, faces.next().value))
            .filter((bid) => {
                const increasingBidsRule = compare(bid, startingBid) > 0
                const firstBidIsNotAJokerRule = isFirstTurn ? bid.dieFace !== DieFace.Joker : true
                const maputoRule = isMaputoRound && !isFirstTurn ? bid.dieFace === startingBid.dieFace : true
                
                return increasingBidsRule
                    && firstBidIsNotAJokerRule
                    && maputoRule
            })
            .sort(compare)
    availableBids.splice(numberOfBids)
    return availableBids
}
