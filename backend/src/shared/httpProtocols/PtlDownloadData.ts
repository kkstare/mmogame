import { BaseConf, BaseRequest, BaseResponse } from "./base";

export interface ReqDownloadData extends BaseRequest {

}

export interface ResDownloadData extends BaseResponse {
    data: string
}

export const conf: BaseConf = {
    "needLogin": true
}