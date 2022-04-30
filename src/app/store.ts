import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { GameSlice, SettingsSlice, PageSwitcherSlice, DicePanelSlice } from 'app/slices'

export const store = configureStore({
  reducer: {
    game: GameSlice.reducer,
    settings: SettingsSlice.reducer,
    pageSwitcher: PageSwitcherSlice.reducer,
    dicePanel: DicePanelSlice.reducer,
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
