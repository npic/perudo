import PlayerType from './PlayerType'
import Die from '../dice/Die'

export default interface Player {
    name: string
    type: PlayerType
    diceOwned: number
    dice: Die[]
    hadMaputoRound: boolean
    aiRiskLowerBound: number
    aiRiskUpperBound: number
    aiRiskCurrentValue: number
    aiTopBidsSimilarityThreshold: number
    aiDelay: number
}