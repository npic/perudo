import { Die, DieFace } from 'core/types'
import { randomPick } from 'core/utils'

export const DIE_FACES = 6

export function makeDie(withJoker: boolean): Die {
    const faces = [
        (withJoker ? DieFace.Joker : DieFace.One),
        DieFace.Two,
        DieFace.Three,
        DieFace.Four,
        DieFace.Five,
        DieFace.Six,
    ]
    return { value: randomPick(faces) as DieFace }
}

function isDie(object: any): object is Die {
    return typeof object === 'object' && 'value' in object && object.value in DieFace
}

function castToDieFace(dieOrDieFace: Die | DieFace) {
    return isDie(dieOrDieFace) ? dieOrDieFace.value : dieOrDieFace
}

export function toNumber(die: Die | DieFace) {
    const value = castToDieFace(die)
    return value === DieFace.Joker ? 0 : Number(value)
}

export function toBootstrapIconClass(die: Die | DieFace) {
    const value = castToDieFace(die)
    return value === DieFace.Joker ? 'bi-star-fill' : `bi-dice-${value}-fill`
}

export function compare(dieA: Die | DieFace, dieB: Die | DieFace) {
    return toNumber(dieA) - toNumber(dieB)
}

export function matches(die: Die | DieFace, matchWith: Die | DieFace) {
    const dieValue = castToDieFace(die)
    const matchWithValue = castToDieFace(matchWith)
    return dieValue === DieFace.Joker || dieValue === matchWithValue
}

export const _testVisibility = { isDie, castToDieFace }