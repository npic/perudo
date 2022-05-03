import { useTranslation } from 'react-i18next'
import { useAppSelector } from 'app/hooks'
import { GameSlice } from 'app/slices'

import QuitGameButton from './QuitGameButton'

export default function GamePageHeader() {
    const currentPlayer = useAppSelector(GameSlice.selectCurrentPlayer)
    const isGameOver = useAppSelector(GameSlice.selectIsGameOver)
    const isRoomEmpty = useAppSelector(GameSlice.selectIsRoomEmpty)
    const isMaputoRound = useAppSelector(GameSlice.selectIsMaputoRound)
    const roundNumber = useAppSelector(GameSlice.selectRoundNumber)
    const { t } = useTranslation()

    let title = ''
    if (isGameOver) {
        if (isRoomEmpty) {
            title = t('game.titles.emptyRoom')
        } else {
            title = t('game.titles.gameOver', { winnerName: currentPlayer.name })
        }
    } else {
        title = t(isMaputoRound ? 'game.titles.roundMaputo' : 'game.titles.round', { roundNumber: roundNumber })
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