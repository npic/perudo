import { range, randomPick, sum } from '../util'

export enum DieSide {
    Joker = '*',
    One = '1',
    Two = '2',
    Three = '3',
    Four = '4',
    Five = '5',
    Six = '6',
}

export interface Die {
    sides: DieSide[],
    value: DieSide,
}

export const MAX_SIDES = 6

export function makeDie(hasJoker: boolean) {
    let newDie: Die = {
        sides: [
            (hasJoker ? DieSide.Joker : DieSide.One),
            DieSide.Two,
            DieSide.Three,
            DieSide.Four,
            DieSide.Five,
            DieSide.Six,
        ],
        value: DieSide.Six, // initial value doesn't matter, the rolling happens immediately below
    }
    rollDie(newDie)
    return newDie
}

export function rollDie(die: Die) {
    die.value = randomPick(die.sides)
}

export function dieMatches(die: Die, matchWith: DieSide) {
    return die.value === DieSide.Joker || die.value === matchWith
}

export function dieSideToBootstrapIconClass(dieSide: DieSide) {
    return dieSide === DieSide.Joker ? 'bi-star-fill' : `bi-dice-${dieSide}-fill`
}

export function dieSideToNumber(dieSide: DieSide) {
    return dieSide === DieSide.Joker ? 0 : Number(dieSide)
}

export function dieToNumber(die: Die) {
    return dieSideToNumber(die.value)
}

export function compareDice(dieA: Die, dieB: Die) {
    return dieToNumber(dieA) - dieToNumber(dieB)
}

export function makeDiceSet(size: number, hasJokers: boolean) {
    return range(size)
        .map(() => makeDie(hasJokers))
        .sort((a, b) => compareDice(a, b))
}

export function countPoints(diceSet: Die[], matchWith: DieSide) {
    return diceSet
        .map((die) => Number(dieMatches(die, matchWith) ? 1 : 0))
        .reduce(sum, 0)
}
