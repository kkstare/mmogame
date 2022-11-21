import { Component, director, game, Label, Node, _decorator } from 'cc';
import { myEvent } from './GameEnum';
import HttpMgr from './HttpMgr';
const { ccclass, property } = _decorator;

@ccclass('PlayerNode')
export class PlayerNode extends Component {
    @property(Label)
    userName!: Label;

    @property(Label)
    userLevel!: Label;

    @property(Node)
    startBtn!: Node

    private data: any

    onLoad() {
        this.startBtn.on(Node.EventType.TOUCH_END, this.startGame, this)
    }

    initPlayerData(data) {
        if (data) {
            this.data = data
            this.userName.string = this.data.userName
            this.userLevel.string = this.data.level
        } else {
            this.userName.string = "???"
            this.userLevel.string = "???"
            this.startBtn.children[0].getComponent(Label)!.string = "新建角色"
        }

    }

    //新建角色 简单处理
    async startGame() {
        if (this.data) {
            let res = await HttpMgr.playerLogin(this.data._id)
            console.log(res)
            director.loadScene("game")
        } else {
            await HttpMgr.createPlayer()
            game.emit(myEvent.refreshPlayer)

        }
    }

}


