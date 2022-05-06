import { sum, product, range, randomNumber, randomPick, shuffle, roundRobin } from 'core/utils'

test('Test util.sum', () => {
    const testCases = [
        { array: [], expectedResult: 0 },
        { array: [1, 2, 3, 4, 5], expectedResult: 15 },
        { array: [-100, 200, -300, 400, 0, 0], expectedResult: 200 },
    ]
    testCases.forEach((testCase) => expect(testCase.array.reduce(sum, 0)).toBe(testCase.expectedResult))
})

test('Test util.product', () => {
    const testCases = [
        { array: [], expectedResult: BigInt(1) },
        { array: [BigInt(1), BigInt(2), BigInt(3), BigInt(4), BigInt(5)], expectedResult: BigInt(120) },
        { array: [BigInt(-100), BigInt(200), BigInt(-300), BigInt(400), BigInt(1), BigInt(1)], expectedResult: BigInt(2400000000) },
    ]
    testCases.forEach((testCase) => expect(testCase.array.reduce(product, BigInt(1))).toBe(testCase.expectedResult))
})

test('Test util.range', () => {
    const testCases1Argument = [
        { size: 0, expectedResult: [] },
        { size: 1, expectedResult: [0] },
        { size: 5, expectedResult: [0, 1, 2, 3, 4] },
        { size: -5, expectedResult: [] },
    ]
    testCases1Argument.forEach((testCase) => expect(range(testCase.size)).toEqual(testCase.expectedResult))

    const testCases2Arguments = [
        { start: 0,  end: 0, expectedResult: [] },
        { start: -1, end: 1, expectedResult: [-1, 0] },
        { start: 5,  end: 1, expectedResult: [] },
        { start: -5, end: 0, expectedResult: [-5, -4, -3, -2, -1] },
    ]
    testCases2Arguments.forEach((testCase) => expect(range(testCase.start, testCase.end)).toEqual(testCase.expectedResult))
})

test('Test util.randomNumber', () => {
    for (let i = 0; i < 10000; i++) {
        expect([0, 1, 2, 3, 4, 5]).toContain(randomNumber(6))
        expect([1, 2, 3, 4, 5]).toContain(randomNumber(1, 6))
    }
})

test('Test util.randomPick', () => {
    const testArray = [0, 1, 2, 3, 4, 5]
    for (let i = 0; i < 10000; i++) {
        expect(testArray).toContain(randomPick(testArray))
    }
    expect(randomPick([])).toBeUndefined()
})


test('Test util.shuffle', () => {
    const testArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    for (let i = 0; i < 10000; i++) {
        const shuffledArray = shuffle(testArray)
        expect(testArray).not.toEqual(shuffledArray)
        expect(testArray).toEqual(shuffledArray.sort((a, b) => a - b))
    }
    expect(shuffle([])).toEqual([])
})

test('Test util.roundRobin', () => {
    const testArray = [0, 1, 2, 3, 4, 5]
    const isEven = (x: number) => x % 2 === 0
    const isVeryBig = (x: number) => x > 100
    expect(roundRobin(testArray, 0, isEven)).toBe(2)
    expect(roundRobin(testArray, 1, isEven)).toBe(2)
    expect(roundRobin(testArray, 2, isEven)).toBe(4)
    expect(roundRobin(testArray, -1, isEven)).toBe(2)
    expect(roundRobin(testArray, 10, isEven)).toBe(2)
    expect(roundRobin(testArray, 0, isVeryBig)).toBeUndefined()
})