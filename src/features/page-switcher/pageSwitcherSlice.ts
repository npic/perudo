import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { startGame, stopGame } from '../../app/actions'

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

export const pageSwitcherSlice = createSlice({
    name: 'pageSwitcher',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(startGame, (state) => {
                state.currentPage = AppPage.Game
            })
            .addCase(stopGame, (state) => {
                state.currentPage = AppPage.MainMenu
            })
    }
})

export const selectCurrentPage = (state: RootState) => state.pageSwitcher.currentPage

export default pageSwitcherSlice.reducer