import path from "path";
import { WsServer } from "tsrpc";
import RoomMgr from "./Logic/RoomMgr";
import { serviceProto as wsProto } from './shared/wsProtocols/wsProto';
import { useCheckAccess } from "./SSOUtil";

export const wsServer = new WsServer(wsProto, {
    port: 3001,
    // Remove this to use binary mode (remove from the client too)
    json: true,
    "logLevel": "error"
});

useCheckAccess(wsServer) // 验证登录态及权限



export async function initWsServer() {
    await wsServer.autoImplementApi(path.resolve(__dirname, 'wsApi'));

    await wsServer.start()
    // 断开连接后,将用户退出房间

    wsServer.flows.postDisconnectFlow.push(v => {
        console.log("断开连接")
        RoomMgr.ins.exitRoom(v.conn)
        return v
    })
}

