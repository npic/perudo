import { useAppSelector } from '../../app/hooks'
import { AppPage, selectCurrentPage } from './PageSwitcherSlice'

import { MainMenu } from '../main-menu/MainMenu'
import { GamePage } from '../game/GamePage'

export function PageSwitcher() {
    const currentPage = useAppSelector(selectCurrentPage)
    switch (currentPage) {
        case AppPage.MainMenu:
            return <MainMenu />
        case AppPage.Game:
            return <GamePage />
    }
}
