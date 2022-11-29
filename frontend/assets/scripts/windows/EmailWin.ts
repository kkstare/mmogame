import { Component, Node, _decorator } from 'cc';
import { ResGetEmail } from '../../shared/httpProtocols/PtlGetEmail';
import HttpMgr from '../HttpMgr';
const { ccclass, property } = _decorator;

@ccclass('EmailWin')
export class EmailWin extends Component {
    @property(Node)
    closeBtn!: Node;

    data: ResGetEmail
    async onLoad() {
        this.closeBtn.on(Node.EventType.TOUCH_END, this.close, this)

        this.data = await HttpMgr.getEmails()
    }

    start() {

    }

    close() {
        this.node.destroy()
    }

    update(deltaTime: number) {

    }
}


