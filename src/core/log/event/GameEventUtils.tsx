import GameEvent from './GameEvent'
import GameEventType from './GameEventType'
import * as DieFaceUtils from '../../dice/face/DieFaceUtils'

export function formatAsJSX(event: GameEvent, key: string) {
    let titleText: string = ''
    let body: JSX.Element = (<div></div>)
    const bodyClassName = 'card-text'

    switch (event.type) {
        case GameEventType.GameStart:
            titleText = 'Game started'
            body = (
                <div className={bodyClassName}>
                    Welcome players:
                    <ol>
                        {event.playerNames.map((playerName, i) => <li key={`welcomePlayer${i}`}>{playerName}</li>)}
                    </ol>
                </div>
            )
            break
        case GameEventType.RoundStart:
            titleText = `Round ${event.roundNumber} started ${event.isMaputo ? ' - Maputo!' : ''}`
            break
        case GameEventType.Bid:
            titleText = event.playerName
            body = (
                <div className={bodyClassName}>
                    Bids {event.bidQuantity}&nbsp;x&nbsp;<i className={DieFaceUtils.toBootstrapIconClass(event.bidDieFace)}></i>
                </div>
            )
            break
        case GameEventType.Check:
            titleText = event.playerName
            body = (
                <div className={bodyClassName}>
                    Check!
                </div>
            )
            break
        case GameEventType.RevealAllDice:
            titleText = 'Revealing Dice'
            body = (
                <div className={bodyClassName}>
                    <ul>
                        {event.playerDice.map((player, playerIndex) =>
                            <li key={`revealRound${event.roundNumber}Player${playerIndex}`}>
                                {player.playerName}:
                                {player.dice.map((dieFace, dieIndex) =>
                                    <i
                                        className={`mx-1 ${DieFaceUtils.toBootstrapIconClass(dieFace)}`}
                                        key={`revealRound${event.roundNumber}Player${playerIndex}Die${dieIndex}`}
                                    ></i>
                                )}
                            </li>
                        )}
                    </ul>
                </div>
            )
            break
        case GameEventType.RoundOutcome:
            titleText = `${event.loserName} lost the round!`
            break
        case GameEventType.PlayerLost:
            titleText = `${event.loserName} lost the game!`
            break
        case GameEventType.RoundEnd:
            titleText = `Round ${event.roundNumber} ended`
            break
        case GameEventType.PlayerWon:
            titleText = `${event.winnerName} wins the game!`
            break
        case GameEventType.GameEnd:
            titleText = 'Game Over. Thank you for playing!'
            break
    }

    return (
        <div className="card my-1" key={key}>
            <div className="card-body">
                <h5 className="card-title">{titleText}</h5>
                {body}
            </div>
        </div>
    )
}
