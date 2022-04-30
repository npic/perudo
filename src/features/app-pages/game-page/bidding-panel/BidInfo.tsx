import { Bid, Player } from 'core/types'
import { BidUtils, DieUtils } from 'core/utils'

export default function BidInfo({ bid, bidder, roundEnded }: { bid: Bid, bidder: Player, roundEnded: boolean }) {
    if (BidUtils.isNullBid(bid)) {
        return <h4>Place the first bid</h4>
    } else {
        return (
            <h4>
                {roundEnded ? `Final bid by ${bidder.name}` : 'Current bid'}:&nbsp;
                {bid.quantity}&nbsp;x&nbsp;<i className={`bi text-danger fs-4 ${DieUtils.toBootstrapIconClass(bid.dieFace)}`}></i>
            </h4>
        )
    }
}