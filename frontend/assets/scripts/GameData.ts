import { dbPlayer } from "../shared/shareType/MongoData"


export default class GameData {
    public static userLoginInfo: {
        account?: string,
        password?: string,
        /** 账号token */
        ssoToken?: string,
        /** 用户token */
        playerSsoToken?: string
        playerInfo?: dbPlayer
    } = {}

}