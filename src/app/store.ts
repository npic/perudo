import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import pageSwitcherReducer from '../features/page-switcher/PageSwitcherSlice'
import settingsReducer from '../features/settings/SettingsSlice'
import gameReducer from '../features/game/GameSlice'
import diceControlsReducer from '../features/dice-controls/DiceControlsSlice'

export const store = configureStore({
  reducer: {
    pageSwitcher: pageSwitcherReducer,
    settings: settingsReducer,
    game: gameReducer,
    diceControls: diceControlsReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
