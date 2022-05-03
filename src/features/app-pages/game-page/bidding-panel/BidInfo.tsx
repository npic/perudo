import { useTranslation } from 'react-i18next'
import { Bid, Player } from 'core/types'
import { BidUtils, DieUtils } from 'core/utils'

export default function BidInfo({ bid, bidder, roundEnded }: { bid: Bid, bidder: Player, roundEnded: boolean }) {
    const { t } = useTranslation()
    
    if (BidUtils.isNullBid(bid)) {
        return <h4>{t('game.bids.placeTheFirstBid')}</h4>
    } else {
        return (
            <h4>
                {t(roundEnded ? 'game.bids.finalBid' : 'game.bids.currentBid', { bidder: bidder.name })}:&nbsp;
                {bid.quantity}&nbsp;x&nbsp;<i className={`bi text-danger fs-4 ${DieUtils.toBootstrapIconClass(bid.dieFace)}`}></i>
            </h4>
        )
    }
}