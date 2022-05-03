import { useTranslation } from 'react-i18next'
import { Player, PlayerType } from 'core/types'

import DicePanel from './dice-panel/DicePanel'

export default function PlayerInfoPanel({ player, isRoundEnded }: { player: Player, isRoundEnded: boolean }) {
    const { t } = useTranslation()
    return (
        <div className="row row-cols-auto g-3 align-items-center">
            <div className="col">
                <h2>{t(isRoundEnded ? 'game.player.checks' : 'game.player.makesTurn', { playerName: player.name })}</h2>
            </div>
            <div className="col">
                {player.type === PlayerType.Human && <DicePanel player={player} disabled={isRoundEnded} />}
            </div>
        </div>
    )
}