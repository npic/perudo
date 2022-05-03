import { useTranslation } from 'react-i18next'
import { Player } from 'core/types'

import StartNextRoundButton from './StartNextRoundButton'

export default function RoundOutcomeInfoPanel({ loser, totalPoints }: { loser: Player, totalPoints: number }) {
    const { t } = useTranslation()
    return (
        <div className="row row-cols-1 g-1">
            <div className="col">
                <h4>{t('game.player.roundOutcome', { loserName: loser.name, count: totalPoints })}</h4>
            </div>
            <div className="col">
                <StartNextRoundButton />
            </div>
        </div>
    )
}