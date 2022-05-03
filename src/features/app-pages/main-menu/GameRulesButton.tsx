import { useTranslation } from 'react-i18next'

export default function GameRulesButton() {
    const { t } = useTranslation()
    
    return (
        <a href="http://perudo.ru/club/game/" target="_blank" rel="noreferrer" className="btn btn-info">
            {t('mainMenu.gameRules')}
            <i className="bi bi-box-arrow-up-right ms-2"></i>
        </a>
    )
}