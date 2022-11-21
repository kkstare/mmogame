// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


enum serverType {
    Local,
    Test,
    OnLine
}

export default class GameConfig {
    static gameType = serverType.Local

    private static _httpUrl = [
        'http://127.0.0.1:3000',                      // Local
    ]

    private static _wsUrl = [
        "ws://127.0.0.1:3001"
    ]

    public static get httpUrl() {
        return this._httpUrl[GameConfig.gameType]
    }
    public static get wsUrl() {
        return this._wsUrl[GameConfig.gameType]
    }
}
