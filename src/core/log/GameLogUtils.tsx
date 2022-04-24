import GameLog from './GameLog'
import GameEvent from './event/GameEvent'
import GameEventType from './event/GameEventType'
import GameRoom from '../room/GameRoom'
import * as GameRoomUtils from '../room/GameRoomUtils'
import * as PlayerUtils from '../player/PlayerUtils'

export function makeGameLog(): GameLog {
    return []
}

export function addEvent(eventLog: GameLog, event: GameEvent) {
    eventLog.push(event)
}

export function logGameStart(log: GameLog, room: GameRoom) {
    addEvent(log, {
        type: GameEventType.GameStart,
        playerNames: room.players.map((player) => player.name)
    })
    logRoundStart(log, room)
}

export function logRoundStart(log: GameLog, room: GameRoom) {
    addEvent(log, {
        type: GameEventType.RoundStart,
        roundNumber: room.currentRoundNumber,
        isMaputo: room.isMaputoRound,
    })
}

export function logBid(log: GameLog, room: GameRoom) {
    addEvent(log, {
        type: GameEventType.Bid,
        playerName: room.players[room.previousTurnPlayerIndex].name,
        bidQuantity: room.currentBid.quantity,
        bidDieFace: room.currentBid.dieFace,
    })
}

export function logCheck(log: GameLog, room: GameRoom) {
    addEvent(log, {
        type: GameEventType.Check,
        playerName: room.players[room.currentTurnPlayerIndex].name,
    })
    addEvent(log, {
        type: GameEventType.RevealAllDice,
        roundNumber: room.currentRoundNumber,
        playerDice:
            room.players
                .filter((player) => PlayerUtils.isAlive(player))
                .map((player) => ({
                    playerName: player.name,
                    dice: player.dice.map((die) => die.value)
                })),
    })
    const loserIndex = GameRoomUtils.getLoserIndex(room)
    const loser = room.players[loserIndex]
    addEvent(log, {
        type: GameEventType.RoundOutcome,
        loserName: loser.name,
    })
    if (loser.diceOwned <= 1) {
        addEvent(log, {
            type: GameEventType.PlayerLost,
            loserName: loser.name,
        })
    }
    addEvent(log, {
        type: GameEventType.RoundEnd,
        roundNumber: room.currentRoundNumber,
    })
}

export function logGameOver(log: GameLog, room: GameRoom) {
    addEvent(log, {
        type: GameEventType.PlayerWon,
        winnerName: room.players[room.currentTurnPlayerIndex].name,
    })
    addEvent(log, {
        type: GameEventType.GameEnd,
    })
}