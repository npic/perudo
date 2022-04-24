import Bid from '../../core/bid/Bid'
import * as BidUtils from '../../core/bid/BidUtils'
import * as DieFaceUtils from '../../core/dice/face/DieFaceUtils'

export function BidInfo({ bid, roundEnded }: { bid: Bid, roundEnded: boolean }) {
    if (BidUtils.isNullBid(bid)) {
        return <h4>Place the first bid</h4>
    } else {
        return (
            <h4>
                {roundEnded ? 'Last' : 'Current'} bid:&nbsp;
                {bid.quantity}&nbsp;x&nbsp;<i className={`text-danger fs-4 ${DieFaceUtils.toBootstrapIconClass(bid.dieFace)}`}></i>
            </h4>
        )
    }
}