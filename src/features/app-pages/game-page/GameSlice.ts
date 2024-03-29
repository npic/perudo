import { ActionCreator, PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AppThunk, RootState } from 'app/store'
import { SettingsSlice } from 'app/slices'
import { GameRoom, GameLog, Bid } from 'core/types'
import { GameRoomBuilderDirector, GameRoomUtils, GameLogUtils, AIUtils } from 'core/utils'

export interface GameSliceState {
    room: GameRoom,
    log: GameLog,
}

const initialState: GameSliceState = {
    room: GameRoomUtils.makeGameRoom(),
    log: GameLogUtils.makeGameLog(),
}

const slice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        startGame: (state, action: PayloadAction<SettingsSlice.SettingsState>) => {
            const roomBuilderDirector = new GameRoomBuilderDirector()
            state.room = roomBuilderDirector.buildPlayerRoom(action.payload)
            state.log = GameLogUtils.makeGameLog()
            if (state.room.players.length > 1) {
                GameRoomUtils.startNextRound(state.room)
                GameLogUtils.logGameStart(state.log, state.room)
            } else {
                GameRoomUtils.endRound(state.room)
            }
        },
        stopGame: (state) => {
            GameRoomUtils.endRound(state.room)
        },
        placeBid: (state, action: PayloadAction<Bid>) => {
            GameRoomUtils.startNextTurn(state.room, action.payload)
            GameLogUtils.logBid(state.log, state.room)
        },
        checkBid: (state) => {
            GameRoomUtils.endRound(state.room)
            GameLogUtils.logCheck(state.log, state.room)
        },
        startNextRound: (state) => {
            GameRoomUtils.startNextRound(state.room)
            if (GameRoomUtils.isGameOver(state.room)) {
                GameRoomUtils.endRound(state.room)
                GameLogUtils.logGameOver(state.log, state.room)
            } else {
                GameLogUtils.logRoundStart(state.log, state.room)
            }
        },
    },
})

export const reducer = slice.reducer

export const { startGame, stopGame, placeBid, checkBid, startNextRound } = slice.actions

function interactionInvokingAIAction(action: ReturnType<ActionCreator<any>>, dispatchedByHuman: boolean): AppThunk {
    return (dispatch, getState) => {
        let state = getState()
        const isRoundEndedBeforeAction = selectIsRoundEnded(state)

        if (dispatchedByHuman || !isRoundEndedBeforeAction) {
            dispatch(action)
        }
        
        state = getState()
        const room = selectRoom(state)
        const isRoundEnded = selectIsRoundEnded(state)
        const isAITurn = selectIsAITurn(state)
        const currentPlayer = selectCurrentPlayer(state)

        if (isAITurn && !isRoundEnded) {
            const aiDecision = interactionInvokingAIAction(
                AIUtils.makeAIMove(room, {
                    check: checkBid,
                    bid: placeBid,
                }),
                false
            )
            setTimeout(() => dispatch(aiDecision), currentPlayer.aiDelay)
        }
    }
}
export const humanPlayerStartGame = (settings: SettingsSlice.SettingsState): AppThunk => interactionInvokingAIAction(startGame(settings), true)
export const humanPlayerPlaceBid = (bid: Bid): AppThunk => interactionInvokingAIAction(placeBid(bid), true)
export const humanPlayerStartNextRound = (): AppThunk => interactionInvokingAIAction(startNextRound(), true)

export const selectRoom = (state: RootState) => state.game.room
export const selectLog = (state: RootState) => state.game.log
export const selectCurrentBid = (state: RootState) => state.game.room.currentBid
export const selectCurrentPlayer = (state: RootState) => state.game.room.players[state.game.room.currentTurnPlayerIndex]
export const selectPreviousPlayer = (state: RootState) => state.game.room.players[state.game.room.previousTurnPlayerIndex]
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
