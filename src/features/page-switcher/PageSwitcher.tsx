import { useAppSelector } from '../../app/hooks'
import { AppPage, selectCurrentPage } from './pageSwitcherSlice'
import { MainMenu } from '../main-menu/MainMenu'
import { Game } from '../game/Game'

export function PageSwitcher() {
    const currentPage = useAppSelector(selectCurrentPage)
    switch (currentPage) {
        case AppPage.MainMenu:
            return <MainMenu />
        case AppPage.Game:
            return <Game />
    }
}
