import { ObjectId } from "mongodb";
import { ApiCall } from "tsrpc";
import Global from "../Global";
import { ReqCreatePlayer, ResCreatePlayer } from "../shared/httpProtocols/PtlCreatePlayer";
import { parseSSO } from "../SSOUtil";

export default async function (call: ApiCall<ReqCreatePlayer, ResCreatePlayer>) {
    // TODO
    Global.collection("player").insertOne({
        userName: call.req.userName,
        model: call.req.model,
        level: 1,
        gold: 1000,
        gotCdk: []
    }).then(async (v) => {
        await Global.collection("users").findOneAndUpdate({
            _id: new ObjectId(parseSSO(call.req.sso))
        }, {
            $addToSet: {
                "playerID": v.insertedId
            }
        })

        call.succ({
            msgTip: "创建角色成功",
            msg: "创建角色成功 id=" + v.insertedId
        })

    })
}