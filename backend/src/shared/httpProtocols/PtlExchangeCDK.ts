import { BaseConf, BaseRequest, BaseResponse } from "./base";

export interface ReqExchangeCDK extends BaseRequest {
    cdk: string
}

export interface ResExchangeCDK extends BaseResponse {

}

export const conf: BaseConf = {
    needLogin: true
}