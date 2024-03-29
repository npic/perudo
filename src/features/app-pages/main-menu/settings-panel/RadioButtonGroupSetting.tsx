import React from 'react'

interface RadioButtonGroupSettingProps<OptionValueType> {
    baseID: string,
    label: string,
    options: {
        label: string,
        value: OptionValueType,
        disabled: boolean,
        checked: boolean,
    }[],
    onChange: (newValue: OptionValueType) => any,
}

export default function RadioButtonGroupSetting<OptionValueType>({ baseID, label, options, onChange }: RadioButtonGroupSettingProps<OptionValueType>) {
    return (
        <div className="row row-cols-1 g-1">
            <div className="col">
                <label className="form-label">{label}</label>
            </div>
            <div className="col">
                <div className="btn-group" role="group">
                    {options.map((option, i) =>
                        <React.Fragment key={`${baseID}${i}`}>
                            <input
                                type="radio"
                                className="btn-check"
                                name={`${baseID}Radio`}
                                id={`${baseID}${i}`}
                                key={`${baseID}Input${i}`}
                                autoComplete="off"
                                disabled={option.disabled}
                                checked={option.checked}
                                onChange={() => onChange(option.value)}
                            ></input>
                            <label
                                className="btn btn-outline-primary"
                                htmlFor={`${baseID}${i}`}
                                key={`${baseID}Label${i}`}
                            >{option.label}</label>
                        </React.Fragment>
                    )}
                </div>
            </div>
        </div>
    )
}