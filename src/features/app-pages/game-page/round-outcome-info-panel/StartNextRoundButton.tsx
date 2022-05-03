import { useTranslation } from 'react-i18next'
import { useAppDispatch } from 'app/hooks'
import { GameSlice } from 'app/slices'

export default function StartNextRoundButton() {
    const dispatch = useAppDispatch()
    const { t } = useTranslation()
    
    return (
        <button
            type="button"
            className="btn btn-success"
            onClick={() => dispatch(GameSlice.humanPlayerStartNextRound())}
        >{t('game.buttons.startNextRound')}</button>
    )
}