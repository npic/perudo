import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { PlayerType } from '../../app/player/Player'
import { dieSideToBootstrapIconClass } from '../../app/player/Die'
import { selectRoom } from '../game/gameSlice'
import { toggleDiceShown, selectAreDiceShown } from './diceControlsSlice'
import 'bootstrap-icons/font/bootstrap-icons.css'

export function DiceControls() {
    const playerRoom = useAppSelector(selectRoom)
    const areDiceShown = useAppSelector(selectAreDiceShown)
    const dispatch = useAppDispatch()

    return (
        <div>
            <div className="row align-items-center">
                <div className="col-auto">
                    <button
                        type="button"
                        className="btn btn-primary"
                        disabled={playerRoom.players[playerRoom.currentTurnPlayerIndex].type !== PlayerType.Human}
                        onClick={() => dispatch(toggleDiceShown())}
                    >Show/Hide Dice</button>
                </div>
                <div className="col">
                    {areDiceShown
                        ? playerRoom.players[playerRoom.currentTurnPlayerIndex].dice.map((die, i) =>
                            <i
                                className={`text-danger mx-2 mx-sm-3 fs-1 ${dieSideToBootstrapIconClass(die.value)}`}
                                key={`die_${playerRoom.currentTurnPlayerIndex}_${i}`}
                            ></i>
                        )
                        : <i className="mx-3 fs-1 invisible"></i>
                    }
                </div>
            </div>
        </div>
    )
}
