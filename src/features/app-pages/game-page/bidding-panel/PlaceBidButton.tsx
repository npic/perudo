import { useAppDispatch } from 'app/hooks'
import { GameSlice } from 'app/slices'
import { Bid, DieFace } from 'core/types'
import { DieUtils } from 'core/utils'

export default function PlaceBidButton({ bid }: { bid: Bid }) {
    const dispatch = useAppDispatch()
    
    return (
        <button
            type="button"
            className={`btn btn-${bid.dieFace === DieFace.Joker ? 'warning' : 'primary'} w-100 h-100`}
            onClick={() => dispatch(GameSlice.humanPlayerPlaceBid(bid))}
        >
            {bid.quantity}&nbsp;x&nbsp;<i className={`bi ${DieUtils.toBootstrapIconClass(bid.dieFace)}`}></i>
        </button>
    )
}