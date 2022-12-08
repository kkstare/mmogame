import { _decorator } from 'cc';
import { ApiReturn, HttpClient, HttpClientTransportOptions } from 'tsrpc-browser';
import { serviceProto, ServiceType } from '../shared/httpProtocols/httpProto';
import { EncryptUtil } from './EncryptUtil';
import GameConfig from './GameConfig';
import GameData from './GameData';
const { ccclass, property } = _decorator;

class HttpMgr {
    private _httpCliet: HttpClient<ServiceType> = null;

    constructor() {

    }

    get httpCliet() {
        if (!this._httpCliet) {
            this._httpCliet = new HttpClient(serviceProto, {
                server: GameConfig.httpUrl,
                logger: console,
                // json: true,
            });
            //  协议加密
            this._httpCliet.flows.preSendDataFlow.push(v => {
                if (v.data instanceof Uint8Array) {
                    v.data = EncryptUtil.encrypt(v.data)
                }
                return v
            })
            //  协议解密
            this._httpCliet.flows.preRecvDataFlow.push(v => {
                if (v.data instanceof Uint8Array) {
                    v.data = EncryptUtil.decrypt(v.data)
                }
                return v
            })

            // 添加登录态到请求中
            this._httpCliet.flows.preCallApiFlow.push(v => {
                if (!v.req.playerSSO) {
                    v.req.playerSSO = GameData.userLoginInfo.playerSsoToken
                }
                return v
            })
        }
        return this._httpCliet;
    }

    public async callApi<T extends string & keyof ServiceType['api']>(apiName: T, req: ServiceType['api'][T]['req'], options?: HttpClientTransportOptions): Promise<ApiReturn<ServiceType['api'][T]['res']>> {
        var res = await this.httpCliet.callApi(apiName, req, options);
        if (!res.isSucc) {
            console.error(res.err.message)
        }
        return res;
    }


    async userLogin(account: string, password: string) {
        let ret = await this.callApi("Login", {
            "account": account,
            "password": password,
        });

        console.log(ret)
        if (!ret.isSucc) {
            console.error(ret.err)
            return false
        } else {
            GameData.userLoginInfo.account = account
            GameData.userLoginInfo.password = password
            GameData.userLoginInfo.ssoToken = ret.res.sso
            return true
        }
    }

    async createPlayer() {
        await this.callApi("CreatePlayer", {
            "userName": "随机昵称" + Math.random().toFixed(4),
            "model": "11",
            "sso": GameData.userLoginInfo.ssoToken
        })
    }

    async getPlayers() {
        return await this.callApi("GetPlayers", {
            "sso": GameData.userLoginInfo.ssoToken
        })
    }

    //选择某个角色进入
    async playerLogin(uid: string) {
        let res = await this.callApi("JoinGame", {
            "uid": uid
        })
        GameData.userLoginInfo.playerInfo = res.res.player
        GameData.userLoginInfo.playerSsoToken = res.res.playerSSO
        return res
    }

    async exchangeCdk(cdk: string) {
        let res = await this.callApi("ExchangeCDK", {
            "cdk": cdk
        })
        console.log(res)
    }

    async getEmails() {
        let res = await this.callApi("GetEmail", {
        })
        console.log(res)
        return res.res
    }

    async uploadData(data: string) {
        let res = await this.callApi("UploadData", {
            "data": data
        })

        console.log(res)
    }

    async downloadData() {
        let res = await this.callApi("DownloadData", {
        })

        console.log(res)
    }
}

export default new HttpMgr();
