import { BaseConnection, MsgCall } from "tsrpc";
import { wsServer } from "..";
import { MsgPLayerMove, MsgRoomStep } from "../shared/wsProtocols/MsgRoomStep";
import { ServiceType } from "../shared/wsProtocols/wsProto";

class RoomMgr {
    private static _ins: RoomMgr;
    public static get ins(): RoomMgr {
        if (!RoomMgr._ins) {
            RoomMgr._ins = new RoomMgr();
        }
        return RoomMgr._ins;
    }

    public static logTime: number = 0

    //存储每个房间内的玩家
    rooms: Record<string, BaseConnection[]> = {}

    roomMsg: Record<string, Record<string, MsgPLayerMove>> = {}

    constructor() {
        wsServer.listenMsg("RoomStep", (call: MsgCall) => {
            this.listenRoomStep(call.conn, call.msg)
        })
        setInterval(this.broadRoomState.bind(this), 1000)
    }


    joinRoom(conn: BaseConnection, roomId: string) {
        console.log("roomid", conn.roomId)
        if (!this.rooms[roomId]) {
            this.rooms[roomId] = []
        }
        //加入房间前先退出当前房间
        this.exitRoom(conn)

        conn.roomId = roomId
        this.rooms[roomId].push(conn)

        console.log(this.rooms)
    }

    broadRoomState() {

        console.log(this.roomMsg)
        console.log("userStates", RoomMgr.logTime++)
        // console.log(this.roomMsg)


        for (const roomId in this.roomMsg) {
            if (Object.prototype.hasOwnProperty.call(this.roomMsg, roomId)) {
                const roomStates = this.roomMsg[roomId];
                this.rooms[roomId].forEach((conn: BaseConnection<ServiceType>) => {
                    conn.sendMsg("RoomStep", roomStates)
                })
            }
        }

        //广播完消息清空
        for (const roomId in this.roomMsg) {
            if (Object.prototype.hasOwnProperty.call(this.roomMsg, roomId)) {
                this.roomMsg[roomId] = {}
            }
        }
    }

    //玩家退出当前所在的房间
    //这个设定似乎不太对劲，玩家退出房间之后去哪了呢
    //当玩家存在一个自己的空间时，确实可以使用改操作，相当于进入了一个不会收到其他人数据的状态
    //不存在房间意味着无法收到世界消息
    exitRoom(conn: BaseConnection) {
        if (!conn.roomId) {
            return
        }
        let index = this.rooms[conn.roomId].findIndex((v) => v.uid == conn.uid)
        this.rooms[conn.roomId].splice(index, 1)
    }

    listenRoomStep(conn: BaseConnection<ServiceType>, data: MsgRoomStep) {
        // this.broadcastMap()
        // this.broadcastMap(conn, "RoomStep", data)
        if (!this.roomMsg[conn.roomId]) {
            this.roomMsg[conn.roomId] = {}
        }
        if (data.type == "move") {
            this.roomMsg[conn.roomId][data.uid] = data
        }
        // this.roomMsg[conn.roomId].push(data)
    }

    //整个世界发送消息
    broadcastAll<T extends keyof ServiceType['msg']>(conn: BaseConnection, msgName: T, msg: ServiceType['msg'][T], connFilter?: (conn: BaseConnection, index: number) => boolean) {

    }

    //向当前地图其他人广播消息
    broadcastMap<T extends keyof ServiceType['msg']>(conn: BaseConnection, msgName: T, msg: ServiceType['msg'][T], connFilter?: (conn: BaseConnection, index: number) => boolean) {
        this.rooms[conn.roomId].forEach((conn: BaseConnection<ServiceType>) => {
            conn.sendMsg(msgName, msg)
        })
    }


}

export default RoomMgr.ins