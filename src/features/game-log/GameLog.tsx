import { useLayoutEffect, useRef } from "react";
import { useAppSelector } from "../../app/hooks";
import { formatEventAsJSX } from "../../app/log/Log";
import { selectLog } from "../game/gameSlice";

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
        <div className="border p-3 overflow-scroll" style={{maxHeight: '40vh'}}>
            {log.map((event) => formatEventAsJSX(event))}
            <div ref={endOfTheLogRef}></div>
        </div>
    )
}