import { ApiCall } from "tsrpc";
import Global from "../Global";
import { ReqUploadData, ResUploadData } from "../shared/httpProtocols/PtlUploadData";

export default async function (call: ApiCall<ReqUploadData, ResUploadData>) {
    // TODO
    let res = await Global.collection("player").updateOne({
        "_id": call.conn.uid
    }, {
        $set: {
            "data": call.req.data
        }
    })

    console.log(res)

    call.succ({})
}