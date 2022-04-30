export function sum(accumulator: number, currentValue: number) {
    return accumulator + currentValue
}

export function product(accumulator: bigint, currentValue: bigint) {
    return accumulator * currentValue
}

function normalizeBoundaries(startOrEnd: number, end: number | undefined): [number, number] {
    return end === undefined ? [0, startOrEnd] : [startOrEnd, end]
}

export function range(end: number): number[]
export function range(start: number, end: number): number[]
export function range(startOrEnd: number, end?: number): number[] {
    const [rangeStart, rangeEnd] = normalizeBoundaries(startOrEnd, end)
    const result = []
    for (let i = rangeStart; i < rangeEnd; i++) {
        result.push(i)
    }
    return result
}

export function randomNumber(upperBound: number): number
export function randomNumber(lowerBound: number, upperBound: number): number
export function randomNumber(lowerOrUpperBound: number, upperBound?: number): number {
    const [rangeStart, rangeEnd] = normalizeBoundaries(lowerOrUpperBound, upperBound)
    return rangeStart + Math.floor(Math.random() * (rangeEnd - rangeStart))
}

export function randomPick<Type>(array: Type[]): Type | undefined {
    if (array.length === 0) {
        return undefined
    } else {
        return array[randomNumber(array.length)]
    }
}

export function shuffle<Type>(array: Type[]): Type[] {
    const result: Type[] = []
    const indices = range(array.length)
    while (indices.length > 0) {
        const randomIndexInIndices = randomPick(range(indices.length)) as number
        const randomIndexInArray = indices[randomIndexInIndices]
        result.push(array[randomIndexInArray])
        indices.splice(randomIndexInIndices, 1)
    }
    return result
}

export function roundRobin<Type>(array: Type[], currentIndex: number, predicate: (value: Type) => boolean): number | undefined {
    if (!array.some(predicate)) {
        return undefined
    }
    
    let nextIndex = currentIndex
    if (nextIndex >= array.length || nextIndex < 0) {
        nextIndex = 0
    }
    
    do {
        nextIndex = (nextIndex + 1) % array.length
    } while (!predicate(array[nextIndex]))

    return nextIndex
}