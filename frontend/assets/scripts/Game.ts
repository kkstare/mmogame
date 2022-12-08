import { Camera, Component, EditBox, EventTouch, geometry, instantiate, Label, Node, Vec3, _decorator } from 'cc';
import GameData from './GameData';
import HttpMgr from './HttpMgr';
import { PlayerLogic } from './PlayerLogic';
import WinMgr, { winName } from './WinMgr';
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
    @property(Node)
    winParent: Node
    testArrays = [
        this.test1,
        this.test2,
        this.test3,
        this.test4,
        this.test5,
        this.test6,
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
        let cdk = this.testBtns.children[2].children[0].getComponent(EditBox).string
        HttpMgr.exchangeCdk(cdk)
    }

    async test4() {
        let Prefab = await WinMgr.loadPrefab(winName.email)
        let node = instantiate(Prefab)
        node.parent = this.winParent
    }

    test5() {
        let data = this.testBtns.children[4].children[0].getComponent(EditBox).string
        HttpMgr.uploadData(data)
    }

    test6() {
        HttpMgr.downloadData()
    }


    start() {

    }

    update(deltaTime: number) {

    }
}


