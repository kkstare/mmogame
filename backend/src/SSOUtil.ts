/**
 * 创建登录态
 */

import { Crypto } from "k8w-crypto"
import moment from "moment"
import { ObjectId } from "mongodb"
import { BaseServer } from "tsrpc"
import GameConfig from "./GameConfig"
import Global from "./Global"

declare module 'tsrpc' {
    export interface ApiCall {
        conn: BaseConnection
        // 可拓展增加
        userId: string
    }

    export interface BaseConnection {
        uid: ObjectId //玩家objectId
        roomId: string //玩家当前的房间id
    }
}

/**
 * http登录登录态校验
 */
export function useCheckAccess(Server: BaseServer<any>) {
    Server.flows.preApiCallFlow.push(async v => {
        if (v.service.conf!.needLogin) {
            const uid = parseSSO(v.req.playerSSO)
            if (!uid) {
                v.error('您还未登录~', { code: 'need_login' })
                return
            }

            console.log(uid)

            let currentUser = await Global.collection("player").findOne({
                _id: new ObjectId(uid)
            })

            if (!currentUser) {
                v.error('您还未登录~', { code: 'need_login' })
                return
            }
            v.conn.uid = new ObjectId(uid)
        }
        return v
    })
}

export function createSSO(uid: ObjectId) {
    // sso = salt + uid + expiredTime

    // SSO 过期天数
    const expiredTime = moment().add(GameConfig.sso.expiredDays, 'days').valueOf()

    const ssoStr = JSON.stringify({ uid: uid.toHexString(), expiredTime })

    const sign = Crypto.md5(ssoStr + GameConfig.sso.salt)

    return Crypto.base64Encode(`${sign}|${ssoStr}`)
}


/**
 * 解析登录态
 */
export function parseSSO(SSO: string) {

    if (!SSO) {
        return undefined
    }

    // 解
    const base64Str = Crypto.base64Decode(SSO)

    // 拆分
    const arr = base64Str.split('|')
    if (arr.length !== 2 || !arr[0].length || !arr[1].length) {
        return undefined
    }

    // arr[0] => sign
    const sign = arr[0]

    // arr[1] => ssoStr
    const ssoStr: { uid: string, expiredTime: number } = JSON.parse(arr[1])

    // 解密后 再次对比校验
    if (sign !== Crypto.md5(JSON.stringify(ssoStr) + GameConfig.sso.salt)) {
        return undefined
    }

    // SSO 过期校验
    if (moment().valueOf() > ssoStr.expiredTime) {
        return undefined
    }

    // 最终返回 uid
    return ssoStr.uid

}