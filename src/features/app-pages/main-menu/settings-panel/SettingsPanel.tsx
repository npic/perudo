import { useAppSelector } from 'app/hooks'
import { SettingsSlice } from 'app/slices'
import { range } from 'core/utils'

import RadioButtonGroupSetting from './RadioButtonGroupSetting'
import TextInputGroupSetting from './TextInputGroupSetting'
import RangeSetting from './range-setting/RangeSetting'

export default function SettingsPanel() {
    const humanPlayers = useAppSelector(SettingsSlice.selectHumanPlayers)
    const humanPlayerNames = useAppSelector(SettingsSlice.selectHumanPlayerNames)
    const aiPlayers = useAppSelector(SettingsSlice.selectAIPlayers)
    const aiRiskLowerBound = useAppSelector(SettingsSlice.selectAIRiskLowerBound)
    const aiRiskUpperBound = useAppSelector(SettingsSlice.selectAIRiskUpperBound)
    const aiTopBidsSimilarityThreshold = useAppSelector(SettingsSlice.selectAITopBidsSimilarityThreshold)
    const aiDelay = useAppSelector(SettingsSlice.selectAIDelay)

    return (
        <div className="row row-cols-1 gy-5">
            <div className="col">
                <RadioButtonGroupSetting
                    baseID="humanPlayers"
                    label="Human Players"
                    options={range(7).map((i) => ({
                        label: i.toString(),
                        value: i,
                        disabled: i + aiPlayers > 6,
                        checked: i === humanPlayers,
                    }))}
                    onChangeAction={SettingsSlice.setHumanPlayers}
                />
            </div>

            {humanPlayers > 0 &&
                <div className="col">
                    <TextInputGroupSetting
                        baseID="humanPlayerName"
                        fields={
                            range(humanPlayers).map((i) => ({
                                label: `Player ${i + 1} Name`,
                                value: humanPlayerNames[i],
                                onChangeAction: (newValue: string) => SettingsSlice.setHumanPlayerName({ playerIndex: i, playerName: newValue })
                            }))
                        }
                    />
                </div>
            }

            <div className="col">
                <RadioButtonGroupSetting
                    baseID="aiPlayers"
                    label="Computer Players"
                    options={range(7).map((i) => ({
                        label: i.toString(),
                        value: i,
                        disabled: i + humanPlayers > 6,
                        checked: i === aiPlayers,
                    }))}
                    onChangeAction={SettingsSlice.setAIPlayers}
                />
            </div>

            <div className="col">
                <RangeSetting
                    id="aiRiskLowerBoundControl"
                    label={`AI Risk Lower Bound: ${aiRiskLowerBound}%`}
                    min={0}
                    minLabel="(More Risky)"
                    max={aiRiskUpperBound}
                    maxLabel="(Less Risky)"
                    step={5}
                    value={aiRiskLowerBound}
                    onChangeAction={SettingsSlice.setAIRiskLowerBound}
                />
            </div>

            <div className="col">
                <RangeSetting
                    id="aiRiskUpperBoundControl"
                    label={`AI Risk Upper Bound: ${aiRiskUpperBound}%`}
                    min={aiRiskLowerBound}
                    minLabel="(More Risky)"
                    max={100}
                    maxLabel="(Less Risky)"
                    step={5}
                    value={aiRiskUpperBound}
                    onChangeAction={SettingsSlice.setAIRiskUpperBound}
                />
            </div>

            <div className="col">
                <RangeSetting
                    id="aiTopBidsSimilarityThreshold"
                    label={`AI Top Bids Similarity Threshold: ${aiTopBidsSimilarityThreshold}%`}
                    min={0}
                    minLabel="(More Precise)"
                    max={100}
                    maxLabel="(More Random)"
                    step={5}
                    value={aiTopBidsSimilarityThreshold}
                    onChangeAction={SettingsSlice.setAITopBidsSimilarityThreshold}
                />
            </div>

            <div className="col">
                <RangeSetting
                    id="aiDelayControl"
                    label={`AI Delay: ${aiDelay} ms`}
                    min={0}
                    minLabel="(Faster)"
                    max={3000}
                    maxLabel="(Slower)"
                    step={100}
                    value={aiDelay}
                    onChangeAction={SettingsSlice.setAIDelay}
                />
            </div>
        </div>
    )
}