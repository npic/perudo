import { useAppSelector } from 'app/hooks'
import { GameSlice } from 'app/slices'

import GamePageHeader from './header/GamePageHeader'
import GameLog from './game-log/GameLog'
import PlayerInfoPanel from './player-info-panel/PlayerInfoPanel'
import RoundOutcomeInfoPanel from './round-outcome-info-panel/RoundOutcomeInfoPanel'
import BiddingPanel from './bidding-panel/BiddingPanel'

export default function GamePage() {
    const isGameOver = useAppSelector(GameSlice.selectIsGameOver)
    const isRoundEnded = useAppSelector(GameSlice.selectIsRoundEnded)
    const isRoomEmpty = useAppSelector(GameSlice.selectIsRoomEmpty)
    const currentPlayer = useAppSelector(GameSlice.selectCurrentPlayer)
    const loser = useAppSelector(GameSlice.selectLoser)
    const totalPoints = useAppSelector(GameSlice.selectTotalPoints)
    
    return (
        <div className="container">
            <div className="row row-cols-1 my-3">
                <div className="col">
                    <GamePageHeader />
                </div>
            </div>

            {!isRoomEmpty &&
                <div className="row row-cols-1 my-3">
                    <div className="col">
                        <GameLog />
                    </div>
                </div>
            }

            {!isGameOver &&
                <>
                    <div className="row row-cols-1 my-3">
                        <div className="col">
                            <PlayerInfoPanel player={currentPlayer} isRoundEnded={isRoundEnded} />
                        </div>
                    </div>

                    <div className="row row-cols-1 my-3">
                        <div className="col">
                            <BiddingPanel />
                        </div>
                    </div>

                    {isRoundEnded &&
                        <div className="row row-cols-1 my-3">
                            <div className="col">
                                <RoundOutcomeInfoPanel loser={loser} totalPoints={totalPoints} />
                            </div>
                        </div>
                    }
                </>
            }
        </div>
    )
}