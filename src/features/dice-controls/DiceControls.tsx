import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { toggleDiceShown, selectAreDiceShown } from './DiceControlsSlice'

import Player from '../../core/player/Player'
import * as DieFaceUtils from '../../core/dice/face/DieFaceUtils'

export function DiceControls({ player, disabled }: { player: Player, disabled: boolean }) {
    const areDiceShown = useAppSelector(selectAreDiceShown)
    
    const dispatch = useAppDispatch()

    return (
        <div className="row my-3 align-items-center">
            <div className="col-auto">
                <button
                    type="button"
                    className="btn btn-primary"
                    disabled={disabled}
                    onClick={() => dispatch(toggleDiceShown())}
                >Show/Hide Dice</button>
            </div>
            <div className="col">
                {areDiceShown
                    ? player.dice.map((die, i) =>
                        <i
                            className={`text-danger mx-1 mx-sm-3 fs-1 ${DieFaceUtils.toBootstrapIconClass(die.value)}`}
                            key={`die${i}`}
                        ></i>
                    )
                    : <i className="mx-3 fs-1 invisible"></i>
                }
            </div>
        </div>
    )
}
