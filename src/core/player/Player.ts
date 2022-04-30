import { PlayerType, DiceSet } from 'core/types'

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