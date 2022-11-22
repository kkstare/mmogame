import { ServiceProto } from 'tsrpc-proto';
import { MsgChat } from './MsgChat';
import { MsgRoomStep } from './MsgRoomStep';
import { ReqJoinMap, ResJoinMap } from './PtlJoinMap';

export interface ServiceType {
    api: {
        "JoinMap": {
            req: ReqJoinMap,
            res: ResJoinMap
        }
    },
    msg: {
        "Chat": MsgChat,
        "RoomStep": MsgRoomStep
    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 3,
    "services": [
        {
            "id": 0,
            "name": "Chat",
            "type": "msg"
        },
        {
            "id": 2,
            "name": "RoomStep",
            "type": "msg"
        },
        {
            "id": 1,
            "name": "JoinMap",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        }
    ],
    "types": {
        "MsgChat/MsgChat": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "type",
                    "type": {
                        "type": "Union",
                        "members": [
                            {
                                "id": 0,
                                "type": {
                                    "type": "Literal",
                                    "literal": "world"
                                }
                            },
                            {
                                "id": 1,
                                "type": {
                                    "type": "Literal",
                                    "literal": "map"
                                }
                            },
                            {
                                "id": 2,
                                "type": {
                                    "type": "Literal",
                                    "literal": "private"
                                }
                            }
                        ]
                    }
                },
                {
                    "id": 1,
                    "name": "content",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "MsgRoomStep/MsgRoomStep": {
            "type": "Union",
            "members": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "MsgRoomStep/MsgPLayerMove"
                    }
                },
                {
                    "id": 1,
                    "type": {
                        "type": "Reference",
                        "target": "MsgRoomStep/MsgPLayerState"
                    }
                },
                {
                    "id": 2,
                    "type": {
                        "type": "Reference",
                        "target": "MsgRoomStep/MsgItemState"
                    }
                },
                {
                    "id": 3,
                    "type": {
                        "type": "Reference",
                        "target": "MsgRoomStep/MsgPlayersMove"
                    }
                }
            ]
        },
        "MsgRoomStep/MsgPLayerMove": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "type",
                    "type": {
                        "type": "Literal",
                        "literal": "move"
                    }
                },
                {
                    "id": 2,
                    "name": "uid",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "position",
                    "type": {
                        "type": "Tuple",
                        "elementTypes": [
                            {
                                "type": "Number"
                            },
                            {
                                "type": "Number"
                            },
                            {
                                "type": "Number"
                            }
                        ]
                    }
                }
            ]
        },
        "MsgRoomStep/MsgPLayerState": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "type",
                    "type": {
                        "type": "Literal",
                        "literal": "playerState"
                    }
                },
                {
                    "id": 3,
                    "name": "uid",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "userName",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "model",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "MsgRoomStep/MsgItemState": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "type",
                    "type": {
                        "type": "Literal",
                        "literal": "itemState"
                    }
                }
            ]
        },
        "MsgRoomStep/MsgPlayersMove": {
            "type": "Interface",
            "indexSignature": {
                "keyType": "String",
                "type": {
                    "type": "Reference",
                    "target": "MsgRoomStep/MsgRoomStep"
                }
            }
        },
        "PtlJoinMap/ReqJoinMap": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "mapId",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "base/BaseRequest": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "playerSSO",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                }
            ]
        },
        "PtlJoinMap/ResJoinMap": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ]
        },
        "base/BaseResponse": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "msg",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 1,
                    "name": "msgTip",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                }
            ]
        }
    }
};