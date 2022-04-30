import { useAppSelector } from 'app/hooks'
import { PageSwitcherSlice } from 'app/slices'

import MainMenu from 'features/app-pages/main-menu/MainMenu'
import GamePage from 'features/app-pages/game-page/GamePage'

export default function PageSwitcher() {
    const currentPage = useAppSelector(PageSwitcherSlice.selectCurrentPage)
    switch (currentPage) {
        case PageSwitcherSlice.AppPage.MainMenu:
            return <MainMenu />
        case PageSwitcherSlice.AppPage.Game:
            return <GamePage />
    }
}
