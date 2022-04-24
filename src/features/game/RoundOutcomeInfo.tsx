import Player from '../../core/player/Player'

export function RoundOutcomeInfo({ loser, totalPoints }: { loser: Player, totalPoints: number }) {
    return (
        <div className="row my-3">
            <div className="col">
                <h4>{loser.name} lost the round! There were {totalPoints} matching dice on the table.</h4>
            </div>
        </div>
    )
}