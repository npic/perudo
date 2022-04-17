import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { stopGame } from '../../app/actions'
import { humanPlayerStartNextRound, selectIsGameOver, selectLoserIndex, selectRoom, selectTotalPoints } from './gameSlice'
import { BettingControls } from '../betting-controls/BettingControls'
import { DiceControls } from '../dice-controls/DiceControls'
import 'bootstrap/dist/css/bootstrap.css'
import { GameLog } from '../game-log/GameLog'

export function Game() {
    const room = useAppSelector(selectRoom)
    const isGameOver = useAppSelector(selectIsGameOver)
    const loserIndex = useAppSelector(selectLoserIndex)
    const totalPoints = useAppSelector(selectTotalPoints)
    const dispatch = useAppDispatch()

    return (
        <div>
            <div className="row my-5">
                <div className="col">
                    <h1>
                        {
                            isGameOver
                            ? (room.players.length > 0
                                ? `${room.players[room.currentTurnPlayerIndex].name} has won the game!`
                                : 'Nobody is here')
                            : `Round ${room.currentRoundNumber} ${room.isMaputoRound ? '(Maputo)' : ''}`
                        }
                    </h1>
                </div>
                <div className="col-1">
                    <button type="button" className="btn btn-danger" onClick={() => dispatch(stopGame())}>Quit</button>
                </div>
            </div>

            <div className="row mb-5">
                <div className="col">
                    <GameLog />
                </div>
            </div>

            {!isGameOver &&
                <div className="row mb-5">
                    <div className="row mb-3">
                        <div className="col">
                            <h2>{room.players[room.currentTurnPlayerIndex].name}</h2>
                        </div>
                    </div>
                    {room.roundEnded &&
                        <div className="row mb-3">
                            <div className="col">
                                <h4>{room.players[loserIndex].name} lost the round! There were {totalPoints} matching dice on the table.</h4>
                            </div>
                        </div>
                    }
                    {room.roundEnded &&
                        <div className="row mb-3">
                            <div className="col">
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => dispatch(humanPlayerStartNextRound())}
                                >Start Next Round</button>
                            </div>
                        </div>
                    }
                    <div className="row mb-3">
                        <div className="col">
                            <DiceControls />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <BettingControls />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}