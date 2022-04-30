import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { GameSlice } from 'app/slices'

export enum AppPage {
    MainMenu = 'Main Menu',
    Game = 'Game',
}

export interface PageSwitcherState {
    currentPage: AppPage,
}

const initialState: PageSwitcherState = {
    currentPage: AppPage.MainMenu,
}

const slice = createSlice({
    name: 'pageSwitcher',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GameSlice.startGame, (state) => {
                state.currentPage = AppPage.Game
            })
            .addCase(GameSlice.stopGame, (state) => {
                state.currentPage = AppPage.MainMenu
            })
    }
})

export const reducer = slice.reducer
export const selectCurrentPage = (state: RootState) => state.pageSwitcher.currentPage
