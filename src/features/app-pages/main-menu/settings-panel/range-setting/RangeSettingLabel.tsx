interface RangeSettingLabelProps {
    rangeValue: number
    explanation: string
    side: 'left' | 'right'
}

export default function RangeSettingLabel({ rangeValue, explanation, side }: RangeSettingLabelProps) {
    return (
        <div className={`row row-cols-1 row-cols-md-auto gx-1 ${side === 'left' ? 'justify-content-end text-end' : 'justify-content-start text-start'}`}>
            <div className={`col ${side === 'left' ? 'order-1 order-md-2' : 'order-2 order-md-1'}`}>{rangeValue}</div>
            <div className={`col ${side === 'left' ? 'order-1' : 'order-2'}`}>{explanation}</div>
        </div>
    )
}