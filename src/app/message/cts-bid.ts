import * as moment from 'moment'
import Message from './msg'
import { MessageType } from './msg-type'
import { IBid, Bid } from '../model/bid'
import { Auction } from '../model/auction'
import SessionMessage from './stc-session'

export default class BidMessage extends Message {
    public type = MessageType.cts_bid
    public content: IBid

    public async read() {

        if (!this.content.user!._id
            || !this.content.auction!._id
            || !this.content.amount) {
                throw new Error('missing parameter')
        }

        const auction = await Auction.findOne({
            _id: this.content.auction!._id,
            active: true,
        }).populate({
            path: 'latestBid',
        })

        if (!auction) {
            throw new Error('active auction not found')
        }

        if (moment(auction.deadline).isBefore(moment())) {
            throw new Error('deadline error')
        }

        if (auction.latestBid && this.content.amount <= auction.latestBid.amount) {
            throw new Error('amount error')
        }

        const bid = await Bid.create({
            user: this.content.user!._id,
            auction: auction._id,
            amount: this.content.amount,
        })

        auction.latestBid = bid._id
        await auction.save()

        // await Auction.findByIdAndUpdate(auction._id, {
        //     latestBid: bid._id,
        // })

        console.log(bid)
        console.log(auction)

        this.app.sendAll(new SessionMessage(this.client))
    }
}
