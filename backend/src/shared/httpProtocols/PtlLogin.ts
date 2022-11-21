import { BaseConf, BaseRequest, BaseResponse } from "./base";

export interface ReqLogin extends BaseRequest {
    account: string;
    password: string;
}

export interface ResLogin extends BaseResponse {
    /** 该登录态用于处理账号信息 */
    sso: string
}

export const conf: BaseConf = {
    needLogin: false
}