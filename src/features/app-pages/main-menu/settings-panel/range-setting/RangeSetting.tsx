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
    onChange: (newValue: number) => any,
}

export default function RangeSetting({ id, label, min, minLabel = '', max, maxLabel = '', step, value, onChange }: RangeSettingProps) {
    return (
        <div className="row gx-3">
            <div className="col-12">
                <label htmlFor={id} className="form-label">{label}</label>
            </div>
            <div className="col-2 col-md-auto">
                <RangeSettingLabel rangeValue={min} explanation={minLabel} side="left" />
            </div>
            <div className="col-8 col-md-6 flex-grow-1 flex-lg-grow-0">
                <input
                    type="range"
                    className="form-range"
                    id={id}
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                ></input>
            </div>
            <div className="col-2 col-md-auto">
                <RangeSettingLabel rangeValue={max} explanation={maxLabel} side="right" />
            </div>
        </div>
    )
}