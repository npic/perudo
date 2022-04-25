import DieFace from '../dice/face/DieFace'
import * as BidUtils from './BidUtils'

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

describe('Test nextBidsGenerator', () => {
    test('Normal round, first turn', () => {
        const currentBid = BidUtils.makeNullBid()
        const testGenerator = BidUtils.nextBidsGenerator({ startingBid: currentBid, maxQuantity: 3, isMaputoRound: false })
        let nextBid
        let numberOfBids = 0
        while (nextBid = testGenerator.next().value) {
            numberOfBids++
            expect(nextBid.dieFace).not.toEqual(DieFace.Joker)
            expect(nextBid.dieFace).not.toEqual(DieFace.One)
        }
        expect(numberOfBids).toBe(15)
    })

    test('Normal round, second turn', () => {
        const currentBid = BidUtils.makeBid(1, DieFace.Two)
        const testGenerator = BidUtils.nextBidsGenerator({ startingBid: currentBid, maxQuantity: 3, isMaputoRound: false })
        let nextBid
        let numberOfBids = 0
        while (nextBid = testGenerator.next().value) {
            numberOfBids++
            expect(nextBid.dieFace).not.toEqual(DieFace.One)
        }
        expect(numberOfBids).toBe(17)
    })

    test('Maputo round, first turn', () => {
        const currentBid = BidUtils.makeNullBid()
        const testGenerator = BidUtils.nextBidsGenerator({ startingBid: currentBid, maxQuantity: 3, isMaputoRound: true })
        let nextBid
        let numberOfBids = 0
        while (nextBid = testGenerator.next().value) {
            numberOfBids++
            expect(nextBid.dieFace).not.toEqual(DieFace.Joker)
        }
        expect(numberOfBids).toBe(18)
    })

    test('Maputo round, second turn', () => {
        const currentBid = BidUtils.makeBid(1, DieFace.Two)
        const testGenerator = BidUtils.nextBidsGenerator({ startingBid: currentBid, maxQuantity: 3, isMaputoRound: true })
        let nextBid
        let numberOfBids = 0
        while (nextBid = testGenerator.next().value) {
            numberOfBids++
            expect(nextBid.dieFace).toEqual(DieFace.Two)
        }
        expect(numberOfBids).toBe(2)
    })
})