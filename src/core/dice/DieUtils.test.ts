import DieFace from './face/DieFace'
import * as DieUtils from './DieUtils'

test('Test makeDie', () => {
    let testDie = DieUtils.makeDie(true)
    expect(testDie.faces.length).toBe(DieUtils.DIE_FACES)
    expect(testDie.faces).toContain(DieFace.Joker)
    expect(testDie.faces).toContain(testDie.value)

    let testMaputoDie = DieUtils.makeDie(false)
    expect(testMaputoDie.faces.length).toBe(DieUtils.DIE_FACES)
    expect(testMaputoDie.faces).not.toContain(DieFace.Joker)
    expect(testMaputoDie.faces).toContain(testMaputoDie.value)
})

test('Test Die roll', () => {
    let testDie = DieUtils.makeDie(true)
    for (let i = 0; i < 1000; i++) {
        DieUtils.roll(testDie)
        expect(testDie.faces).toContain(testDie.value)
    }
})

test('Test Die toNumber', () => {
    let testDie = DieUtils.makeDie(true)
    const testCases = [
        { dieValue: DieFace.Joker, expectedNumber: 0 },
        { dieValue: DieFace.One,   expectedNumber: 1 },
        { dieValue: DieFace.Two,   expectedNumber: 2 },
        { dieValue: DieFace.Three, expectedNumber: 3 },
        { dieValue: DieFace.Four,  expectedNumber: 4 },
        { dieValue: DieFace.Five,  expectedNumber: 5 },
        { dieValue: DieFace.Six,   expectedNumber: 6 },
    ]
    testCases.forEach((testCase) => {
        testDie.value = testCase.dieValue
        expect(DieUtils.toNumber(testDie)).toBe(testCase.expectedNumber)
    })
})

test('Test Die compare', () => {
    let testDieA = DieUtils.makeDie(true)
    let testDieB = DieUtils.makeDie(true)
    const allDieFacesOrdered = [
        DieFace.Joker,
        DieFace.One,
        DieFace.Two,
        DieFace.Three,
        DieFace.Four,
        DieFace.Five,
        DieFace.Six,
    ]
    allDieFacesOrdered.forEach((dieFaceA, indexA) => {
        testDieA.value = dieFaceA
        allDieFacesOrdered.forEach((dieFaceB, indexB) => {
            testDieB.value = dieFaceB
            expect(Math.sign(DieUtils.compare(testDieA, testDieB))).toBe(Math.sign(indexA - indexB))
        })
    })
})

test('Test Die matches', () => {
    let testDie = DieUtils.makeDie(true)
    const allDieFaces = [
        DieFace.Joker,
        DieFace.One,
        DieFace.Two,
        DieFace.Three,
        DieFace.Four,
        DieFace.Five,
        DieFace.Six,
    ]
    allDieFaces.forEach((dieFace) => {
        testDie.value = dieFace
        if (testDie.value === DieFace.Joker) {
            expect(allDieFaces.every((matchWith) => DieUtils.matches(testDie, matchWith))).toBe(true)
        } else {
            allDieFaces.forEach((matchWith) => {
                expect(DieUtils.matches(testDie, matchWith)).toBe(testDie.value === matchWith)
            })
        }
    })
})
