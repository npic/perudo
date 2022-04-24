import { useAppSelector } from '../../app/hooks'
import {
    selectIsGameOver,
    selectIsRoundEnded,
    selectIsRoomEmpty,
    selectCurrentPlayer,
    selectLoser,
    selectTotalPoints,
} from './GameSlice'

import { GamePageHeader } from './GamePageHeader'
import { GameLog } from '../game-log/GameLog'
import { PlayerInfo } from './PlayerInfo'
import { RoundOutcomeInfo } from './RoundOutcomeInfo'
import { StartNextRoundButton } from './StartNextRoundButton'
import { BiddingPanel } from '../bidding-controls/BiddingPanel'

export function GamePage() {
    const isGameOver = useAppSelector(selectIsGameOver)
    const isRoundEnded = useAppSelector(selectIsRoundEnded)
    const isRoomEmpty = useAppSelector(selectIsRoomEmpty)
    const currentPlayer = useAppSelector(selectCurrentPlayer)
    const loser = useAppSelector(selectLoser)
    const totalPoints = useAppSelector(selectTotalPoints)
    
    return (
        <div>
            <GamePageHeader />
            {!isRoomEmpty && <GameLog />}
            {!isGameOver &&
                <div>
                    <PlayerInfo player={currentPlayer} />
                    <BiddingPanel />
                    {isRoundEnded &&
                        <div>
                            <RoundOutcomeInfo loser={loser} totalPoints={totalPoints} />
                            <StartNextRoundButton />
                        </div>
                    }
                </div>
            }
        </div>
    )
}