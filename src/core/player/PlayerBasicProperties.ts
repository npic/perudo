import { PlayerType } from 'core/types'

export default interface PlayerBasicProperties {
    name: string
    type: PlayerType
    aiRiskLowerBound?: number
    aiRiskUpperBound?: number
    aiTopBidsSimilarityThreshold?: number
    aiDelay?: number
}