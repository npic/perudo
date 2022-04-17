import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk, RootState } from "../../app/store"
import { checkBet, placeBet, startNextRound as startNextRoundAction, startGame, stopGame } from '../../app/actions'
import { range } from "../../app/util"
import { isPlayerAlive, PlayerType } from "../../app/player/Player"
import { endRound, getLoserIndex, getTotalDiceCount, getTotalPoints, isGameOver, makePlayerRoom, PlayerRoom, startNextRound, startNextTurn } from "../../app/player/PlayerRoom"
import PlayerRoomBuilderDirector, { BasicPlayerInfo } from "../../app/player/PlayerRoomBuilder"
import { Bet, betGenerator, calculateBetProbability } from "../../app/bet/Bet"
import { SettingsState } from "../settings/settingsSlice"
import { addEvent, createNewLog, GameEventType, GameLog } from "../../app/log/Log"

export interface GameSliceState {
    room: PlayerRoom,
    log: GameLog,
}

const initialState: GameSliceState = {
    room: makePlayerRoom(),
    log: createNewLog(),
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(startGame, (state, action: PayloadAction<SettingsState>) => {
                const roomBuilderDirector = new PlayerRoomBuilderDirector()
                const humanPlayers: BasicPlayerInfo[] =
                    range(action.payload.humanPlayers)
                        .map((i) => ({
                            playerName: action.payload.humanPlayerNames[i],
                            playerType: PlayerType.Human,
                            aiPlayerRiskLowerBound: 0,
                            aiPlayerRiskUpperBound: 0,
                            aiDelay: 0,
                        }))
                const aiPlayers: BasicPlayerInfo[] =
                    range(action.payload.aiPlayers)
                        .map(() => ({
                            playerName: '',
                            playerType: PlayerType.AI,
                            aiPlayerRiskLowerBound: action.payload.aiRiskLowerBound,
                            aiPlayerRiskUpperBound: action.payload.aiRiskUpperBound,
                            aiDelay: action.payload.aiDelay,
                        }))
                const allPlayers: BasicPlayerInfo[] = humanPlayers.concat(aiPlayers)
                state.room = roomBuilderDirector.buildPlayerRoom(allPlayers)
                state.log = createNewLog()
                addEvent(state.log, {
                    type: GameEventType.GameStart,
                    playerNames: state.room.players.map((player) => player.name)
                })
                startNextRound(state.room)
                addEvent(state.log, {
                    type: GameEventType.RoundStart,
                    roundNumber: state.room.currentRoundNumber,
                    isMaputo: state.room.isMaputoRound,
                })
            })
            .addCase(stopGame, (state) => {
                endRound(state.room)
            })
            .addCase(placeBet, (state, action: PayloadAction<Bet>) => {
                addEvent(state.log, {
                    type: GameEventType.Bet,
                    playerName: state.room.players[state.room.currentTurnPlayerIndex].name,
                    betQuantity: action.payload.quantity,
                    betDieSide: action.payload.dieSide,
                })
                startNextTurn(state.room, action.payload)
            })
            .addCase(checkBet, (state) => {
                addEvent(state.log, {
                    type: GameEventType.Check,
                    playerName: state.room.players[state.room.currentTurnPlayerIndex].name,
                })
                addEvent(state.log, {
                    type: GameEventType.RevealAllDice,
                    playerDice:
                        state.room.players
                            .filter((player) => isPlayerAlive(player))
                            .map((player) => ({
                                playerName: player.name,
                                dice: player.dice.map((die) => die.value)
                            })),
                })

                endRound(state.room)
                
                const loserIndex = getLoserIndex(state.room)
                addEvent(state.log, {
                    type: GameEventType.RoundOutcome,
                    loserName: state.room.players[loserIndex].name,
                })
                if (state.room.players[loserIndex].diceOwned <= 1) {
                    addEvent(state.log, {
                        type: GameEventType.PlayerLost,
                        loserName: state.room.players[loserIndex].name,
                    })
                }
                addEvent(state.log, {
                    type: GameEventType.RoundEnd,
                    roundNumber: state.room.currentRoundNumber,
                })
            })
            .addCase(startNextRoundAction, (state) => {
                startNextRound(state.room)
                if (isGameOver(state.room)) {
                    state.room.roundEnded = true
                    addEvent(state.log, {
                        type: GameEventType.PlayerWon,
                        winnerName: state.room.players[state.room.currentTurnPlayerIndex].name,
                    })
                    addEvent(state.log, {
                        type: GameEventType.GameEnd,
                    })
                } else {
                    addEvent(state.log, {
                        type: GameEventType.RoundStart,
                        roundNumber: state.room.currentRoundNumber,
                        isMaputo: state.room.isMaputoRound,
                    })
                }
            })
    }
})

export const selectRoom = (state: RootState) => state.game.room
export const selectLog = (state: RootState) => state.game.log
export const selectIsGameOver = (state: RootState) => isGameOver(state.game.room)
export const selectTotalPoints = (state: RootState) => getTotalPoints(state.game.room)
export const selectLoserIndex = (state: RootState) => getLoserIndex(state.game.room)

export function makeAIMove(room: PlayerRoom) {
    const bets = betGenerator(room.currentBet, getTotalDiceCount(room), room.isMaputoRound)
    const currentPlayer = room.players[room.currentTurnPlayerIndex]
    let candidates = []
    for (let i = 0; i < 35; i++) {
        let bet = bets.next().value
        if (bet) {
            candidates.push({
                bet: bet,
                probability: 100 * calculateBetProbability(bet, currentPlayer.dice, getTotalDiceCount(room), !room.isMaputoRound),
            })
        } else {
            break
        }
    }
    candidates = candidates
        .filter((candidate) => candidate.probability >= currentPlayer.aiRiskCurrentValue)
        .sort((candidateA, candidateB) => candidateB.probability - candidateA.probability)
    if (candidates.length === 0) {
        return checkBet()
    } else {
        return placeBet(candidates[0].bet)
    }
}

const playerInteractionInvokingAIAction = (action: any): AppThunk => (dispatch, getState) => {
    dispatch(action)
    const room = selectRoom(getState())
    if (room.players[room.currentTurnPlayerIndex].type === PlayerType.AI && !room.roundEnded) {
        setTimeout(() => dispatch(playerInteractionInvokingAIAction(makeAIMove(room))), room.players[room.currentTurnPlayerIndex].aiDelay)
    }
}
export const humanPlayerStartGame = (settings: SettingsState): AppThunk => playerInteractionInvokingAIAction(startGame(settings))
export const humanPlayerPlaceBet = (bet: Bet): AppThunk => playerInteractionInvokingAIAction(placeBet(bet))
export const humanPlayerStartNextRound = (): AppThunk => playerInteractionInvokingAIAction(startNextRoundAction())

export default gameSlice.reducer