import { ObjectId } from "mongodb";
import { ApiCall } from "tsrpc";
import Global from "../Global";
import { ReqJoinGame, ResJoinGame } from "../shared/httpProtocols/PtlJoinGame";
import { createSSO } from "../SSOUtil";

export default async function (call: ApiCall<ReqJoinGame, ResJoinGame>) {
    //进行账号二次验证
    //playerid
    let resPlayer = await Global.collection("player").findOne({
        "_id": new ObjectId(call.req.uid)
    })
    console.log(resPlayer)
    if (resPlayer) {
        call.succ({
            "playerSSO": createSSO(new ObjectId(call.req.uid)),
            "player": resPlayer
        })
    } else {
        call.error("用户信息不存在")
    }


}