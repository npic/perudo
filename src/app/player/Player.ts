import { Die, makeDiceSet } from './Die'

export enum PlayerType {
    Human = 'Human',
    AI = 'AI',
}

export interface Player {
    name: string,
    type: PlayerType,
    diceOwned: number,
    dice: Die[],
    hadMaputoRound: boolean,
    aiRiskLowerBound: number,
    aiRiskUpperBound: number,
    aiRiskCurrentValue: number,
    aiDelay: number,
}

export function makePlayer(name: string, type: PlayerType, aiRiskLowerBound: number = 0, aiRiskUpperBound: number = 0, aiDelay: number = 1000): Player {
    const startingDiceCount = 5
    return {
        name: name,
        type: type,
        diceOwned: startingDiceCount,
        dice: [],
        hadMaputoRound: false,
        aiRiskLowerBound: aiRiskLowerBound,
        aiRiskUpperBound: aiRiskUpperBound,
        aiRiskCurrentValue: 0,
        aiDelay: aiDelay,
    }
}

export function rollDiceForPlayer(player: Player, withJokers: boolean) {
    player.dice = makeDiceSet(player.diceOwned, withJokers)
}

export function isPlayerAlive(player: Player) {
    return player.diceOwned > 0
}