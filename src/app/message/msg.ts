import { MessageType } from './msg-type'
import IApp from '../iapp'

export default abstract class Message {
    public type: MessageType
    public client: any
    public content: any
    public app: IApp

    constructor(client: any, content?: any, app?: IApp) {
        this.client = client
        this.content = content
        this.app = app
    }

    // tslint:disable-next-line:no-empty
    public async read() {
    }

    // tslint:disable-next-line:no-empty
    public async write() {
    }
}
