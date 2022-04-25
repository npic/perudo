import PlayerType from './PlayerType'
import DiceSet from '../dice/DiceSet'

export default interface Player {
    name: string
    type: PlayerType
    diceOwned: number
    dice: DiceSet
    hadMaputoRound: boolean
    aiRiskLowerBound: number
    aiRiskUpperBound: number
    aiRiskCurrentValue: number
    aiTopBidsSimilarityThreshold: number
    aiDelay: number
}