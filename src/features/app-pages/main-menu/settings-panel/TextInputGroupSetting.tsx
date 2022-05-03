interface TextInputGroupSettingProps {
    baseID: string,
    fields: {
        label: string,
        value: string,
        onChange: (newValue: string) => any,
    }[],
}

export default function TextInputGroupSetting({ baseID, fields }: TextInputGroupSettingProps) {
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
                        onChange={(e) => field.onChange(e.target.value)}
                    ></input>
                </div>
            )}
        </div>
    )
}