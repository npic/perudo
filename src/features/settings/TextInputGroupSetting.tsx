import { PayloadAction } from '@reduxjs/toolkit'
import { useAppDispatch } from '../../app/hooks'

interface TextInputGroupSettingProps {
    baseID: string,
    fields: {
        label: string,
        value: string,
        onChangeAction: (payload: string) => PayloadAction<any>,
    }[],
}

export function TextInputGroupSetting({ baseID, fields }: TextInputGroupSettingProps) {
    const dispatch = useAppDispatch()

    const textInputs = fields.map((field, i) =>
        <div className="col-12 col-md-4 col-lg-2" key={`${baseID}Div${i}`}>
            <label
                className="form-label"
                htmlFor={`${baseID}${i}`}
                key={`${baseID}Label${i}`}
            >{field.label}</label>
            <input
                type="text"
                className="form-control"
                id={`${baseID}${i}`}
                key={`${baseID}Input${i}`}
                value={field.value}
                onChange={(e) => dispatch(field.onChangeAction(e.target.value))}
            ></input>
        </div>
    )

    return (
        <div className="row my-5 gy-4 gy-lg-0">
            {textInputs}
        </div>
    )
}