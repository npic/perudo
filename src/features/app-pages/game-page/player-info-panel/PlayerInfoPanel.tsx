import { Player, PlayerType } from 'core/types'
import DicePanel from './dice-panel/DicePanel'

export default function PlayerInfoPanel({ player, isRoundEnded }: { player: Player, isRoundEnded: boolean }) {
    return (
        <div className="row row-cols-auto g-3 align-items-center">
            <div className="col">
                <h2>{player.name}{isRoundEnded && ' checks!'}</h2>
            </div>
            <div className="col">
                {player.type === PlayerType.Human && <DicePanel player={player} disabled={isRoundEnded} />}
            </div>
        </div>
    )
}