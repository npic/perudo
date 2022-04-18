import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { checkBet } from '../../app/actions'
import { range } from '../../app/util'
import { getTotalDiceCount } from '../../app/player/PlayerRoom'
import { PlayerType } from '../../app/player/Player'
import { DieSide, dieSideToBootstrapIconClass } from '../../app/player/Die'
import { betGenerator } from '../../app/bet/Bet'
import { humanPlayerPlaceBet, selectRoom } from '../game/gameSlice'
import 'bootstrap-icons/font/bootstrap-icons.css'

export function BettingControls() {
    const playerRoom = useAppSelector(selectRoom)
    const dispatch = useAppDispatch()
    const bets = betGenerator(playerRoom.currentBet, getTotalDiceCount(playerRoom), playerRoom.isMaputoRound)
    return (
        <div>
            <div className="row">
                <div className="col">
                    {playerRoom.currentBet.quantity === 0
                        ? <h4>Place the first bet</h4>
                        : <h4>Current bet:&nbsp;
                            {playerRoom.currentBet.quantity}
                            &nbsp;x&nbsp;
                            <i
                                className={`text-danger fs-4 ${dieSideToBootstrapIconClass(playerRoom.currentBet.dieSide)}`}
                            ></i>
                        </h4>
                    }
                </div>
            </div>

            {playerRoom.players[playerRoom.currentTurnPlayerIndex].type === PlayerType.Human && !playerRoom.roundEnded &&
                <div className="row align-items-center">
                    {
                        range(35).map((i) => {
                            const nextBet = bets.next().value
                            return (
                                <div className="col-2 col-md-1 my-3" key={`betDiv${i}`}>
                                    {nextBet !== undefined &&
                                        <button
                                            type="button"
                                            className={`btn btn-${nextBet.dieSide === DieSide.Joker ? 'warning' : 'primary'}`}
                                            onClick={() => dispatch(humanPlayerPlaceBet(nextBet))}
                                        >
                                            {nextBet.quantity}&nbsp;x&nbsp;<i className={`${dieSideToBootstrapIconClass(nextBet.dieSide)}`}></i>
                                        </button>
                                    }
                                </div>
                            )
                        })
                    }
                    <div className="col-2 col-md-1 my-3">
                        <button
                            type="button"
                            className="btn btn-danger"
                            disabled={playerRoom.currentBet.quantity === 0}
                            onClick={() => dispatch(checkBet())}
                        >Check</button>
                    </div>
                </div>
            }
        </div>
    )
}