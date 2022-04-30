import { GameEventType, DieFace } from 'core/types'

interface GameStartEvent {
    type: GameEventType.GameStart
    playerNames: string[]
}

interface RoundStartEvent {
    type: GameEventType.RoundStart
    roundNumber: number
    isMaputo: boolean
}

interface BidEvent {
    type: GameEventType.Bid
    playerName: string
    bidQuantity: number
    bidDieFace: DieFace
}

interface CheckEvent {
    type: GameEventType.Check
    playerName: string
}

interface RevealAllDiceEvent {
    type: GameEventType.RevealAllDice
    roundNumber: number
    matchingDieFace: DieFace
    playerDice: { playerName: string, dice: DieFace[] }[]
}

interface RoundOutcomeEvent {
    type: GameEventType.RoundOutcome
    loserName: string
}

interface PlayerLostEvent {
    type: GameEventType.PlayerLost
    loserName: string
}

interface RoundEndEvent {
    type: GameEventType.RoundEnd
    roundNumber: number
}

interface PlayerWonEvent {
    type: GameEventType.PlayerWon
    winnerName: string
}

interface GameEndEvent {
    type: GameEventType.GameEnd
}

type GameEvent = 
    | GameStartEvent
    | RoundStartEvent
    | BidEvent
    | CheckEvent
    | RevealAllDiceEvent
    | RoundOutcomeEvent
    | PlayerLostEvent
    | RoundEndEvent
    | PlayerWonEvent
    | GameEndEvent

export default GameEvent