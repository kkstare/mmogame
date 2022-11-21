import { ApiCall } from "tsrpc";
import Global from "../Global";
import { ReqLogin, ResLogin } from "../shared/httpProtocols/PtlLogin";
import { createSSO } from "../SSOUtil";

export default async function (call: ApiCall<ReqLogin, ResLogin>) {

    let resLogin = await Global.collection('users').findOne({
        account: call.req.account,
        password: call.req.password
    });
    console.log(resLogin)

    //登陆未成功
    if (!resLogin) {
        //登陆未成功 尝试注册新账号
        let resFindUser = await Global.collection('users').findOne({
            account: call.req.account,
        });

        //账号未被注册
        if (!resFindUser) {
            let resRegister = await Global.collection('users').insertOne({
                account: call.req.account,
                password: call.req.password,
                playerID: []
            })
            console.log(resRegister)
            call.succ({
                sso: createSSO(resRegister.insertedId),
                msg: "已注册新账号并重新登陆"
            })
        } else {
            call.error("账号或密码错误")
        }
    } else {
        call.succ({
            "msg": "登陆成功",
            "sso": createSSO(resLogin._id)
        })
    }
}