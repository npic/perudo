import { useLayoutEffect, useRef } from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectLog } from '../game/GameSlice'

import * as GameEventUtils from '../../core/log/event/GameEventUtils'

export function GameLog() {    
    const log = useAppSelector(selectLog)

    const endOfTheLogRef = useRef<HTMLDivElement>(null)
    const scrollToBottom = () => {
        endOfTheLogRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
    useLayoutEffect(() => {
        scrollToBottom()
    })

    return (
        <div className="row my-5">
            <div className="col">
                <div className="border p-3 overflow-scroll" style={{ height: '40vh', maxHeight: '40vh' }}>
                    {log.map((event, i) => GameEventUtils.formatAsJSX(event, `event${i}`))}
                    <div ref={endOfTheLogRef}></div>
                </div>
            </div>
        </div>
    )
}