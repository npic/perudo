import { useAppSelector } from 'app/hooks'
import { GameSlice } from 'app/slices'
import { BidUtils } from 'core/utils'

import BidInfo from './BidInfo'
import PlaceBidButton from './PlaceBidButton'
import CheckBidButton from './CheckBidButton'

export default function BiddingPanel() {
    const totalDiceCount = useAppSelector(GameSlice.selectTotalDiceCount)
    const currentBid = useAppSelector(GameSlice.selectCurrentBid)
    const lastBidder = useAppSelector(GameSlice.selectPreviousPlayer)
    const isMaputoRound = useAppSelector(GameSlice.selectIsMaputoRound)
    const isHumanTurn = useAppSelector(GameSlice.selectIsHumanTurn)
    const isRoundEnded = useAppSelector(GameSlice.selectIsRoundEnded)
    const buttonsVisible = isHumanTurn && !isRoundEnded
    let buttons: JSX.Element[] = []
    if (buttonsVisible) {
        const availableBids = BidUtils.makeAvailableBids({
            startingBid: currentBid,
            numberOfBids: 35,
            maxBidQuantity: totalDiceCount,
            isMaputoRound: isMaputoRound,
        })
        buttons = availableBids.map((bid, i) =>
            <div className="col-3 col-md-2 col-xl-1" key={`bidDiv${i}`}>
                <PlaceBidButton bid={bid} key={`placeBid${i}`} />
            </div>
        )
        buttons.push(
            <div className="col-3 col-md-2 col-xl-1" key="checkDiv">
                <CheckBidButton currentBid={currentBid} />
            </div>
        )
    }
    
    // Can't use row-cols because Bootstrap doesn't have row-cols beyond 6, and @media queries take precedence and override col-12
    return (
        <div className="row g-3">
            <div className="col-12">
                <BidInfo bid={currentBid} bidder={lastBidder} roundEnded={isRoundEnded} />
            </div>

            {buttons}
        </div>
    )
}