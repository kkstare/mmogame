import { ApiCall } from "tsrpc";
import Global from "../Global";
import { ReqDownloadData, ResDownloadData } from "../shared/httpProtocols/PtlDownloadData";

export default async function (call: ApiCall<ReqDownloadData, ResDownloadData>) {

    let res = await Global.collection("player").findOne({
        "_id": call.conn.uid
    })

    console.log(res)

    if (!res) {
        call.succ({
            "msgTip": "无数据",
            "data": ""
        })
    } else {
        call.succ({
            "data": res.data ?? ""
        })
    }


}