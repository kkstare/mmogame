import { dbPlayer } from "../shared/shareType/MongoData"


export default class GameData {
    public static userLoginInfo: {
        account?: string,
        password?: string,
        ssoToken?: string,
        playerSsoToken?: string
        playerInfo?: dbPlayer
    } = {}

}