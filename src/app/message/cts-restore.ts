import Message from './msg'
import { MessageType } from './msg-type'
import { Auction } from './../model/auction'
import SessionMessage from './stc-session'

export default class RestoreMessage extends Message {
    public type = MessageType.cts_restore
    public content: any

    public async read() {
        await Auction.updateMany({
            active: true,
        }, {
            active: false,
        })

        const auction = new Auction({
            active: true,
        })

        await auction.save()
        this.app.sendAll(new SessionMessage(this.client))
    }
}
