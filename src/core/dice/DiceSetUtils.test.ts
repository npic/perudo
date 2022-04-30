import { DieFace } from 'core/types'
import { DieUtils, DiceSetUtils } from 'core/utils'

test('Test makeDiceSet', () => {
    const testDiceSet = DiceSetUtils.makeDiceSet(5, true)
    expect(testDiceSet.length).toBe(5);
    [0, 1, 2, 3].forEach((i) => {
        expect(DieUtils.toNumber(testDiceSet[i]))
            .toBeLessThanOrEqual(DieUtils.toNumber(testDiceSet[i + 1]))
    })
})

test('Test DiceSet countPoints', () => {
    const testDiceSet = DiceSetUtils.makeDiceSet(5, true)
    testDiceSet[0].value = DieFace.Joker
    testDiceSet[1].value = DieFace.Joker
    testDiceSet[2].value = DieFace.Three
    testDiceSet[3].value = DieFace.Three
    testDiceSet[4].value = DieFace.Six

    const testCases = [
        { matchWith: DieFace.Joker, expectedResult: 2 },
        { matchWith: DieFace.One,   expectedResult: 2 },
        { matchWith: DieFace.Two,   expectedResult: 2 },
        { matchWith: DieFace.Three, expectedResult: 4 },
        { matchWith: DieFace.Four,  expectedResult: 2 },
        { matchWith: DieFace.Five,  expectedResult: 2 },
        { matchWith: DieFace.Six,   expectedResult: 3 },
    ]
    testCases.forEach((testCase) => {
        expect(DiceSetUtils.countPoints(testDiceSet, testCase.matchWith)).toBe(testCase.expectedResult)
    })
})
