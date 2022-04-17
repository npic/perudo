import { createAction } from '@reduxjs/toolkit'
import { Bet } from './bet/Bet'
import { SettingsState } from '../features/settings/settingsSlice'

export const startGame = createAction<SettingsState>('startGame')
export const stopGame = createAction('stopGame')

export const startNextRound = createAction('startNextRound')
export const placeBet = createAction<Bet>('placeBet')
export const checkBet = createAction('checkBet')