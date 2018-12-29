import Message from './msg'
import { MessageType } from './msg-type'
import { Auction } from './../model/auction'
import { User } from '../model/user'

export default class SessionMessage extends Message {
    public type = MessageType.stc_sync_session
    public content: any

    constructor(client: any) {
        super(client)
    }

    public async write() {
        const users = await User.find()
        const auction = await Auction.findOne({
            active: true,
        }).populate({
            path: 'latestBid',
            populate: {
                path: 'user',
            },
        })

        this.content = {
            users,
            auction,
        }
    }
}
