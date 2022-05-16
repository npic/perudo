import { createAction } from '@reduxjs/toolkit'
import { DieFace, PlayerType, Bid } from 'core/types'
import { AIUtils, PlayerUtils, GameRoomUtils } from 'core/utils'

test('Test makeAIMove', () => {
    const testRoom = GameRoomUtils.makeGameRoom()
    testRoom.players = [
        PlayerUtils.makePlayer({ name: 'Player 1', type: PlayerType.AI, aiRiskLowerBound: 20, aiRiskUpperBound: 60, aiTopBidsSimilarityThreshold: 0, aiDelay: 0 }),
        PlayerUtils.makePlayer({ name: 'Player 2', type: PlayerType.Human }),
        PlayerUtils.makePlayer({ name: 'Player 3', type: PlayerType.Human }),
    ]
    testRoom.players[0].diceOwned = 5
    testRoom.players[0].dice = [
        { value: DieFace.Two },
        { value: DieFace.Three },
        { value: DieFace.Four },
        { value: DieFace.Five },
        { value: DieFace.Six },
    ]
    testRoom.players[1].diceOwned = 3
    testRoom.players[1].dice = [
        { value: DieFace.Four },
        { value: DieFace.Five },
        { value: DieFace.Six },
    ]
    testRoom.players[2].diceOwned = 1
    testRoom.players[2].dice = [
        { value: DieFace.Joker },
    ]
    testRoom.currentRoundNumber = 7
    testRoom.isMaputoRound = false
    testRoom.currentTurnPlayerIndex = 0
    testRoom.previousTurnPlayerIndex = 2
    testRoom.currentBid = { quantity: 8, dieFace: DieFace.Joker }

    const testAIDecisions = {
        bid: createAction<Bid>('testBid'),
        check: createAction('testCheck'),
    }

    const resultAction = AIUtils.makeAIMove(testRoom, testAIDecisions)
    expect(resultAction.type).toBe('testCheck')
})

test('Test factorial', () => {
    const testCases = [
        { x: 0, expectedResult: BigInt(1) },
        { x: 1, expectedResult: BigInt(1) },
        { x: 2, expectedResult: BigInt(2) },
        { x: 3, expectedResult: BigInt(6) },
        { x: 4, expectedResult: BigInt(24) },
        { x: 5, expectedResult: BigInt(120) },
        { x: 6, expectedResult: BigInt(720) },
    ]
    testCases.forEach((testCase) => {
        expect(AIUtils._testVisibility.factorial(testCase.x)).toBe(testCase.expectedResult)
    })
})

test('Test numberOfCombinations', () => {
    const testCases = [
        { totalNumberOfElements: 30, numberOfChosenElements: 15, expectedResult: 155117520 },
        { totalNumberOfElements: 30, numberOfChosenElements: 30, expectedResult: 1 },
        { totalNumberOfElements: 30, numberOfChosenElements: 1, expectedResult: 30 },
        { totalNumberOfElements: 30, numberOfChosenElements: 5, expectedResult: 142506 },
    ]
    testCases.forEach((testCase) => {
        expect(AIUtils._testVisibility.numberOfCombinations(
            testCase.totalNumberOfElements,
            testCase.numberOfChosenElements
        )).toBe(testCase.expectedResult)
    })
})

test('Test exactlyNDiceMatchProbability', () => {
    const testCases = [
        { N: 4, unknownDiceCount: 30, numberOfMatchingFaces: 1, expectedResult: 0.1847194 },
        { N: 4, unknownDiceCount: 30, numberOfMatchingFaces: 2, expectedResult: 0.00893248 },
        { N: 12, unknownDiceCount: 30, numberOfMatchingFaces: 1, expectedResult: 0.001492467 },
        { N: 12, unknownDiceCount: 30, numberOfMatchingFaces: 2, expectedResult: 0.1101246 },
    ]
    testCases.forEach((testCase) => {
        expect(AIUtils._testVisibility.exactlyNDiceMatchProbability(
            testCase.N,
            testCase.unknownDiceCount,
            testCase.numberOfMatchingFaces
        )).toBeCloseTo(testCase.expectedResult, 4)
    })
})

test('Test calculateBidProbability', () => {
    const testCases = [
        {
            args: {
                bid: {
                    quantity: 1,
                    dieFace: DieFace.Five
                },
                knownDice: [ { value: DieFace.Six } ],
                totalDiceCount: 30,
                isMaputoRound: false,
            },
            expectedResult: 0.999995,
        },
        {
            args: {
                bid: {
                    quantity: 11,
                    dieFace: DieFace.Five
                },
                knownDice: [ { value: DieFace.Five }, { value: DieFace.Six } ],
                totalDiceCount: 30,
                isMaputoRound: false,
            },
            expectedResult: 0.464487,
        },
        {
            args: {
                bid: {
                    quantity: 3,
                    dieFace: DieFace.Three
                },
                knownDice: [ { value: DieFace.Six } ],
                totalDiceCount: 10,
                isMaputoRound: false,
            },
            expectedResult: 0.622822,
        },
        {
            args: {
                bid: {
                    quantity: 3,
                    dieFace: DieFace.Three
                },
                knownDice: [ { value: DieFace.Six } ],
                totalDiceCount: 10,
                isMaputoRound: true,
            },
            expectedResult: 0.1782596,
        },
    ]
    testCases.forEach((testCase) => {
        expect(AIUtils._testVisibility.calculateBidProbability(testCase.args)).toBeCloseTo(testCase.expectedResult, 4)
    })
})