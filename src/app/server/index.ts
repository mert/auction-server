import * as http from 'http'
import * as express from 'express'
import * as socketIo from 'socket.io'
import Message from '../message/msg'
import IApp from '../iapp'
import BidMessage from '../message/cts-bid'
import { MessageType } from '../message/msg-type'
import RestoreMessage from '../message/cts-restore'

export class Server {

    private httpServer: http.Server
    private express: express.Express
    private ioServer: SocketIO.Server
    private port: number
    private handlers: Map<MessageType, any>

    constructor(private app: IApp) {
        this.express = express()
        this.httpServer = http.createServer(this.express)
        this.port = 5050
        this.ioServer = socketIo(this.httpServer, {
            path: '/auction',
        })
        this.registerHandler()
        this.listen()
    }

    public get io(): SocketIO.Server {
        return this.ioServer
    }

    private registerHandler() {
        this.handlers = new Map<MessageType, Message>()
        this.handlers.set(MessageType.cts_bid, BidMessage)
        this.handlers.set(MessageType.cts_restore, RestoreMessage)
    }

    private listen() {
        this.httpServer.listen(this.port, () => {
            console.log('http server listen', this.port)
            this.ioServer.on('connect', this.connect)
        })
    }

    private connect = (socket: any) => {
        this.app.connect(socket.id)

        socket.use((packet: any, next: any) => {
            if (!packet || packet[0] !== 'message' || !packet[1].type) {
                return next(new Error('packet/message or type not valid'))
            }
            const Msg = this.handlers.get(Number(packet[1].type))
            packet[1] = new Msg(socket.id, packet[1].content, this.app)
            return next(null, packet)
        })

        socket.on('message', (msg: any, fn: (param: any) => void) => {
            this.app.receive(msg, fn)
        })

        socket.on('disconnect', () => {
            this.app.disconnect(socket.id)
        })
    }
}
