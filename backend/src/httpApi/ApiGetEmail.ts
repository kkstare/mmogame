import { ApiCall } from "tsrpc";
import Global from "../Global";
import { ReqGetEmail, ResGetEmail } from "../shared/httpProtocols/PtlGetEmail";

export default async function (call: ApiCall<ReqGetEmail, ResGetEmail>) {
    // TODO
    console.log(call.conn.uid)
    //由于需要用到playerid作为键查询 需要设置索引以提高速度
    let ResGetEmail = await Global.collection("email").find({
        "playerId": call.conn.uid,
        "isDelete": false || undefined
    }, {
        projection: {
            emialType: 1,
            isRead: 1,
            msg: 1,
            isReceived: 1,
            itemId: 1,
            itemNum: 1,
        }
    }).toArray()

    console.log(ResGetEmail)

    call.succ({
        "emiadlDatas": ResGetEmail
    })
}