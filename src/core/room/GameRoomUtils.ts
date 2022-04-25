import { randomNumber, roundRobin, sum } from '../util'
import GameRoom from './GameRoom'
import PlayerType from '../player/PlayerType'
import Bid from '../bid/Bid'
import * as BidUtils from '../bid/BidUtils'
import * as DiceSetUtils from '../dice/DiceSetUtils'
import * as PlayerUtils from '../player/PlayerUtils'

export function makeGameRoom(): GameRoom {
    return {
        players: [],
        currentBid: BidUtils.makeNullBid(),
        isMaputoRound: false,
        currentRoundNumber: 0,
        currentTurnPlayerIndex: 0,
        previousTurnPlayerIndex: 0,
        roundEnded: false,
    }
}

export function rollDiceForAllPlayers(room: GameRoom, withJokers: boolean) {
    room.players.forEach((player) => PlayerUtils.rollDice(player, withJokers))
}

export function prepareAIPlayers(room: GameRoom) {
    room.players
        .filter((player) => player.type === PlayerType.AI)
        .forEach((player) => {
            player.aiRiskCurrentValue = randomNumber(player.aiRiskLowerBound, player.aiRiskUpperBound)
        })
}

export function isGameOver(room: GameRoom) {
    let alivePlayers =
        room.players
            .map((player) => PlayerUtils.isAlive(player) ? 1 : 0)
            .reduce(sum, 0)
    return alivePlayers <= 1
}

export function isHumanTurn(room: GameRoom) {
    return room.players[room.currentTurnPlayerIndex]?.type === PlayerType.Human
}

export function isAITurn(room: GameRoom) {
    return !isHumanTurn(room)
}

export function getTotalDiceCount(room: GameRoom) {
    return room.players
        .map((player) => player.diceOwned)
        .reduce(sum, 0)
}

export function getTotalPoints(room: GameRoom) {
    return room.players
        .map((player) => DiceSetUtils.countPoints(player.dice, room.currentBid.dieFace))
        .reduce(sum, 0)
}

export function getLoserIndex(room: GameRoom) {
    return getTotalPoints(room) >= room.currentBid.quantity ? room.currentTurnPlayerIndex : room.previousTurnPlayerIndex
}

export function startNextTurn(room: GameRoom, bid: Bid) {
    room.currentBid = bid
    room.previousTurnPlayerIndex = room.currentTurnPlayerIndex
    room.currentTurnPlayerIndex = roundRobin(room.players, room.currentTurnPlayerIndex, PlayerUtils.isAlive) as number
}

export function endRound(room: GameRoom) {
    room.roundEnded = true
}

export function startNextRound(room: GameRoom) {
    if (room.currentRoundNumber === 0) {
        // If the game just started, there isn't much to do
        room.isMaputoRound = false
    } else {
        // 1. Punish the loser
        room.currentTurnPlayerIndex = getLoserIndex(room)
        let loser = room.players[room.currentTurnPlayerIndex]
        loser.diceOwned--

        // 2. Determine if the next round will be a Maputo round
        const maputoBaseConditions = loser.diceOwned === 1 && !loser.hadMaputoRound
        const numberOfAlivePlayers =
            room.players
                .map((player) => PlayerUtils.isAlive(player) ? 1 : 0)
                .reduce(sum, 0)
        const onlyTwoPlayersAliveException = numberOfAlivePlayers === 2
        const onlyThreePlayersWithOneDieEachAliveException =
            numberOfAlivePlayers === 3
            && room.players.every((player) => player.diceOwned === 1 || !PlayerUtils.isAlive(player))
        room.isMaputoRound =
            maputoBaseConditions
            && !onlyTwoPlayersAliveException
            && !onlyThreePlayersWithOneDieEachAliveException
        if (room.isMaputoRound) {
            loser.hadMaputoRound = true
        }

        // 3. Pass the turn to the next player if the loser lost all dice
        if (!PlayerUtils.isAlive(loser)) {
            room.currentTurnPlayerIndex = roundRobin(room.players, room.currentTurnPlayerIndex, PlayerUtils.isAlive) as number
        }
    }
    room.currentRoundNumber++
    room.roundEnded = false
    room.currentBid = BidUtils.makeNullBid()
    rollDiceForAllPlayers(room, !room.isMaputoRound)
    prepareAIPlayers(room)
}
