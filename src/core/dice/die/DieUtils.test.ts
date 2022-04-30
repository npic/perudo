import { DieFace } from 'core/types'
import { DieUtils } from 'core/utils'

test('Test makeDie', () => {
    const ordinaryDieFaces = [ DieFace.Joker, DieFace.Two, DieFace.Three, DieFace.Four, DieFace.Five, DieFace.Six ]
    const maputoDieFaces = [ DieFace.One, DieFace.Two, DieFace.Three, DieFace.Four, DieFace.Five, DieFace.Six ]

    for (let i = 0; i < 10000; i++) {
        const testDie = DieUtils.makeDie(true)
        expect(ordinaryDieFaces).toContain(testDie.value)

        const testMaputoDie = DieUtils.makeDie(false)
        expect(maputoDieFaces).toContain(testMaputoDie.value)
    }
})

test('Test isDie', () => {
    const testCases = [
        { testObject: DieUtils.makeDie(true), expectedResult: true },
        { testObject: DieUtils.makeDie(false), expectedResult: true },
        { testObject: { value: DieFace.Joker }, expectedResult: true },
        { testObject: { value: 3 }, expectedResult: true },
        { testObject: { value: 'FAIL' }, expectedResult: false },
        { testObject: 'FAIL', expectedResult: false },
        { testObject: 123, expectedResult: false },
        { testObject: DieFace.Joker, expectedResult: false },
    ]

    testCases.forEach((testCase) => expect(DieUtils._testVisibility.isDie(testCase.testObject)).toBe(testCase.expectedResult))
})

test('Test Die castToDieFace', () => {
    const testDie = DieUtils.makeDie(true)
    const testCases = [
        { testObject: testDie,       expectedResult: testDie.value },
        { testObject: DieFace.Joker, expectedResult: DieFace.Joker },
        { testObject: DieFace.One,   expectedResult: DieFace.One   },
        { testObject: DieFace.Two,   expectedResult: DieFace.Two   },
        { testObject: DieFace.Three, expectedResult: DieFace.Three },
        { testObject: DieFace.Four,  expectedResult: DieFace.Four  },
        { testObject: DieFace.Five,  expectedResult: DieFace.Five  },
        { testObject: DieFace.Six,   expectedResult: DieFace.Six   },
    ]
    
    testCases.forEach((testCase) => expect(DieUtils._testVisibility.castToDieFace(testCase.testObject)).toBe(testCase.expectedResult))
})

test('Test Die conversion routines', () => {
    const testCases = [
        { dieFace: DieFace.Joker, expectedBootstrapClass: 'bi-star-fill',   expectedNumber: 0 },
        { dieFace: DieFace.One,   expectedBootstrapClass: 'bi-dice-1-fill', expectedNumber: 1 },
        { dieFace: DieFace.Two,   expectedBootstrapClass: 'bi-dice-2-fill', expectedNumber: 2 },
        { dieFace: DieFace.Three, expectedBootstrapClass: 'bi-dice-3-fill', expectedNumber: 3 },
        { dieFace: DieFace.Four,  expectedBootstrapClass: 'bi-dice-4-fill', expectedNumber: 4 },
        { dieFace: DieFace.Five,  expectedBootstrapClass: 'bi-dice-5-fill', expectedNumber: 5 },
        { dieFace: DieFace.Six,   expectedBootstrapClass: 'bi-dice-6-fill', expectedNumber: 6 },
    ]

    const testDie = DieUtils.makeDie(true)
    testCases.forEach((testCase) => {
        expect(DieUtils.toBootstrapIconClass(testCase.dieFace)).toBe(testCase.expectedBootstrapClass)
        expect(DieUtils.toNumber(testCase.dieFace)).toBe(testCase.expectedNumber)
        
        testDie.value = testCase.dieFace
        expect(DieUtils.toBootstrapIconClass(testDie)).toBe(testCase.expectedBootstrapClass)
        expect(DieUtils.toNumber(testDie)).toBe(testCase.expectedNumber)
    })
})

test('Test Die compare', () => {
    const testDieA = DieUtils.makeDie(true)
    const testDieB = DieUtils.makeDie(true)
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
    const testDie = DieUtils.makeDie(true)
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
