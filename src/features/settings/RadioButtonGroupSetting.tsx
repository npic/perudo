import { PayloadAction } from '@reduxjs/toolkit'
import { useAppDispatch } from '../../app/hooks'

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

export function RadioButtonGroupSetting<OptionValueType>({ baseID, label, options, onChangeAction }: RadioButtonGroupSettingProps<OptionValueType>) {
    const dispatch = useAppDispatch()
    
    let radioButtons: JSX.Element[] = []
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
        <div className="my-5">
            <div className="row">
                <div className="col">
                    <label className="form-label">{label}</label>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="btn-group" role="group">
                        {radioButtons}
                    </div>
                </div>
            </div>
        </div>
    )
}