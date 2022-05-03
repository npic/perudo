import { useTranslation } from 'react-i18next'
import { useAppSelector, useAppDispatch } from 'app/hooks'
import { GameSlice, SettingsSlice } from 'app/slices'

export default function NewGameButton() {
    const allSettings = useAppSelector(SettingsSlice.selectAllSettings)
    const dispatch = useAppDispatch()
    const { t } = useTranslation()
    
    return (
        <button
            type="button"
            className='btn btn-lg btn-primary'
            onClick={() => dispatch(GameSlice.humanPlayerStartGame(allSettings))}
        >{t('mainMenu.newGame')}</button>
    )
}