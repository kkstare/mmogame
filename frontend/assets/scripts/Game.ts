import { Camera, Component, EventTouch, geometry, Label, Node, Vec3, _decorator } from 'cc';
import GameData from './GameData';
import { PlayerLogic } from './PlayerLogic';
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

    @property(Node)
    touchNode!: Node

    @property(Camera)
    camera!: Camera
    @property(Node)
    player: Node

    testArrays = [
        this.test1,
        this.test2
    ]

    onLoad() {
        this.userName.string = GameData.userLoginInfo.playerInfo.userName
        this.level.string = "等级:" + GameData.userLoginInfo.playerInfo.level

        this.touchNode.on(Node.EventType.TOUCH_END, this.checkTouch, this)

        this.joinMap()

        for (let index = 0; index < this.testBtns.children.length; index++) {
            this.testBtns.children[index].on(Node.EventType.TOUCH_END, this.testArrays[index], this)
        }

    }

    checkTouch(event: EventTouch) {
        let screenPoint = event.getLocation()

        const outRay = new geometry.Ray();
        this.camera.screenPointToRay(screenPoint.x, screenPoint.y, outRay);

        let x = outRay.o.x + (0 - outRay.o.y) / outRay.d.y * outRay.d.x
        let z = outRay.o.z + (0 - outRay.o.y) / outRay.d.y * outRay.d.z

        this.player.getComponent(PlayerLogic).aimPos = new Vec3(x, 1.51, z)

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


