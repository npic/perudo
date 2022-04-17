import { DieSide, dieSideToBootstrapIconClass } from '../player/Die'

export enum GameEventType {
    GameStart = 'Game Started',
    RoundStart = 'Round Started',
    Bet = 'Bet Placed',
    Check = 'Check',
    RevealAllDice = 'Reveal All Dice',
    RoundOutcome = 'Round Outcome',
    PlayerLost = 'Player Lost the Game',
    RoundEnd = 'Round Ended',
    PlayerWon = 'Player Wins the Game',
    GameEnd = 'Game Ended',
}

export interface GameStartEvent {
    type: GameEventType.GameStart,
    playerNames: string[],
}

export interface RoundStartEvent {
    type: GameEventType.RoundStart,
    roundNumber: number,
    isMaputo: boolean,
}

export interface BetEvent {
    type: GameEventType.Bet,
    playerName: string,
    betQuantity: number,
    betDieSide: DieSide,
}

export interface CheckEvent {
    type: GameEventType.Check,
    playerName: string,
}

export interface RevealAllDiceEvent {
    type: GameEventType.RevealAllDice,
    playerDice: { playerName: string, dice: DieSide[] }[],
}

export interface RoundOutcomeEvent {
    type: GameEventType.RoundOutcome,
    loserName: string,
}

export interface PlayerLostEvent {
    type: GameEventType.PlayerLost,
    loserName: string,
}

export interface RoundEndEvent {
    type: GameEventType.RoundEnd,
    roundNumber: number,
}

export interface PlayerWonEvent {
    type: GameEventType.PlayerWon,
    winnerName: string,
}

export interface GameEndEvent {
    type: GameEventType.GameEnd,
}

export type GameEvent =
    | GameStartEvent
    | RoundStartEvent
    | BetEvent
    | CheckEvent
    | RevealAllDiceEvent
    | RoundOutcomeEvent
    | PlayerLostEvent
    | RoundEndEvent
    | PlayerWonEvent
    | GameEndEvent

export type GameLog = GameEvent[]

export function createNewLog(): GameLog {
    return []
}

export function addEvent(eventLog: GameLog, event: GameEvent) {
    eventLog.push(event)
}

export function formatEventAsJSX(event: GameEvent) {
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
                        {event.playerNames.map((playerName) => <li>{playerName}</li>)}
                    </ol>
                </div>
            )
            break
        case GameEventType.RoundStart:
            titleText = `Round ${event.roundNumber} started ${event.isMaputo ? ' - Maputo!' : ''}`
            break
        case GameEventType.Bet:
            titleText = event.playerName
            body = (
                <div className={bodyClassName}>
                    Bets {event.betQuantity}&nbsp;x&nbsp;<i className={dieSideToBootstrapIconClass(event.betDieSide)}></i>
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
                        {
                            event.playerDice.map((player) =>
                                <li>
                                    {player.playerName}:
                                    {
                                        player.dice.map((dieSide) =>
                                            <i className={`mx-1 ${dieSideToBootstrapIconClass(dieSide)}`}></i>
                                        )
                                    }
                                </li>
                            )
                        }
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
        <div className="card my-1">
            <div className="card-body">
                <h5 className="card-title">{titleText}</h5>
                {body}
            </div>
        </div>
    )
}