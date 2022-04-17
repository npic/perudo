import { useAppSelector, useAppDispatch } from '../../app/hooks'
import {
    setHumanPlayers,
    setAIPlayers,
    setAIRiskLowerBound,
    setAIRiskUpperBound,
    setAIDelay,
    setHumanPlayerName,
    selectHumanPlayers,
    selectAIPlayers,
    selectAIRiskLowerBound,
    selectAIRiskUpperBound,
    selectAIDelay,
    selectHumanPlayerNames,
} from './settingsSlice'
import { range } from '../../app/util'
import 'bootstrap/dist/css/bootstrap.css'

export function Settings() {
    const humanPlayers = useAppSelector(selectHumanPlayers)
    const aiPlayers = useAppSelector(selectAIPlayers)
    const aiRiskLowerBound = useAppSelector(selectAIRiskLowerBound)
    const aiRiskUpperBound = useAppSelector(selectAIRiskUpperBound)
    const aiDelay = useAppSelector(selectAIDelay)
    const humanPlayerNames = useAppSelector(selectHumanPlayerNames)
    const dispatch = useAppDispatch()

    return (
        <div>
            <div className="row">
                <div className="col">
                    <label className="form-label">Human Players</label>
                </div>
            </div>
            <div className="row mb-5">
                <div className="col">
                    <div className="btn-group" role="group">
                        {
                            (() => {
                                let result: JSX.Element[] = [];
                                range(7).forEach((i) => {
                                    result.push(
                                        <input
                                            type="radio"
                                            className="btn-check"
                                            name="humanPlayersRadio"
                                            id={`humanPlayers${i}`}
                                            key={`humanPlayersInput${i}`}
                                            autoComplete="off"
                                            disabled={aiPlayers + i > 6}
                                            checked={i === humanPlayers}
                                            onChange={() => dispatch(setHumanPlayers(i))}
                                        ></input>
                                    )
                                    result.push(
                                        <label
                                            className="btn btn-outline-primary"
                                            htmlFor={`humanPlayers${i}`}
                                            key={`humanPlayersLabel${i}`}
                                        >{i}</label>
                                    )
                                })
                                return result
                            })()
                        }
                    </div>
                </div>
            </div>

            {
                (() => {
                    if (humanPlayers > 0) {
                        const result = range(humanPlayers).map((i) =>
                            <div className="col-2" key={`humanPlayerNameDiv${i}`}>
                                <label
                                    className="form-label"
                                    htmlFor={`humanPlayerName${i}`}
                                    key={`humanPlayerNameLabel${i}`}
                                >Player {i + 1} Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id={`humanPlayerName${i}`}
                                    key={`humanPlayerNameInput${i}`}
                                    value={humanPlayerNames[i]}
                                    onChange={(e) => dispatch(setHumanPlayerName({playerIndex: i, playerName: e.target.value}))}
                                ></input>
                            </div>
                        )
                        return (
                            <div className="row mb-5">
                                {result}
                            </div>
                        )
                    }
                })()
            }

            <div className="row">
                <div className="col">
                    <label className="form-label">Computer Players</label>
                </div>
            </div>
            <div className="row mb-5">
                <div className="col">
                    <div className="btn-group" role="group">
                        {
                            (() => {
                                let result: JSX.Element[] = [];
                                range(7).forEach((i) => {
                                    result.push(
                                        <input
                                            type="radio"
                                            className="btn-check"
                                            name="aiPlayersRadio"
                                            id={`aiPlayers${i}`}
                                            key={`aiPlayersInput${i}`}
                                            autoComplete="off"
                                            disabled={humanPlayers + i > 6}
                                            checked={i === aiPlayers}
                                            onChange={() => dispatch(setAIPlayers(i))}
                                        ></input>
                                    )
                                    result.push(
                                        <label
                                            className="btn btn-outline-primary"
                                            htmlFor={`aiPlayers${i}`}
                                            key={`aiPlayersLabel${i}`}
                                        >{i}</label>
                                    )
                                })
                                return result
                            })()
                        }
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <label htmlFor="aiRiskLowerBoundControl" className="form-label">AI Risk Lower Bound: {aiRiskLowerBound}%</label>
                </div>
            </div>
            <div className="row mb-5">
                <div className="col-1 text-end">0</div>
                <div className="col-4">
                    <input type="range" className="form-range" min="0" max={aiRiskUpperBound} step="5" id="aiRiskLowerBoundControl" value={aiRiskLowerBound} onChange={(e) => dispatch(setAIRiskLowerBound(Number(e.target.value)))}></input>
                </div>
                <div className="col-1 text-start">{aiRiskUpperBound}</div>
            </div>

            <div className="row">
                <div className="col">
                    <label htmlFor="aiRiskUpperBoundControl" className="form-label">AI Risk Upper Bound: {aiRiskUpperBound}%</label>
                </div>
            </div>
            <div className="row mb-5">
                <div className="col-1 text-end">{aiRiskLowerBound}</div>
                <div className="col-4">
                    <input type="range" className="form-range" min={aiRiskLowerBound} max="100" step="5" id="aiRiskUpperBoundControl" value={aiRiskUpperBound} onChange={(e) => dispatch(setAIRiskUpperBound(Number(e.target.value)))}></input>
                </div>
                <div className="col-1 text-start">100</div>
            </div>

            <div className="row">
                <div className="col">
                    <label htmlFor="aiDelayControl" className="form-label">AI Delay: {aiDelay} ms</label>
                </div>
            </div>
            <div className="row mb-5">
                <div className="col-1 text-end">0</div>
                <div className="col-4">
                    <input type="range" className="form-range" min="0" max="3000" step="100" id="aiDelayControl" value={aiDelay} onChange={(e) => dispatch(setAIDelay(Number(e.target.value)))}></input>
                </div>
                <div className="col-1 text-start">3000</div>
            </div>
        </div>
    )
}