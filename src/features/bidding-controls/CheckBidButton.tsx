import { useAppDispatch } from '../../app/hooks'
import { checkBid } from '../../app/actions'

import Bid from '../../core/bid/Bid'
import * as BidUtils from '../../core/bid/BidUtils'

export function CheckBidButton({ currentBid }: { currentBid: Bid }) {
    const dispatch = useAppDispatch()

    return (
        <button
            type="button"
            className="btn btn-danger"
            disabled={BidUtils.isNullBid(currentBid)}
            onClick={() => dispatch(checkBid())}
        >Check</button>
    )
}