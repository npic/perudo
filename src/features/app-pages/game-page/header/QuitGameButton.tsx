import { useTranslation } from 'react-i18next'
import { useAppDispatch } from 'app/hooks'
import { GameSlice } from 'app/slices'

export default function QuitGameButton() {
    const dispatch = useAppDispatch()
    const { t } = useTranslation()
    
    return (
        <button type="button" className="btn btn-danger" onClick={() => dispatch(GameSlice.stopGame())}>{t('game.buttons.quit')}</button>
    )
}