import { DieFace } from 'core/types'
import { BidUtils, DieUtils } from 'core/utils'

test('Test makeBid, makeNullBid, isNullBid', () => {
    const testBid = BidUtils.makeBid(11, DieFace.Six)
    expect(testBid.quantity).toBe(11)
    expect(testBid.dieFace).toBe(DieFace.Six)
    expect(BidUtils.isNullBid(testBid)).toBe(false)

    const testNullBid = BidUtils.makeNullBid()
    expect(BidUtils.isNullBid(testNullBid)).toBe(true)
})

test('Test Bid toNumber', () => {
    const testCases = [
        { bid: BidUtils.makeBid(4, DieFace.Six),    expectedResult: 46  },
        { bid: BidUtils.makeBid(2, DieFace.Joker),  expectedResult: 50  },
        { bid: BidUtils.makeBid(1, DieFace.Two),    expectedResult: 12  },
        { bid: BidUtils.makeBid(30, DieFace.Joker), expectedResult: 610 },
    ]
    testCases.forEach((testCase) => {
        expect(BidUtils.toNumber(testCase.bid)).toBe(testCase.expectedResult)
    })
})

test('Test Bid compare', () => {
    const testCases = [
        { bidA: BidUtils.makeBid(4, DieFace.Six), bidB: BidUtils.makeBid(2, DieFace.Joker), expectedResult: -1 },
        { bidA: BidUtils.makeBid(4, DieFace.Six), bidB: BidUtils.makeBid(4, DieFace.Five),  expectedResult: 1  },
        { bidA: BidUtils.makeBid(4, DieFace.Six), bidB: BidUtils.makeBid(4, DieFace.Six),   expectedResult: 0  },
        { bidA: BidUtils.makeNullBid(),           bidB: BidUtils.makeBid(1, DieFace.One),   expectedResult: -1 },
        { bidA: BidUtils.makeNullBid(),           bidB: BidUtils.makeBid(1, DieFace.Two),   expectedResult: -1 },
        { bidA: BidUtils.makeNullBid(),           bidB: BidUtils.makeNullBid(),             expectedResult: 0  },
    ]
    testCases.forEach((testCase) => {
        expect(Math.sign(BidUtils.compare(testCase.bidA, testCase.bidB))).toBe(testCase.expectedResult)
    })
})

describe('Test makeAvailableBids', () => {
    const testMaxBidQuantity = 3
    const testMaxNumberOfBids = testMaxBidQuantity * DieUtils.DIE_FACES
    
    test('Normal round, first turn', () => {
        const currentBid = BidUtils.makeNullBid()
        const availableBids = BidUtils.makeAvailableBids({
            startingBid: currentBid,
            numberOfBids: testMaxNumberOfBids,
            maxBidQuantity: testMaxBidQuantity,
            isMaputoRound: false,
        })
        expect(availableBids).not.toContain(expect.objectContaining({ dieFace: DieFace.Joker }))
        expect(availableBids).not.toContain(expect.objectContaining({ dieFace: DieFace.One }))
        expect(availableBids.length).toBe(15)
    })

    test('Normal round, second turn', () => {
        const currentBid = BidUtils.makeBid(1, DieFace.Two)
        const availableBids = BidUtils.makeAvailableBids({
            startingBid: currentBid,
            numberOfBids: testMaxNumberOfBids,
            maxBidQuantity: testMaxBidQuantity,
            isMaputoRound: false,
        })
        expect(availableBids).not.toContain(expect.objectContaining({ dieFace: DieFace.One }))
        expect(availableBids.length).toBe(17)
    })

    test('Maputo round, first turn', () => {
        const currentBid = BidUtils.makeNullBid()
        const availableBids = BidUtils.makeAvailableBids({
            startingBid: currentBid,
            numberOfBids: testMaxNumberOfBids,
            maxBidQuantity: testMaxBidQuantity,
            isMaputoRound: true,
        })
        expect(availableBids).not.toContain(expect.objectContaining({ dieFace: DieFace.Joker }))
        expect(availableBids.length).toBe(18)
    })

    test('Maputo round, second turn', () => {
        const currentBid = BidUtils.makeBid(1, DieFace.Two)
        const availableBids = BidUtils.makeAvailableBids({
            startingBid: currentBid,
            numberOfBids: testMaxNumberOfBids,
            maxBidQuantity: testMaxBidQuantity,
            isMaputoRound: true,
        })
        expect(availableBids.every((bid) => bid.dieFace === DieFace.Two)).toBe(true)
        expect(availableBids.length).toBe(2)
    })
})