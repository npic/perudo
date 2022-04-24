import Player from '../../core/player/Player'
import PlayerType from '../../core/player/PlayerType'
import { DiceControls } from '../dice-controls/DiceControls'

export function PlayerInfo({ player }: { player: Player }) {
    return (
        <div>
            <div className="row my-3">
                <div className="col">
                    <h2>{player.name}</h2>
                </div>
            </div>
            <DiceControls player={player} disabled={player.type === PlayerType.AI} />
        </div>
    )
}