export interface BaseRequest {
    // /** 登录态 */
    // sso?: string;
    /** 具象化玩家的id */
    playerSSO?: string
}

export interface BaseResponse {
    //普通提示 开发用
    msg?: string

    //弹窗提示 可直接显示给用户
    msgTip?: string
}

export interface BaseConf {
    needLogin?: boolean
}

export interface BaseMessage {

}