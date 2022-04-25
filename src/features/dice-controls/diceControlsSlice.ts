import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { startGame, startNextRound, placeBid, checkBid } from '../../app/actions'

export interface DiceControlsState {
    areDiceShown: boolean,
}

const initialState: DiceControlsState = {
    areDiceShown: false,
}

export const diceControlsSlice = createSlice({
    name: 'diceControls',
    initialState,
    reducers: {
        toggleDiceShown: (state) => {
            state.areDiceShown = !state.areDiceShown
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(startGame, (state) => {
                state.areDiceShown = initialState.areDiceShown
            })
            .addCase(startNextRound, (state) => {
                state.areDiceShown = false
            })
            .addCase(placeBid, (state) => {
                state.areDiceShown = false
            })
            .addCase(checkBid, (state) => {
                state.areDiceShown = false
            })
    },
})

export const { toggleDiceShown } = diceControlsSlice.actions
export const selectAreDiceShown = (state: RootState) => state.diceControls.areDiceShown

export default diceControlsSlice.reducer