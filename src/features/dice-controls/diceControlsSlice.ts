import { createSlice } from '@reduxjs/toolkit'
import { checkBet, placeBet, startGame } from '../../app/actions'
import { RootState } from '../../app/store'

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
            .addCase(placeBet, (state) => {
                state.areDiceShown = false
            })
            .addCase(checkBet, (state) => {
                state.areDiceShown = false
            })
    },
})

export const { toggleDiceShown } = diceControlsSlice.actions
export const selectAreDiceShown = (state: RootState) => state.diceControls.areDiceShown

export default diceControlsSlice.reducer