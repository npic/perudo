import Player from './Player'
import PlayerBasicProperties from './PlayerBasicProperties'
import * as DiceSetUtils from '../dice/DiceSetUtils'

export function makePlayer({ name, type, aiRiskLowerBound = 0, aiRiskUpperBound = 0, aiTopBidsSimilarityThreshold = 0, aiDelay = 0 }: PlayerBasicProperties): Player {
    return {
        name: name,
        type: type,
        diceOwned: DiceSetUtils.STARTING_DICE_NUMBER,
        dice: [],
        hadMaputoRound: false,
        aiRiskLowerBound: aiRiskLowerBound,
        aiRiskUpperBound: aiRiskUpperBound,
        aiRiskCurrentValue: aiRiskLowerBound,
        aiTopBidsSimilarityThreshold: aiTopBidsSimilarityThreshold,
        aiDelay: aiDelay,
    }
}

export function rollDice(player: Player, withJokers: boolean) {
    player.dice = DiceSetUtils.makeDiceSet(player.diceOwned, withJokers)
}

export function isAlive(player: Player) {
    return player.diceOwned > 0
}
