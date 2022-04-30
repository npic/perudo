import { PayloadAction } from '@reduxjs/toolkit'
import { useAppDispatch } from 'app/hooks'

interface RadioButtonGroupSettingProps<OptionValueType> {
    baseID: string,
    label: string,
    options: {
        label: string,
        value: OptionValueType,
        disabled: boolean,
        checked: boolean,
    }[],
    onChangeAction: (payload: OptionValueType) => PayloadAction<any>,
}

export default function RadioButtonGroupSetting<OptionValueType>({ baseID, label, options, onChangeAction }: RadioButtonGroupSettingProps<OptionValueType>) {
    const dispatch = useAppDispatch()
    
    const radioButtons: JSX.Element[] = []
    options.forEach((option, i) => {
        radioButtons.push(
            <input
                type="radio"
                className="btn-check"
                name={`${baseID}Radio`}
                id={`${baseID}${i}`}
                key={`${baseID}Input${i}`}
                autoComplete="off"
                disabled={option.disabled}
                checked={option.checked}
                onChange={() => dispatch(onChangeAction(option.value))}
            ></input>
        )
        radioButtons.push(
            <label
                className="btn btn-outline-primary"
                htmlFor={`${baseID}${i}`}
                key={`${baseID}Label${i}`}
            >{option.label}</label>
        )
    })

    return (
        <div className="row row-cols-1 g-1">
            <div className="col">
                <label className="form-label">{label}</label>
            </div>
            <div className="col">
                <div className="btn-group" role="group">
                    {radioButtons}
                </div>
            </div>
        </div>
    )
}