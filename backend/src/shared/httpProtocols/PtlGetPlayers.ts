import { ObjectId } from "mongodb";
import { BaseConf, BaseRequest, BaseResponse } from "./base";

export interface ReqGetPlayers extends BaseRequest {
    sso: string
}

export interface ResGetPlayers extends BaseResponse {
    players: {
        _id: ObjectId,
        userName: string,
        level: number,
        model: string
    }[]
}

export const conf: BaseConf = {
    needLogin: false
}