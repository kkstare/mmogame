import { BaseConf, BaseRequest, BaseResponse } from "./base";

export interface ReqJoinMap extends BaseRequest {
    mapId: string
}

export interface ResJoinMap extends BaseResponse {

}

export const conf: BaseConf = {
    needLogin: true
}