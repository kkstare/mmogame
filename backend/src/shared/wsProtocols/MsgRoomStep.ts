//包括地图内的一些状态变更

//玩家自身的移动
export interface MsgPLayerMove {
    type: "move"
    uid: string
    position: [number, number, number]
}

export interface MsgPlayersMove {
    [uid: string]: MsgRoomStep
}

//玩家的状态
export interface MsgPLayerState {
    type: "playerState"
    uid: string
    userName: string
    model: string
}


//地图内物件的行为
export interface MsgItemState {
    type: "itemState"
}


export type MsgRoomStep = MsgPLayerMove | MsgPLayerState | MsgItemState | MsgPlayersMove
