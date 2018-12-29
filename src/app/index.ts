import { Server } from './server/'
import IApp from './iapp'
import Message from './message/msg'
import * as mongoose from 'mongoose'
import { UserMigration } from '../migration/user'
import { MessageType } from './message/msg-type'
import SessionMessage from './message/stc-session'
(mongoose as any).Promise = global.Promise

export default class App implements IApp {

    private server: Server

    public static bootstrap() {
        return new App()
    }

    private constructor() {
        mongoose.connect('mongodb://mert:mert123@ds145434.mlab.com:45434/auction', { useNewUrlParser: true })
        UserMigration.migrate()
        this.init()
    }

    private async init() {
        this.server = new Server(this)
    }

    public connect(client: any) {
        console.log('client connect', client)
        this.send(new SessionMessage(client))
    }

    public disconnect(client: any) {
        console.log('disconnect client', client)
    }

    public async receive(msg: Message) {
        console.log('receive message', MessageType[msg.type])
        msg.read()
    }

    public async send(msg: Message) {
        await msg.write()
        this.server.io
            .to(msg.client)
            .emit('message', {
                content: msg.content,
                type: msg.type,
            })
    }

    public async sendAll(msg: Message) {
        await msg.write()
        this.server.io.sockets.emit('message', {
            content: msg.content,
            type: msg.type,
        })
    }
}
