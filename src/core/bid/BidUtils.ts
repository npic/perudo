import { range } from '../util'
import Bid from './Bid'
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
        range(maxQuantity * DieUtils.DIE_FACES)
            .map((i) => makeBid(Math.floor(i / DieUtils.DIE_FACES) + 1, faces.next().value))
            .filter((bid) => {
                const increasingBidsRule = compare(bid, startingBid) > 0
                const firstBidIsNotAJokerRule = isNullBid(startingBid) ? bid.dieFace !== DieFace.Joker : true
                const maputoRule = isMaputoRound && !isNullBid(startingBid) ? bid.dieFace === startingBid.dieFace : true
                
                return increasingBidsRule
                    && firstBidIsNotAJokerRule
                    && maputoRule
            })
            .sort(compare)
    for (let bid of allPossibleBids) {
        yield bid
    }
}
