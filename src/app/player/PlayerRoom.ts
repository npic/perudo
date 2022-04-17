import { roundRobin, sum } from '../util'
import { Player, rollDiceForPlayer, isPlayerAlive, PlayerType } from './Player'
import { DieSide, countPoints } from './Die'
import { Bet, makeBet } from '../bet/Bet'

export interface PlayerRoom {
    players: Player[],
    currentBet: Bet,
    isMaputoRound: boolean,
    currentRoundNumber: number,
    currentTurnPlayerIndex: number,
    previousTurnPlayerIndex: number,
    roundEnded: boolean,
}

export function makePlayerRoom(): PlayerRoom {
    return {
        players: [],
        currentBet: makeBet(0, DieSide.Joker),
        isMaputoRound: false,
        currentRoundNumber: 0,
        currentTurnPlayerIndex: 0,
        previousTurnPlayerIndex: 0,
        roundEnded: false,
    }
}

export function rollDiceForAllPlayers(room: PlayerRoom, hasJokers: boolean) {
    room.players.forEach((player) => rollDiceForPlayer(player, hasJokers))
}

export function prepareAIPlayers(room: PlayerRoom) {
    room.players
        .filter((player) => player.type === PlayerType.AI)
        .forEach((player) => {
            const rangeLength = player.aiRiskUpperBound - player.aiRiskLowerBound
            player.aiRiskCurrentValue = Math.floor(Math.random() * rangeLength) + player.aiRiskLowerBound
        })
}

export function isGameOver(room: PlayerRoom) {
    let alivePlayers =
        room.players
            .map((player) => isPlayerAlive(player) ? 1 : 0)
            .reduce(sum, 0)
    return alivePlayers <= 1
}

export function getTotalDiceCount(room: PlayerRoom) {
    return room.players
        .map((player) => player.diceOwned)
        .reduce(sum, 0)
}

export function getTotalPoints(room: PlayerRoom) {
    return room.players
        .map((player) => countPoints(player.dice, room.currentBet.dieSide))
        .reduce(sum, 0)
}

export function getLoserIndex(room: PlayerRoom) {
    return getTotalPoints(room) >= room.currentBet.quantity ? room.currentTurnPlayerIndex : room.previousTurnPlayerIndex
}

export function startNextTurn(room: PlayerRoom, bet: Bet) {
    room.currentBet = bet
    room.previousTurnPlayerIndex = room.currentTurnPlayerIndex
    room.currentTurnPlayerIndex = roundRobin(room.players, room.currentTurnPlayerIndex, isPlayerAlive) || 0 // TODO?
}

export function endRound(room: PlayerRoom) {
    room.roundEnded = true
}

export function startNextRound(room: PlayerRoom) {
    room.roundEnded = false
    if (room.currentRoundNumber === 0) {
        room.isMaputoRound = false
    } else {
        room.currentTurnPlayerIndex = getLoserIndex(room)
        room.players[room.currentTurnPlayerIndex].diceOwned--
        const maputoBaseConditions = room.players[room.currentTurnPlayerIndex].diceOwned === 1 && !room.players[room.currentTurnPlayerIndex].hadMaputoRound
        const numberOfAlivePlayers =
            room.players
                .map((player) => isPlayerAlive(player) ? 1 : 0)
                .reduce(sum, 0)
        const onlyTwoPlayersAliveException = numberOfAlivePlayers === 2
        const onlyThreePlayersWithOneDieEachAliveException =
            numberOfAlivePlayers === 3
            && room.players.every((player) => player.diceOwned === 1)
        room.isMaputoRound = maputoBaseConditions && !onlyTwoPlayersAliveException && !onlyThreePlayersWithOneDieEachAliveException
        if (room.isMaputoRound) {
            room.players[room.currentTurnPlayerIndex].hadMaputoRound = true
        }
        if (!isPlayerAlive(room.players[room.currentTurnPlayerIndex])) {
            room.currentTurnPlayerIndex = roundRobin(room.players, room.currentTurnPlayerIndex, isPlayerAlive) || 0 // TODO?
        }
    }
    room.currentRoundNumber++
    room.currentBet = makeBet(0, DieSide.Joker)
    rollDiceForAllPlayers(room, !room.isMaputoRound)
    prepareAIPlayers(room)
}