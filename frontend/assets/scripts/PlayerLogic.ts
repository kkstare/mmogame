import { Component, Node, tween, Tween, Vec3, _decorator } from 'cc';
import GameData from './GameData';
import WsMgr from './WsMgr';
const { ccclass, property } = _decorator;

export interface playerRoomState {
    uid: string,
    userName: string,

}

@ccclass('PlayerLogic')
export class PlayerLogic extends Component {
    private speed: number = 3
    private stepTime: number = 0.1
    private curTime: number = 0
    private v3_1: Vec3


    private _aimPos: Vec3 = new Vec3(0, 1.5, 0);
    public get aimPos(): Vec3 {
        return this._aimPos;
    }
    public set aimPos(value: Vec3) {
        this._aimPos = value;
        let dis = Vec3.distance(this.node.position, this._aimPos)
        let time = dis / this.speed
        this.moveToTarget(time)
    }

    private _playerRoomState: playerRoomState;
    public get playerRoomState(): playerRoomState {
        return this._playerRoomState;
    }
    public set playerRoomState(value: playerRoomState) {
        this._playerRoomState = value;
    }

    tween: Tween<Node>



    moveToTarget(time: number) {
        this.tween?.stop()
        this.tween = tween(this.node).to(time, {
            position: this.aimPos
        }).start()
    }

    start() {

    }

    //执行动作
    stepAction() {
        WsMgr.sendPosition([this.node.position.x, this.node.position.y, this.node.position.z])

    }

    update(dt: number) {
        if (this.playerRoomState.uid != GameData.userLoginInfo.playerInfo._id) {
            return
        }

        this.curTime += dt
        if (this.curTime > this.stepTime) {
            this.curTime -= this.stepTime
            this.stepAction()
        }
        // WsMgr.sendPosition([this.node.position.x, this.node.position.y, this.node.position.z])

    }
}


