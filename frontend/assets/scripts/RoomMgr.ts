import { Component, instantiate, Node, Vec3, _decorator } from 'cc';
import { MsgPlayersMove, MsgRoomStep } from '../shared/wsProtocols/MsgRoomStep';
import GameData from './GameData';
import { PlayerLogic } from './PlayerLogic';
import WsMgr from './WsMgr';
const { ccclass, property } = _decorator;

@ccclass('RoomMgr')
export class RoomMgr extends Component {
    @property(Node)
    playerNode: Node

    @property(Node)
    playerParent!: Node

    players: Record<string, PlayerLogic> = {}

    start() {

    }
    onLoad() {
        this.initPlayer()
        WsMgr.ws.listenMsg("RoomStep", this.recAllData.bind(this))
    }

    //TODO 初始化自己的  简单处理 等流程跑通需要修改顺序
    initPlayer() {
        this.players[GameData.userLoginInfo.playerInfo._id] = this.playerNode.getComponent(PlayerLogic)
        this.players[GameData.userLoginInfo.playerInfo._id].playerRoomState = {
            "uid": GameData.userLoginInfo.playerInfo._id,
            "userName": "玩家" + GameData.userLoginInfo.playerInfo._id
        }
    }


    //做了消息合并 在此处分发
    recAllData(data: MsgRoomStep) {
        let data1 = data as MsgPlayersMove
        console.log(data1)
        for (const uid in data1) {
            if (Object.prototype.hasOwnProperty.call(data1, uid)) {
                const data = data1[uid];
                this.onListenData(data)
            }
        }

        for (const key in this.players) {
            if (Object.prototype.hasOwnProperty.call(this.players, key)) {
                if (!data1[key]) {
                    this.removePlayer(key)
                }
            }
        }
    }

    onListenData(data: MsgRoomStep) {
        // console.log(data)
        // return
        if (data.type == "move") {
            //自己的不走网络同步
            if (data.uid == GameData.userLoginInfo.playerInfo._id) {
                return
            }
            if (!this.players[data.uid]) {
                //不在房间 新建
                console.log("新建玩家", data.uid)
                let playerNode = instantiate(this.playerNode)
                playerNode.parent = this.playerParent
                playerNode.name = data.uid
                this.players[data.uid] = playerNode.getComponent(PlayerLogic)
                this.players[data.uid].playerRoomState = {
                    "uid": data.uid,
                    "userName": "玩家" + data.uid
                }

                //新建的玩家直接设置坐标
                this.players[data.uid].node.position = new Vec3(...data.position)
            } else {
                this.players[data.uid].aimPos = new Vec3(...data.position)
                // this.players[data.uid].node.position = new Vec3(...data.position)
            }

        }
    }

    removePlayer(uid: string) {
        if (uid == GameData.userLoginInfo.playerInfo._id) {
            return
        }
        this.players[uid].node.destroy()
        this.players[uid] = null
    }

    //新加入一个地图时触发
    //包括大量实体初始化
    inNewRoom() {

    }

    //监听房间内的状态
    beginListenRoomState() {

    }

}


