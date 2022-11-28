import { ApiCall } from "tsrpc";
import Global from "../Global";
import { ReqExchangeCDK, ResExchangeCDK } from "../shared/httpProtocols/PtlExchangeCDK";

export default async function (call: ApiCall<ReqExchangeCDK, ResExchangeCDK>) {
    // TODO

    // //过期cdk
    // await Global.collection("cdk").insertOne({
    //     "itemId": [1, 2],
    //     "itemNum": [100, 1000],
    //     "startTime": 1669478400000,
    //     "endTime": 1669564800000,
    //     "key": "vip666"
    // })

    // //永久cdk
    // await Global.collection("cdk").insertOne({
    //     "itemId": [1, 2],
    //     "itemNum": [100, 1000],
    //     "startTime": 1577808000000,
    //     "endTime": 1893427200000,
    //     "key": "vip777"
    // })

    // //暂未开启cdk
    // await Global.collection("cdk").insertOne({
    //     "itemId": [1, 2],
    //     "itemNum": [100, 1000],
    //     "startTime": 1701014400000,
    //     "endTime": 1732636800000,
    //     "key": "vip888"
    // })

    let res = await Global.collection("player").findOne({
        _id: call.conn.uid
    }, {
        projection: {
            "gotCdk": 1
        }
    })

    console.log(res)
    if (!res) {
        call.error("账号数据异常")
        return
    }
    if (res.gotCdk.indexOf(call.req.cdk) > -1) {
        call.succ({
            "msgTip": "已领取该兑换码"
        })
        return
    }

    let resCdk = await Global.collection("cdk").findOne({
        "key": call.req.cdk
    })

    if (!resCdk) {
        call.succ({
            "msgTip": "无效兑换码"
        })
        return
    }

    let startDate = new Date(resCdk.startTime)
    let endDate = new Date(resCdk.endTime)

    if (Date.now() < resCdk.startTime) {
        let dateString = startDate.toLocaleDateString() + startDate.toLocaleTimeString()
        call.succ({
            "msgTip": "兑换将在" + dateString + "开启"
        })
        return
    }

    if (Date.now() > resCdk.endTime) {
        let dateString = endDate.toLocaleDateString() + endDate.toLocaleTimeString()
        call.succ({
            "msgTip": "该cdk已在" + dateString + "失效"
        })
        return
    }


    console.log(resCdk.startTime)

    console.log(resCdk)

    await Global.collection("player").findOneAndUpdate({
        _id: call.conn.uid
    }, {
        $addToSet: {
            "gotCdk": call.req.cdk
        }
    })

    Global.collection("email").insertOne({

        "playerId": call.conn.uid,
        "emialType": "item",
        "itemId": resCdk.itemId,
        "itemNum": resCdk.itemNum,
        "msg": "系统奖励 大吉大利",

    })


    call.succ({
        "msgTip": "兑换成功 建立通过邮件下发"
    })

    // Global.collection("cdk").findOne


}