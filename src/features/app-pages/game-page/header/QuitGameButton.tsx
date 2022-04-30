import { useAppDispatch } from 'app/hooks'
import { GameSlice } from 'app/slices'

export default function QuitGameButton() {
    const dispatch = useAppDispatch()
    
    return (
        <button type="button" className="btn btn-danger" onClick={() => dispatch(GameSlice.stopGame())}>Quit</button>
    )
}