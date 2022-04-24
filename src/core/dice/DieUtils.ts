import { range, randomPick, sum } from '../util'
import Die from './Die'
import DieFace from './face/DieFace'
import * as DieFaceUtils from './face/DieFaceUtils'

export const MAX_FACES = 6

export function makeDie(withJoker: boolean) {
    let newDie: Die = {
        faces: [
            (withJoker ? DieFace.Joker : DieFace.One),
            DieFace.Two,
            DieFace.Three,
            DieFace.Four,
            DieFace.Five,
            DieFace.Six,
        ],
        value: DieFace.Six,
    }
    roll(newDie)
    return newDie
}

export function makeDiceSet(size: number, withJokers: boolean) {
    return range(size)
        .map(() => makeDie(withJokers))
        .sort(compare)
}

export function roll(die: Die) {
    die.value = randomPick(die.faces) as DieFace
}

export function toNumber(die: Die) {
    return DieFaceUtils.toNumber(die.value)
}

export function compare(dieA: Die, dieB: Die) {
    return toNumber(dieA) - toNumber(dieB)
}

export function matches(die: Die, matchWith: DieFace) {
    return die.value === DieFace.Joker || die.value === matchWith
}

export function countPoints(diceSet: Die[], matchWith: DieFace) {
    return diceSet
        .map((die) => Number(matches(die, matchWith) ? 1 : 0))
        .reduce(sum, 0)
}
