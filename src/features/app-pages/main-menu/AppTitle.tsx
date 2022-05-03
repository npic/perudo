import { useTranslation } from 'react-i18next'

export default function AppTitle() {
    const { t } = useTranslation()
    return <h1 className="display-1">{t('mainMenu.appName')}</h1>
}