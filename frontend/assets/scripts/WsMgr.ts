

import { TransportOptions } from "tsrpc-base-client";
import { WsClient } from "tsrpc-browser";
import { ApiReturn } from "tsrpc-proto";
import { serviceProto, ServiceType } from "../shared/wsProtocols/wsProto";
import GameConfig from "./GameConfig";
import GameData from "./GameData";


const MaxReconnectTime = 1000;

class WsMgr {
    private static _instance: WsMgr;
    public static get instance(): WsMgr {
        if (!WsMgr._instance) {
            WsMgr._instance = new WsMgr()
        }
        return WsMgr._instance;
    }
    public set instance(value: WsMgr) {
        WsMgr._instance = value;
    }

    private _ws: WsClient<ServiceType>
    public get ws() {
        console.log("ws")

        if (!this._ws) {
            this._ws = new WsClient(serviceProto, {
                "server": GameConfig.wsUrl
            })
        }

        let isDisconnect = false;
        this._ws.flows.postDisconnectFlow.push(v => {
            // Retry after 2 seconds
            console.error("断线了 尝试重新链接")
            return v
            isDisconnect = true;
            this.connect();
            setTimeout(() => {
                if (this._ws.isConnected) {
                    return;
                }
                // EventMng.dispatchEvent(EGameEvent.SERVER_DISCONNECT);
                this.connect();
            }, MaxReconnectTime);
            return v;
        });

        this._ws.flows.preCallApiFlow.push(v => {
            if (!v.req.playerSSO) {
                v.req.playerSSO = GameData.userLoginInfo.playerSsoToken
            }
            return v
        })
        this._ws.flows.postConnectFlow.push(async v => {
            if (isDisconnect) {
                // let data = await this.userLogin(PlayData.getData(EGameDataKey.Account, ''), PlayData.getData(EGameDataKey.PassWords, ''), PlayData.getData(EGameDataKey.SSOToken, ''));
                // EventMng.dispatchEvent(EGameEvent.SERVER_RECONNECT);
                // let data = await this.tokenLogin()
                // this.joinRoom()
                // console.error(data)
            }
            isDisconnect = false;
            return v;
        });

        return WsMgr.instance._ws;
    }

    public async callApi<T extends string & keyof ServiceType['api']>(apiName: T, req: ServiceType['api'][T]['req'], options?: TransportOptions): Promise<ApiReturn<ServiceType['api'][T]['res']>> {
        var res = await this.ws.callApi(apiName, req, options);
        if (!res.isSucc) {
            console.error(res.err.message)
        }
        return res;
    }


    async connect(): Promise<void> {
        if (!this.ws) {
            return;
        }
        let res = await this.ws.connect();
        if (!res.isSucc) {
            // Retry after 2 seconds
            console.error(res.errMsg)
            await new Promise(rs => { setTimeout(rs, MaxReconnectTime) });
            await this.connect();
        } else {
            console.log("ws连接成功")

            this.listenMsg()
        }
    }

    //游戏开始时不连ws，进入房间再连
    initServer() {
        this.ws.connect()
    }

    async joinMap(mapId: string) {
        let resJoinMap = await this.callApi("JoinMap", {
            "mapId": mapId
        })
        console.log(resJoinMap)
    }

    listenMsg() {
        this.ws.listenMsg("Chat", this.testChat)
    }


    async sendChat() {
        let resChat = await this.ws.sendMsg("Chat", {
            "type": "world",
            "content": "随机文本" + Math.random().toFixed(8)
        })
        console.log(resChat)
    }

    testChat(data) {
        console.log(data)
    }
}


export default WsMgr.instance