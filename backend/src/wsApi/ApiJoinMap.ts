import { ApiCall } from "tsrpc";
import RoomMgr from "../Logic/RoomMgr";
import { ReqJoinMap, ResJoinMap } from "../shared/wsProtocols/PtlJoinMap";

export default async function (call: ApiCall<ReqJoinMap, ResJoinMap>) {
    // TODO
    // call.error('API Not Implemented');
    RoomMgr.joinRoom(call.conn, call.req.mapId)

}