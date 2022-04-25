import { range, sum } from '../util'
import DiceSet from './DiceSet'
import DieFace from './face/DieFace'
import * as DieUtils from './DieUtils'

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
