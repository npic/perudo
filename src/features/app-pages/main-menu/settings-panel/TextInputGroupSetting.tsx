import { PayloadAction } from '@reduxjs/toolkit'
import { useAppDispatch } from 'app/hooks'

interface TextInputGroupSettingProps {
    baseID: string,
    fields: {
        label: string,
        value: string,
        onChangeAction: (payload: string) => PayloadAction<any>,
    }[],
}

export default function TextInputGroupSetting({ baseID, fields }: TextInputGroupSettingProps) {
    const dispatch = useAppDispatch()

    return (
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-6 gy-3 gy-lg-0">
            {fields.map((field, i) =>
                <div className="col" key={`${baseID}Div${i}`}>
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
            )}
        </div>
    )
}