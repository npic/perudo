import { useAppSelector } from '../../app/hooks'
import {
    selectCurrentBid,
    selectIsHumanTurn,
    selectIsMaputoRound,
    selectIsRoundEnded,
    selectTotalDiceCount,
} from '../game/GameSlice'

import { range } from '../../core/util'
import * as BidUtils from '../../core/bid/BidUtils'

import { BidInfo } from './BidInfo'
import { PlaceBidButton } from './PlaceBidButton'
import { CheckBidButton } from './CheckBidButton'

export function BiddingPanel() {
    const totalDiceCount = useAppSelector(selectTotalDiceCount)
    const currentBid = useAppSelector(selectCurrentBid)
    const isMaputoRound = useAppSelector(selectIsMaputoRound)
    const isHumanTurn = useAppSelector(selectIsHumanTurn)
    const isRoundEnded = useAppSelector(selectIsRoundEnded)
    const buttonsVisible = isHumanTurn && !isRoundEnded
    const bids = BidUtils.nextBidsGenerator({
        startingBid: currentBid,
        maxQuantity: totalDiceCount,
        isMaputoRound: isMaputoRound
    })

    return (
        <div>
            <div className="row my-3">
                <div className="col">
                    <BidInfo bid={currentBid} roundEnded={isRoundEnded} />
                </div>
            </div>

            {buttonsVisible &&
                <div className="row my-3 align-items-center">
                    {
                        range(35).map((i) => {
                            const nextBid = bids.next().value
                            return (
                                <div className="col-3 col-md-1 my-3" key={`bidDiv${i}`}>
                                    {nextBid !== undefined && <PlaceBidButton bid={nextBid} />}
                                </div>
                            )
                        })
                    }
                    <div className="col-3 col-md-1 my-3">
                        <CheckBidButton currentBid={currentBid} />
                    </div>
                </div>
            }
        </div>
    )
}