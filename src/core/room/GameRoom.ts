import Player from '../player/Player'
import Bid from '../bid/Bid'

export default interface GameRoom {
    players: Player[]
    currentBid: Bid
    isMaputoRound: boolean
    currentRoundNumber: number
    currentTurnPlayerIndex: number
    previousTurnPlayerIndex: number
    roundEnded: boolean
}
