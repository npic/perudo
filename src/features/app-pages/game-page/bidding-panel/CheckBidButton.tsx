import { useAppDispatch } from 'app/hooks'
import { GameSlice } from 'app/slices'
import { Bid } from 'core/types'
import { BidUtils } from 'core/utils'

export default function CheckBidButton({ currentBid }: { currentBid: Bid }) {
    const dispatch = useAppDispatch()

    return (
        <button
            type="button"
            className="btn btn-danger w-100 h-100"
            disabled={BidUtils.isNullBid(currentBid)}
            onClick={() => dispatch(GameSlice.checkBid())}
        >Check</button>
    )
}