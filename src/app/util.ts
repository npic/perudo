export function sum(accumulator: number, currentValue: number) {
    return accumulator + currentValue
}

export function product(accumulator: bigint, currentValue: bigint) {
    return accumulator * currentValue
}

export function range(size: number) {
    let result = []
    for (let i = 0; i < size; i++) {
        result.push(i)
    }
    return result
}

export function randomPick(array: any[]) {
    if (array.length === 0) {
        return undefined
    } else {
        return array[Math.floor(Math.random() * array.length)]
    }
}

export function shuffle(array: any[]) {
    let result = []
    let indices = range(array.length)
    while (indices.length > 0) {
        let randomIndexInIndices = randomPick(range(indices.length))
        let randomIndexInArray = indices[randomIndexInIndices]
        result.push(array[randomIndexInArray])
        indices.splice(randomIndexInIndices, 1)
    }
    return result
}

export function roundRobin(array: any[], currentIndex: number, predicate: (value: any) => boolean) {
    if (!array.some(predicate)) {
        return undefined
    }
    let nextIndex
    if (currentIndex >= array.length || currentIndex < 0) {
        nextIndex = 0
    } else {
        nextIndex = (currentIndex + 1) % array.length
    }
    while (!predicate(array[nextIndex])) {
        nextIndex = (nextIndex + 1) % array.length
    }
    return nextIndex
}