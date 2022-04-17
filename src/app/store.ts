import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import pageSwitcherReducer from '../features/page-switcher/pageSwitcherSlice'
import settingsReducer from '../features/settings/settingsSlice'
import gameReducer from '../features/game/gameSlice'
import diceControlsReducer from '../features/dice-controls/diceControlsSlice'

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
