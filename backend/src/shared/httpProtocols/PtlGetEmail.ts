import { dbEmail } from "../shareType/MongoData";
import { BaseConf, BaseRequest, BaseResponse } from "./base";

export interface ReqGetEmail extends BaseRequest {
}

export interface ResGetEmail extends BaseResponse {
    emiadlDatas: Pick<dbEmail, '_id' | 'emialType' | 'isRead' | 'msg' | 'isReceived' | 'itemId' | 'itemNum'>[],
}

export const conf: BaseConf = {
    needLogin: true
}