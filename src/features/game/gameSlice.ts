import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../../app/store'
import { startGame, stopGame, placeBid, checkBid, startNextRound } from '../../app/actions'

import GameRoomBuilderDirector from '../../core/room/GameRoomBuilder'
import GameRoom from '../../core/room/GameRoom'
import * as GameRoomUtils from '../../core/room/GameRoomUtils'

import GameLog from '../../core/log/GameLog'
import * as GameLogUtils from '../../core/log/GameLogUtils'

import Bid from '../../core/bid/Bid'

import * as AIUtils from '../../core/player/AIUtils'

import { SettingsState } from '../settings/SettingsSlice'

export interface GameSliceState {
    room: GameRoom,
    log: GameLog,
}

const initialState: GameSliceState = {
    room: GameRoomUtils.makeGameRoom(),
    log: GameLogUtils.makeGameLog(),
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(startGame, (state, action: PayloadAction<SettingsState>) => {
                const roomBuilderDirector = new GameRoomBuilderDirector()
                state.room = roomBuilderDirector.buildPlayerRoom(action.payload)
                state.log = GameLogUtils.makeGameLog()
                if (state.room.players.length > 1) {
                    GameRoomUtils.startNextRound(state.room)
                    GameLogUtils.logGameStart(state.log, state.room)
                } else {
                    GameRoomUtils.endRound(state.room)
                }
            })
            .addCase(stopGame, (state) => {
                GameRoomUtils.endRound(state.room)
            })
            .addCase(placeBid, (state, action: PayloadAction<Bid>) => {
                GameRoomUtils.startNextTurn(state.room, action.payload)
                GameLogUtils.logBid(state.log, state.room)
            })
            .addCase(checkBid, (state) => {
                GameRoomUtils.endRound(state.room)
                GameLogUtils.logCheck(state.log, state.room)
            })
            .addCase(startNextRound, (state) => {
                GameRoomUtils.startNextRound(state.room)
                if (GameRoomUtils.isGameOver(state.room)) {
                    GameRoomUtils.endRound(state.room)
                    GameLogUtils.logGameOver(state.log, state.room)
                } else {
                    GameLogUtils.logRoundStart(state.log, state.room)
                }
            })
    }
})

export const selectRoom = (state: RootState) => state.game.room
export const selectLog = (state: RootState) => state.game.log
export const selectCurrentPlayer = (state: RootState) => state.game.room.players[state.game.room.currentTurnPlayerIndex]
export const selectCurrentBid = (state: RootState) => state.game.room.currentBid
export const selectRoundNumber = (state: RootState) => state.game.room.currentRoundNumber
export const selectIsMaputoRound = (state: RootState) => state.game.room.isMaputoRound
export const selectIsHumanTurn = (state: RootState) => GameRoomUtils.isHumanTurn(state.game.room)
export const selectIsAITurn = (state: RootState) => GameRoomUtils.isAITurn(state.game.room)
export const selectIsRoundEnded = (state: RootState) => state.game.room.roundEnded
export const selectIsGameOver = (state: RootState) => GameRoomUtils.isGameOver(state.game.room)
export const selectIsRoomEmpty = (state: RootState) => state.game.room.players.length <= 1
export const selectTotalDiceCount = (state: RootState) => GameRoomUtils.getTotalDiceCount(state.game.room)
export const selectTotalPoints = (state: RootState) => GameRoomUtils.getTotalPoints(state.game.room)
export const selectLoser = (state: RootState) => state.game.room.players[GameRoomUtils.getLoserIndex(state.game.room)]

const interactionInvokingAIAction = (action: any, dispatchedByHuman: boolean): AppThunk => (dispatch, getState) => {
    let state = getState()
    const isRoundEndedBeforeAction = selectIsRoundEnded(state)

    if (dispatchedByHuman || !isRoundEndedBeforeAction) {
        dispatch(action)
    }
    
    state = getState()
    const isRoundEnded = selectIsRoundEnded(state)
    const room = selectRoom(state)
    const currentPlayer = selectCurrentPlayer(state)
    const isAITurn = selectIsAITurn(state)

    if (isAITurn && !isRoundEnded) {
        const aiDecision = interactionInvokingAIAction(AIUtils.makeAIMove(room), false)
        setTimeout(() => dispatch(aiDecision), currentPlayer.aiDelay)
    }
}
export const humanPlayerStartGame = (settings: SettingsState): AppThunk => interactionInvokingAIAction(startGame(settings), true)
export const humanPlayerPlaceBid = (bid: Bid): AppThunk => interactionInvokingAIAction(placeBid(bid), true)
export const humanPlayerStartNextRound = (): AppThunk => interactionInvokingAIAction(startNextRound(), true)

export default gameSlice.reducer