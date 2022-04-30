import { Player } from 'core/types'
import StartNextRoundButton from './StartNextRoundButton'

export default function RoundOutcomeInfoPanel({ loser, totalPoints }: { loser: Player, totalPoints: number }) {
    return (
        <div className="row row-cols-1 g-1">
            <div className="col">
                <h4>{loser.name} lost the round! There were {totalPoints} matching dice on the table.</h4>
            </div>
            <div className="col">
                <StartNextRoundButton />
            </div>
        </div>
    )
}