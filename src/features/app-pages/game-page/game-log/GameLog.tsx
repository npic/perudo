import { useLayoutEffect, useRef } from 'react'
import { useAppSelector } from 'app/hooks'
import { GameSlice } from 'app/slices'
import { GameEventUtils } from 'core/utils'

export default function GameLog() {    
    const log = useAppSelector(GameSlice.selectLog)

    const endOfTheLogRef = useRef<HTMLDivElement>(null)
    const scrollToBottom = () => {
        endOfTheLogRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
    useLayoutEffect(() => {
        scrollToBottom()
    })

    return (
        <div className="row g-3">
            <div className="col">
                <div className="border-top border-bottom border-2 border-secondary p-3 overflow-scroll" style={{ height: '40vh', maxHeight: '40vh' }}>
                    {log.map((event, i) => GameEventUtils.formatAsJSX(event, `event${i}`))}
                    <div ref={endOfTheLogRef}></div>
                </div>
            </div>
        </div>
    )
}