import { useAppDispatch } from '../../app/hooks'
import { humanPlayerPlaceBid } from '../game/GameSlice'

import Bid from '../../core/bid/Bid'
import DieFace from '../../core/dice/face/DieFace'
import * as DieFaceUtils from '../../core/dice/face/DieFaceUtils'

export function PlaceBidButton({ bid }: { bid: Bid }) {
    const dispatch = useAppDispatch()
    
    return (
        <button
            type="button"
            className={`btn btn-${bid.dieFace === DieFace.Joker ? 'warning' : 'primary'}`}
            onClick={() => dispatch(humanPlayerPlaceBid(bid))}
        >
            {bid.quantity}&nbsp;x&nbsp;<i className={DieFaceUtils.toBootstrapIconClass(bid.dieFace)}></i>
        </button>
    )
}