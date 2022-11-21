import { Component, Label, Node, _decorator } from 'cc';
import GameData from './GameData';
import WsMgr from './WsMgr';
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {
    @property(Label)
    userName!: Label;

    @property(Label)
    level!: Label;

    @property(Node)
    testBtns!: Node


    testArrays = [
        this.test1,
        this.test2
    ]

    onLoad() {
        this.userName.string = GameData.userLoginInfo.playerInfo.userName
        this.level.string = "等级:" + GameData.userLoginInfo.playerInfo.level

        this.joinMap()

        for (let index = 0; index < this.testBtns.children.length; index++) {
            this.testBtns.children[index].on(Node.EventType.TOUCH_END, this.testArrays[index], this)
        }

    }
    async joinMap() {
        await WsMgr.connect()
        WsMgr.joinMap("1")
    }

    test1() {
        WsMgr.joinMap("1")

    }
    test2() {
        WsMgr.joinMap("2")
    }

    test3() {
        WsMgr.joinMap("2")
    }

    test4() {
        WsMgr.joinMap("2")
    }
    start() {

    }

    update(deltaTime: number) {

    }
}


