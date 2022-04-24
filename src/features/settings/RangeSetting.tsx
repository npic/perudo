import { PayloadAction } from '@reduxjs/toolkit'
import { useAppDispatch } from '../../app/hooks'

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

export function RangeSetting({ id, label, min, minLabel, max, maxLabel, step, value, onChangeAction }: RangeSettingProps) {
    const dispatch = useAppDispatch()

    return (
        <div className="my-5">
            <div className="row">
                <div className="col">
                    <label htmlFor={id} className="form-label">{label}</label>
                </div>
            </div>
            <div className="row">
                <div className="col-2 text-end">{minLabel || min}</div>
                <div className="col-4">
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
                <div className="col-2 text-start">{maxLabel || max}</div>
            </div>
        </div>
    )
}