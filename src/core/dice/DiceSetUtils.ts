import { DiceSet, DieFace } from 'core/types'
import { DieUtils, range, sum } from 'core/utils'

export const STARTING_DICE_NUMBER = 5

export function makeDiceSet(size: number, withJokers: boolean): DiceSet {
    return range(size)
        .map(() => DieUtils.makeDie(withJokers))
        .sort(DieUtils.compare)
}

export function countPoints(diceSet: DiceSet, matchWith: DieFace): number {
    return diceSet
        .map((die) => Number(DieUtils.matches(die, matchWith) ? 1 : 0))
        .reduce(sum, 0)
}
