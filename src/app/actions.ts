import { createAction } from '@reduxjs/toolkit'
import Bid from '../core/bid/Bid'
import { SettingsState } from '../features/settings/SettingsSlice'

export const startGame = createAction<SettingsState>('startGame')
export const stopGame = createAction('stopGame')

export const startNextRound = createAction('startNextRound')
export const placeBid = createAction<Bid>('placeBid')
export const checkBid = createAction('checkBid')