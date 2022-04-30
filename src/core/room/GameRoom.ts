import { Player, Bid } from 'core/types'

export default interface GameRoom {
    players: Player[]
    currentBid: Bid
    isMaputoRound: boolean
    currentRoundNumber: number
    currentTurnPlayerIndex: number
    previousTurnPlayerIndex: number
    roundEnded: boolean
}
