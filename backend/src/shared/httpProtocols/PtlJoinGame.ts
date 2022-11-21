import { dbPlayer } from "../shareType/MongoData";
import { BaseConf, BaseRequest, BaseResponse } from "./base";

export interface ReqJoinGame extends BaseRequest {
    uid: string
}

export interface ResJoinGame extends BaseResponse {
    /** 改登录态用于处理具体账号信息 */
    playerSSO: string

    player: dbPlayer
}

export const conf: BaseConf = {
    needLogin: false

}