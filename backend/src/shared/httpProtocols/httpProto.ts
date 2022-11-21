import { ServiceProto } from 'tsrpc-proto';
import { ReqCreatePlayer, ResCreatePlayer } from './PtlCreatePlayer';
import { ReqGetPlayers, ResGetPlayers } from './PtlGetPlayers';
import { ReqJoinGame, ResJoinGame } from './PtlJoinGame';
import { ReqLogin, ResLogin } from './PtlLogin';

export interface ServiceType {
    api: {
        "CreatePlayer": {
            req: ReqCreatePlayer,
            res: ResCreatePlayer
        },
        "GetPlayers": {
            req: ReqGetPlayers,
            res: ResGetPlayers
        },
        "JoinGame": {
            req: ReqJoinGame,
            res: ResJoinGame
        },
        "Login": {
            req: ReqLogin,
            res: ResLogin
        }
    },
    msg: {

    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "services": [
        {
            "id": 0,
            "name": "CreatePlayer",
            "type": "api",
            "conf": {
                "needLogin": false
            }
        },
        {
            "id": 1,
            "name": "GetPlayers",
            "type": "api",
            "conf": {
                "needLogin": false
            }
        },
        {
            "id": 2,
            "name": "JoinGame",
            "type": "api",
            "conf": {
                "needLogin": false
            }
        },
        {
            "id": 3,
            "name": "Login",
            "type": "api",
            "conf": {
                "needLogin": false
            }
        }
    ],
    "types": {
        "PtlCreatePlayer/ReqCreatePlayer": {
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
                    "name": "userName",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "model",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "sso",
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
        "PtlCreatePlayer/ResCreatePlayer": {
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
        },
        "PtlGetPlayers/ReqGetPlayers": {
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
                    "name": "sso",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlGetPlayers/ResGetPlayers": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "players",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Interface",
                            "properties": [
                                {
                                    "id": 0,
                                    "name": "_id",
                                    "type": {
                                        "type": "Reference",
                                        "target": "?mongodb/ObjectId"
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
                                    "name": "level",
                                    "type": {
                                        "type": "Number"
                                    }
                                },
                                {
                                    "id": 3,
                                    "name": "model",
                                    "type": {
                                        "type": "String"
                                    }
                                }
                            ]
                        }
                    }
                }
            ]
        },
        "PtlJoinGame/ReqJoinGame": {
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
                    "name": "uid",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlJoinGame/ResJoinGame": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "playerSSO",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "player",
                    "type": {
                        "type": "Reference",
                        "target": "../shareType/MongoData/dbPlayer"
                    }
                }
            ]
        },
        "../shareType/MongoData/dbPlayer": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "_id",
                    "type": {
                        "type": "Reference",
                        "target": "?mongodb/ObjectId"
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
                },
                {
                    "id": 3,
                    "name": "level",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 4,
                    "name": "gold",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "PtlLogin/ReqLogin": {
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
                    "name": "account",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "password",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlLogin/ResLogin": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "sso",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        }
    }
};