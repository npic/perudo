import AppTitle from './AppTitle'
import NewGameButton from './NewGameButton'
import GameRulesButton from './GameRulesButton'
import SettingsPanel from './settings-panel/SettingsPanel'

export default function MainMenu() {
    return (
        <div className="container">
            <div className="row row-cols-1 my-5">
                <div className="col">
                    <AppTitle />
                </div>
            </div>

            <div className="row row-cols-1 my-5">
                <div className="col">
                    <NewGameButton />
                </div>
            </div>

            <div className="row row-cols-1 my-5">
                <div className="col">
                    <GameRulesButton />
                </div>
            </div>

            <div className="row row-cols-1 my-5">
                <div className="col">
                    <SettingsPanel />
                </div>
            </div>
        </div>
    )
}