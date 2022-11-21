import { BaseConf, BaseRequest, BaseResponse } from "./base";

export interface ReqCreatePlayer extends BaseRequest {
    userName: string
    model: string
    sso: string
}

export interface ResCreatePlayer extends BaseResponse {

}

export const conf: BaseConf = {
    "needLogin": false
}