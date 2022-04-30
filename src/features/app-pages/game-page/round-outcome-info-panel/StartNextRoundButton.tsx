import { useAppDispatch } from 'app/hooks'
import { GameSlice } from 'app/slices'

export default function StartNextRoundButton() {
    const dispatch = useAppDispatch()
    
    return (
        <button
            type="button"
            className="btn btn-success"
            onClick={() => dispatch(GameSlice.humanPlayerStartNextRound())}
        >Start Next Round</button>
    )
}