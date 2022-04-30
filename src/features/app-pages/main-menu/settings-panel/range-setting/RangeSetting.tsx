import { PayloadAction } from '@reduxjs/toolkit'
import { useAppDispatch } from 'app/hooks'
import RangeSettingLabel from './RangeSettingLabel'

interface RangeSettingProps {
    id: string,
    label: string,
    min: number,
    minLabel?: string,
    max: number,
    maxLabel?: string,
    step: number,
    value: number,
    onChangeAction: (payload: number) => PayloadAction<any>,
}

export default function RangeSetting({ id, label, min, minLabel = '', max, maxLabel = '', step, value, onChangeAction }: RangeSettingProps) {
    const dispatch = useAppDispatch()

    return (
        <div className="row gx-3">
            <div className="col-12">
                <label htmlFor={id} className="form-label">{label}</label>
            </div>
            <div className="col-auto">
                <RangeSettingLabel rangeValue={min} explanation={minLabel} side="left" />
            </div>
            <div className="col-auto col-lg-4 flex-grow-1 flex-lg-grow-0">
                <input
                    type="range"
                    className="form-range"
                    id={id}
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => dispatch(onChangeAction(Number(e.target.value)))}
                ></input>
            </div>
            <div className="col-auto">
                <RangeSettingLabel rangeValue={max} explanation={maxLabel} side="right" />
            </div>
        </div>
    )
}