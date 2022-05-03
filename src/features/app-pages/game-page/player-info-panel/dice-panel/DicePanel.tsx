import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { DicePanelSlice } from 'app/slices'
import { Player } from 'core/types'
import { DieUtils } from 'core/utils'

export default function DicePanel({ player, disabled }: { player: Player, disabled: boolean }) {
    const areDiceShown = useAppSelector(DicePanelSlice.selectAreDiceShown)
    const dispatch = useAppDispatch()
    const { t } = useTranslation()

    return (
        <div className="row row-cols-auto g-3 align-items-center">
            <div className="col">
                <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    disabled={disabled}
                    onClick={() => dispatch(DicePanelSlice.toggleDiceShown())}
                >{t(areDiceShown ? 'game.buttons.hideDice' : 'game.buttons.showDice')}</button>
            </div>
            <div className="col">
                <div className="row row-cols-auto g-3 align-items-center">
                    {player.dice.map((die, i) =>
                        <div className="col" key={`dieDiv${i}`}>
                            <i
                                className={`bi text-danger fs-1 ${DieUtils.toBootstrapIconClass(die.value)} ${areDiceShown ? 'opacity-100' : 'opacity-0'}`}
                                style={{ transition: `opacity 0.5s ease ${0.1 * i}s` }}
                                key={`die${i}`}
                            ></i>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
