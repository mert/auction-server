import Message from './message/msg'

export default interface IApp {
    connect(client: any): void
    disconnect(client: any): void
    receive(msg: Message, fn: (param: any) => void): any
    send(msg: Message): any
    sendAll(msg: Message): any
}
