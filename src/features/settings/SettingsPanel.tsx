import { useAppSelector } from '../../app/hooks'
import {
    setHumanPlayers,
    setHumanPlayerName,
    setAIPlayers,
    setAIRiskLowerBound,
    setAIRiskUpperBound,
    setAITopBidsSimilarityThreshold,
    setAIDelay,
    selectHumanPlayers,
    selectHumanPlayerNames,
    selectAIPlayers,
    selectAIRiskLowerBound,
    selectAIRiskUpperBound,
    selectAITopBidsSimilarityThreshold,
    selectAIDelay,
} from './SettingsSlice'
import { range } from '../../core/util'

import { RadioButtonGroupSetting } from './RadioButtonGroupSetting'
import { TextInputGroupSetting } from './TextInputGroupSetting'
import { RangeSetting } from './RangeSetting'

export function SettingsPanel() {
    const humanPlayers = useAppSelector(selectHumanPlayers)
    const humanPlayerNames = useAppSelector(selectHumanPlayerNames)
    const aiPlayers = useAppSelector(selectAIPlayers)
    const aiRiskLowerBound = useAppSelector(selectAIRiskLowerBound)
    const aiRiskUpperBound = useAppSelector(selectAIRiskUpperBound)
    const aiTopBidsSimilarityThreshold = useAppSelector(selectAITopBidsSimilarityThreshold)
    const aiDelay = useAppSelector(selectAIDelay)

    return (
        <div>
            <RadioButtonGroupSetting
                baseID="humanPlayers"
                label="Human Players"
                options={range(7).map((i) => ({
                    label: i.toString(),
                    value: i,
                    disabled: i + aiPlayers > 6,
                    checked: i === humanPlayers,
                }))}
                onChangeAction={setHumanPlayers}
            />

            {humanPlayers > 0 &&
                <TextInputGroupSetting
                    baseID="humanPlayerName"
                    fields={
                        range(humanPlayers).map((i) => ({
                            label: `Player ${i + 1} Name`,
                            value: humanPlayerNames[i],
                            onChangeAction: (newValue: string) => setHumanPlayerName({ playerIndex: i, playerName: newValue })
                        }))
                    }
                />
            }

            <RadioButtonGroupSetting
                baseID="aiPlayers"
                label="Computer Players"
                options={range(7).map((i) => ({
                    label: i.toString(),
                    value: i,
                    disabled: i + humanPlayers > 6,
                    checked: i === aiPlayers,
                }))}
                onChangeAction={setAIPlayers}
            />

            <RangeSetting
                id="aiRiskLowerBoundControl"
                label={`AI Risk Lower Bound: ${aiRiskLowerBound}%`}
                min={0}
                minLabel="(More Risky) 0"
                max={aiRiskUpperBound}
                maxLabel={`${aiRiskUpperBound} (Less Risky)`}
                step={5}
                value={aiRiskLowerBound}
                onChangeAction={setAIRiskLowerBound}
            />

            <RangeSetting
                id="aiRiskUpperBoundControl"
                label={`AI Risk Upper Bound: ${aiRiskUpperBound}%`}
                min={aiRiskLowerBound}
                minLabel={`(More Risky) ${aiRiskLowerBound}`}
                max={100}
                maxLabel="100 (Less Risky)"
                step={5}
                value={aiRiskUpperBound}
                onChangeAction={setAIRiskUpperBound}
            />

            <RangeSetting
                id="aiTopBidsSimilarityThreshold"
                label={`AI Top Bids Similarity Threshold: ${aiTopBidsSimilarityThreshold}%`}
                min={0}
                minLabel="(More Precise) 0"
                max={100}
                maxLabel="100 (More Random)"
                step={5}
                value={aiTopBidsSimilarityThreshold}
                onChangeAction={setAITopBidsSimilarityThreshold}
            />

            <RangeSetting
                id="aiDelayControl"
                label={`AI Delay: ${aiDelay} ms`}
                min={0}
                minLabel="(Faster) 0"
                max={3000}
                maxLabel="100 (Slower)"
                step={100}
                value={aiDelay}
                onChangeAction={setAIDelay}
            />
        </div>
    )
}