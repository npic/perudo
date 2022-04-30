import { useAppSelector } from 'app/hooks'
import { GameSlice } from 'app/slices'

import QuitGameButton from './QuitGameButton'

export default function GamePageHeader() {
    const currentPlayer = useAppSelector(GameSlice.selectCurrentPlayer)
    const isGameOver = useAppSelector(GameSlice.selectIsGameOver)
    const isRoomEmpty = useAppSelector(GameSlice.selectIsRoomEmpty)
    const isMaputoRound = useAppSelector(GameSlice.selectIsMaputoRound)
    const roundNumber = useAppSelector(GameSlice.selectRoundNumber)

    let title = ''
    if (isGameOver) {
        if (isRoomEmpty) {
            title = 'The room is empty'
        } else {
            title = `${currentPlayer.name} has won the game!`
        }
    } else {
        title = `Round ${roundNumber}${isMaputoRound ? ' (Maputo)' : ''}`
    }
    
    return (
        <div className="row row-cols-auto my-1 gx-3 justify-content-between">
            <div className="col">
                <h1>{title}</h1>
            </div>
            <div className="col">
                <QuitGameButton />
            </div>
        </div>
    )
}