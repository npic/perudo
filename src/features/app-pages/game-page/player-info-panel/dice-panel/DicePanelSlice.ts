import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { GameSlice } from 'app/slices'

export interface DicePanelState {
    areDiceShown: boolean,
}

const initialState: DicePanelState = {
    areDiceShown: false,
}

const slice = createSlice({
    name: 'dicePanel',
    initialState,
    reducers: {
        toggleDiceShown: (state) => {
            state.areDiceShown = !state.areDiceShown
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(GameSlice.startGame, (state) => {
                state.areDiceShown = initialState.areDiceShown
            })
            .addCase(GameSlice.startNextRound, (state) => {
                state.areDiceShown = false
            })
            .addCase(GameSlice.placeBid, (state) => {
                state.areDiceShown = false
            })
            .addCase(GameSlice.checkBid, (state) => {
                state.areDiceShown = false
            })
    },
})

export const reducer = slice.reducer
export const { toggleDiceShown } = slice.actions
export const selectAreDiceShown = (state: RootState) => state.dicePanel.areDiceShown
