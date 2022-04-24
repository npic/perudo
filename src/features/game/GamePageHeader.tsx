import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { stopGame } from '../../app/actions'
import {
    selectCurrentPlayer,
    selectIsGameOver,
    selectIsRoomEmpty,
    selectIsMaputoRound,
    selectRoundNumber,
} from './GameSlice'

export function GamePageHeader() {
    const currentPlayer = useAppSelector(selectCurrentPlayer)
    const isGameOver = useAppSelector(selectIsGameOver)
    const isRoomEmpty = useAppSelector(selectIsRoomEmpty)
    const isMaputoRound = useAppSelector(selectIsMaputoRound)
    const roundNumber = useAppSelector(selectRoundNumber)

    const dispatch = useAppDispatch()

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
        <div className="row my-5">
            <div className="col">
                <h1>{title}</h1>
            </div>
            <div className="col-auto">
                <button type="button" className="btn btn-danger" onClick={() => dispatch(stopGame())}>Quit</button>
            </div>
        </div>
    )
}