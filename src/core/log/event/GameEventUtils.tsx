import i18n from 'app/i18n'
import { GameEvent, GameEventType } from 'core/types'
import { DieUtils } from 'core/utils'

export function formatAsJSX(event: GameEvent, key: string) {
    let titleText: string = ''
    let body: JSX.Element | undefined = undefined
    const bodyClassName = 'card-text'

    switch (event.type) {
        case GameEventType.GameStart:
            titleText = i18n.t('game.events.gameStart')
            body = (
                <div className={bodyClassName}>
                    {i18n.t('game.events.welcomePlayers') as string}
                    <ol className="mb-0">
                        {event.playerNames.map((playerName, i) => <li key={`welcomePlayer${i}`}>{playerName}</li>)}
                    </ol>
                </div>
            )
            break
        case GameEventType.RoundStart:
            titleText = i18n.t(event.isMaputo ? 'game.events.roundMaputoStart' : 'game.events.roundStart', { roundNumber: event.roundNumber })
            break
        case GameEventType.Bid:
            titleText = event.playerName
            body = (
                <div className={bodyClassName}>
                    {i18n.t('game.events.bid') as string} {event.bidQuantity}&nbsp;x&nbsp;<i className={`bi ${DieUtils.toBootstrapIconClass(event.bidDieFace)}`}></i>
                </div>
            )
            break
        case GameEventType.Check:
            titleText = event.playerName
            body = (
                <div className={bodyClassName}>
                    {i18n.t('game.events.check') as string}
                </div>
            )
            break
        case GameEventType.RevealAllDice:
            titleText = i18n.t('game.events.revealingDice')
            body = (
                <div className={bodyClassName}>
                    <ul className="mb-0">
                        {event.playerDice.map((player, playerIndex) =>
                            <li key={`revealRound${event.roundNumber}Player${playerIndex}`}>
                                {player.playerName}:
                                {player.dice.map((dieFace, dieIndex) =>
                                    <i
                                        className={`bi mx-1 ${DieUtils.toBootstrapIconClass(dieFace)} ${DieUtils.matches(dieFace, event.matchingDieFace) ? 'text-success' : 'opacity-25'}`}
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
            titleText = i18n.t('game.events.roundOutcome', { loserName: event.loserName })
            break
        case GameEventType.PlayerLost:
            titleText = i18n.t('game.events.gameLost', { loserName: event.loserName })
            break
        case GameEventType.RoundEnd:
            titleText = i18n.t('game.events.roundEnd', { roundNumber: event.roundNumber })
            break
        case GameEventType.PlayerWon:
            titleText = i18n.t('game.events.gameWon', { winnerName: event.winnerName })
            break
        case GameEventType.GameEnd:
            titleText = i18n.t('game.events.gameOver')
            break
    }

    return (
        <div className="card border-start border-end-0 border-top-0 border-bottom-0 border-primary border-2 rounded-0 my-3" key={key}>
            <div className="card-body">
                <h5 className={`card-title${body ? '' : ' mb-0'}`}>{titleText}</h5>
                {body}
            </div>
        </div>
    )
}
