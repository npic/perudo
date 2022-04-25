import DieFace from './face/DieFace'
import * as DiceSetUtils from './DiceSetUtils'
import * as DieFaceUtils from './face/DieFaceUtils'

test('Test makeDiceSet', () => {
    let testDiceSet = DiceSetUtils.makeDiceSet(5, true)
    expect(testDiceSet.length).toBe(5);
    [0, 1, 2, 3].forEach((i) => {
        expect(DieFaceUtils.toNumber(testDiceSet[i].value))
            .toBeLessThanOrEqual(DieFaceUtils.toNumber(testDiceSet[i + 1].value))
    })
})

test('Test DiceSet countPoints', () => {
    let testDiceSet = DiceSetUtils.makeDiceSet(5, true)
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
