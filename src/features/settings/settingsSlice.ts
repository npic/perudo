import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { range } from '../../app/util'

export interface SettingsState {
    humanPlayers: number,
    humanPlayerNames: string[],
    aiPlayers: number,
    aiRiskLowerBound: number,
    aiRiskUpperBound: number,
    aiDelay: number,
}

const initialState: SettingsState = {
    humanPlayers: 1,
    humanPlayerNames: range(6).map((i) => 'Player ' + String(i + 1)),
    aiPlayers: 5,
    aiRiskLowerBound: 20,
    aiRiskUpperBound: 60,
    aiDelay: 1000,
}

interface SetHumanPlayerNamePayload {
    playerIndex: number,
    playerName: string,
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setHumanPlayers: (state, action: PayloadAction<number>) => {
            state.humanPlayers = action.payload
        },
        setHumanPlayerName: (state, action: PayloadAction<SetHumanPlayerNamePayload>) => {
            state.humanPlayerNames.splice(action.payload.playerIndex, 1, action.payload.playerName)
        },
        setAIPlayers: (state, action: PayloadAction<number>) => {
            state.aiPlayers = action.payload
        },
        setAIRiskLowerBound: (state, action: PayloadAction<number>) => {
            state.aiRiskLowerBound = action.payload
        },
        setAIRiskUpperBound: (state, action: PayloadAction<number>) => {
            state.aiRiskUpperBound = action.payload
        },
        setAIDelay: (state, action: PayloadAction<number>) => {
            state.aiDelay = action.payload
        },
    }
})

export const { setHumanPlayers, setHumanPlayerName, setAIPlayers, setAIRiskLowerBound, setAIRiskUpperBound, setAIDelay } = settingsSlice.actions
export const selectAllSettings = (state: RootState) => state.settings
export const selectHumanPlayers = (state: RootState) => state.settings.humanPlayers
export const selectHumanPlayerNames = (state: RootState) => state.settings.humanPlayerNames
export const selectAIPlayers = (state: RootState) => state.settings.aiPlayers
export const selectAIRiskLowerBound = (state: RootState) => state.settings.aiRiskLowerBound
export const selectAIRiskUpperBound = (state: RootState) => state.settings.aiRiskUpperBound
export const selectAIDelay = (state: RootState) => state.settings.aiDelay

export default settingsSlice.reducer