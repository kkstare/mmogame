import { ObjectId } from "mongodb";
import { ApiCall } from "tsrpc";
import Global from "../Global";
import { ReqGetPlayers, ResGetPlayers } from "../shared/httpProtocols/PtlGetPlayers";
import { parseSSO } from "../SSOUtil";

export default async function (call: ApiCall<ReqGetPlayers, ResGetPlayers>) {
    let userData = await Global.collection("users").findOne({
        _id: new ObjectId(parseSSO(call.req.sso))
    })
    console.log(userData)
    if (userData) {
        let allData = await Global.collection("player").find({
            _id: {
                $in: userData.playerID
            }
        }, {
            projection: {
                "gold": 0,
            }
        }).toArray()

        call.succ({
            "players": allData
        })
        console.log("allData", allData)
    }


}