import { useAppDispatch } from '../../app/hooks'
import { humanPlayerStartNextRound } from './GameSlice'

export function StartNextRoundButton() {
    const dispatch = useAppDispatch()
    
    return (
        <div className="row my-3">
            <div className="col">
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => dispatch(humanPlayerStartNextRound())}
                >Start Next Round</button>
            </div>
        </div>
    )
}