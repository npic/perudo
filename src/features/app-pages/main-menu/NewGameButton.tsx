import { useAppSelector, useAppDispatch } from 'app/hooks'
import { GameSlice, SettingsSlice } from 'app/slices'

export default function NewGameButton() {
    const allSettings = useAppSelector(SettingsSlice.selectAllSettings)
    const dispatch = useAppDispatch()
    
    return (
        <button
            type="button"
            className='btn btn-lg btn-primary'
            onClick={() => dispatch(GameSlice.humanPlayerStartGame(allSettings))}
        >New Game</button>
    )
}