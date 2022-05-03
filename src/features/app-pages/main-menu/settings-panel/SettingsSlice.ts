import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from 'app/store'
import i18n from 'app/i18n'

export interface SettingsState {
    humanPlayers: number,
    humanPlayerNames: string[],
    aiPlayers: number,
    aiRiskLowerBound: number,
    aiRiskUpperBound: number,
    aiTopBidsSimilarityThreshold: number,
    aiDelay: number,
}

const initialState: SettingsState = {
    humanPlayers: 1,
    humanPlayerNames: i18n.t('playerNames.human', { returnObjects: true }),
    aiPlayers: 5,
    aiRiskLowerBound: 20,
    aiRiskUpperBound: 60,
    aiTopBidsSimilarityThreshold: 10,
    aiDelay: 1000,
}

interface SetHumanPlayerNamePayload {
    playerIndex: number,
    playerName: string,
}

const slice = createSlice({
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
        setAITopBidsSimilarityThreshold: (state, action: PayloadAction<number>) => {
            state.aiTopBidsSimilarityThreshold = action.payload
        },
        setAIDelay: (state, action: PayloadAction<number>) => {
            state.aiDelay = action.payload
        },
    }
})

export const reducer = slice.reducer

export const {
    setHumanPlayers,
    setHumanPlayerName,
    setAIPlayers,
    setAIRiskLowerBound,
    setAIRiskUpperBound,
    setAITopBidsSimilarityThreshold,
    setAIDelay
} = slice.actions
export const setLanguage = (newLanguage: string): AppThunk => (dispatch, getState) => {
    const state = getState()
    const currentPlayerNames = selectHumanPlayerNames(state)
    let defaultPlayerNames = i18n.t('playerNames.human', { returnObjects: true })
    const needTranslation = currentPlayerNames.map((playerName, i) => playerName === defaultPlayerNames[i])
    i18n.changeLanguage(newLanguage)
    defaultPlayerNames = i18n.t('playerNames.human', { returnObjects: true })
    needTranslation.forEach((needToChangeName, i) => {
        if (needToChangeName) {
            dispatch(setHumanPlayerName({
                playerIndex: i,
                playerName: defaultPlayerNames[i],
            }))
        }
    })
}

export const selectAllSettings = (state: RootState) => state.settings
export const selectHumanPlayers = (state: RootState) => state.settings.humanPlayers
export const selectHumanPlayerNames = (state: RootState) => state.settings.humanPlayerNames
export const selectAIPlayers = (state: RootState) => state.settings.aiPlayers
export const selectAIRiskLowerBound = (state: RootState) => state.settings.aiRiskLowerBound
export const selectAIRiskUpperBound = (state: RootState) => state.settings.aiRiskUpperBound
export const selectAITopBidsSimilarityThreshold = (state: RootState) => state.settings.aiTopBidsSimilarityThreshold
export const selectAIDelay = (state: RootState) => state.settings.aiDelay
