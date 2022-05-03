import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from 'app/hooks'
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
    const dispatch = useAppDispatch()
    const { t, i18n } = useTranslation()

    return (
        <div className="row row-cols-1 gy-5">
            <div className="col">
                <RadioButtonGroupSetting
                    baseID="language"
                    label={t('mainMenu.language')}
                    options={[
                        {
                            label: 'English',
                            value: 'en',
                            disabled: false,
                            checked: i18n.language === 'en',
                        },
                        {
                            label: 'Русский',
                            value: 'ru',
                            disabled: false,
                            checked: i18n.language === 'ru',
                        },
                    ]}
                    onChange={(newValue: string) => dispatch(SettingsSlice.setLanguage(newValue))}
                />
            </div>
            
            <div className="col">
                <RadioButtonGroupSetting
                    baseID="humanPlayers"
                    label={t('mainMenu.humanPlayers')}
                    options={range(7).map((i) => ({
                        label: i.toString(),
                        value: i,
                        disabled: i + aiPlayers > 6,
                        checked: i === humanPlayers,
                    }))}
                    onChange={(newValue: number) => dispatch(SettingsSlice.setHumanPlayers(newValue))}
                />
            </div>

            {humanPlayers > 0 &&
                <div className="col">
                    <TextInputGroupSetting
                        baseID="humanPlayerName"
                        fields={
                            range(humanPlayers).map((i) => ({
                                label: t('mainMenu.humanPlayerName', { orderNo: i + 1 }),
                                value: humanPlayerNames[i],
                                onChange: (newValue: string) => dispatch(SettingsSlice.setHumanPlayerName({ playerIndex: i, playerName: newValue }))
                            }))
                        }
                    />
                </div>
            }

            <div className="col">
                <RadioButtonGroupSetting
                    baseID="aiPlayers"
                    label={t('mainMenu.aiPlayers')}
                    options={range(7).map((i) => ({
                        label: i.toString(),
                        value: i,
                        disabled: i + humanPlayers > 6,
                        checked: i === aiPlayers,
                    }))}
                    onChange={(newValue: number) => dispatch(SettingsSlice.setAIPlayers(newValue))}
                />
            </div>

            <div className="col">
                <RangeSetting
                    id="aiRiskLowerBoundControl"
                    label={t('mainMenu.aiRiskLowerBound', { value: aiRiskLowerBound })}
                    min={0}
                    minLabel={t('mainMenu.moreRisky')}
                    max={aiRiskUpperBound}
                    maxLabel={t('mainMenu.lessRisky')}
                    step={5}
                    value={aiRiskLowerBound}
                    onChange={(newValue: number) => dispatch(SettingsSlice.setAIRiskLowerBound(newValue))}
                />
            </div>

            <div className="col">
                <RangeSetting
                    id="aiRiskUpperBoundControl"
                    label={t('mainMenu.aiRiskUpperBound', { value: aiRiskUpperBound })}
                    min={aiRiskLowerBound}
                    minLabel={t('mainMenu.moreRisky')}
                    max={100}
                    maxLabel={t('mainMenu.lessRisky')}
                    step={5}
                    value={aiRiskUpperBound}
                    onChange={(newValue: number) => dispatch(SettingsSlice.setAIRiskUpperBound(newValue))}
                />
            </div>

            <div className="col">
                <RangeSetting
                    id="aiTopBidsSimilarityThreshold"
                    label={t('mainMenu.aiTopBidsSimilarityThreshold', { value: aiTopBidsSimilarityThreshold })}
                    min={0}
                    minLabel={t('mainMenu.morePrecise')}
                    max={100}
                    maxLabel={t('mainMenu.moreRandom')}
                    step={5}
                    value={aiTopBidsSimilarityThreshold}
                    onChange={(newValue: number) => dispatch(SettingsSlice.setAITopBidsSimilarityThreshold(newValue))}
                />
            </div>

            <div className="col">
                <RangeSetting
                    id="aiDelayControl"
                    label={t('mainMenu.aiDelay', { value: aiDelay })}
                    min={0}
                    minLabel={t('mainMenu.faster')}
                    max={3000}
                    maxLabel={t('mainMenu.slower')}
                    step={100}
                    value={aiDelay}
                    onChange={(newValue: number) => dispatch(SettingsSlice.setAIDelay(newValue))}
                />
            </div>
        </div>
    )
}