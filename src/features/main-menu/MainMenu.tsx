import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { Settings } from '../settings/Settings'
import { selectAllSettings } from '../settings/settingsSlice'
import { humanPlayerStartGame } from '../game/gameSlice'
import 'bootstrap/dist/css/bootstrap.css'

export function MainMenu() {
    const allSettings = useAppSelector(selectAllSettings)
    const dispatch = useAppDispatch()

    return (
        <div>
            <div className="row my-5">
                <div className="col">
                    <h1>Perudo</h1>
                </div>
            </div>

            <div className="row mb-5">
                <div className="col">
                    <button type="button" className='btn btn-lg btn-primary' onClick={() => dispatch(humanPlayerStartGame(allSettings))}>New Game</button>
                </div>
            </div>

            <div className="row mb-5">
                <div className="col">
                    <a href="http://perudo.ru/club/game/" target="_blank" rel="noreferrer" className="btn btn-info">Game Rules (in Russian)</a>
                </div>
            </div>

            <Settings />
        </div>
    )
}