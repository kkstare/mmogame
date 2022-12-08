import { BaseConf, BaseRequest, BaseResponse } from "./base";

export interface ReqUploadData extends BaseRequest {
    data: string
}

export interface ResUploadData extends BaseResponse {

}

export const conf: BaseConf = {
    "needLogin": true
}