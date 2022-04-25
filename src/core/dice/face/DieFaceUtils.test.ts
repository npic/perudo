import DieFace from './DieFace'
import * as DieFaceUtils from './DieFaceUtils'

test('Test Die Face conversion routines', () => {
    const testCases = [
        { dieFace: DieFace.Joker, expectedBootstrapClass: 'bi-star-fill',   expectedNumber: 0 },
        { dieFace: DieFace.One,   expectedBootstrapClass: 'bi-dice-1-fill', expectedNumber: 1 },
        { dieFace: DieFace.Two,   expectedBootstrapClass: 'bi-dice-2-fill', expectedNumber: 2 },
        { dieFace: DieFace.Three, expectedBootstrapClass: 'bi-dice-3-fill', expectedNumber: 3 },
        { dieFace: DieFace.Four,  expectedBootstrapClass: 'bi-dice-4-fill', expectedNumber: 4 },
        { dieFace: DieFace.Five,  expectedBootstrapClass: 'bi-dice-5-fill', expectedNumber: 5 },
        { dieFace: DieFace.Six,   expectedBootstrapClass: 'bi-dice-6-fill', expectedNumber: 6 },
    ]

    testCases.forEach((testCase) => {
        expect(DieFaceUtils.toBootstrapIconClass(testCase.dieFace)).toBe(testCase.expectedBootstrapClass)
        expect(DieFaceUtils.toNumber(testCase.dieFace)).toBe(testCase.expectedNumber)
    })
})