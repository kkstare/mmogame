import { ServiceProto } from 'tsrpc-proto';
import { ReqCreatePlayer, ResCreatePlayer } from './PtlCreatePlayer';
import { ReqExchangeCDK, ResExchangeCDK } from './PtlExchangeCDK';
import { ReqGetEmail, ResGetEmail } from './PtlGetEmail';
import { ReqGetPlayers, ResGetPlayers } from './PtlGetPlayers';
import { ReqJoinGame, ResJoinGame } from './PtlJoinGame';
import { ReqLogin, ResLogin } from './PtlLogin';

export interface ServiceType {
    api: {
        "CreatePlayer": {
            req: ReqCreatePlayer,
            res: ResCreatePlayer
        },
        "ExchangeCDK": {
            req: ReqExchangeCDK,
            res: ResExchangeCDK
        },
        "GetEmail": {
            req: ReqGetEmail,
            res: ResGetEmail
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
    "version": 3,
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
            "id": 4,
            "name": "ExchangeCDK",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 5,
            "name": "GetEmail",
            "type": "api",
            "conf": {
                "needLogin": true
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
        "PtlExchangeCDK/ReqExchangeCDK": {
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
                    "name": "cdk",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlExchangeCDK/ResExchangeCDK": {
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
        "PtlGetEmail/ReqGetEmail": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ]
        },
        "PtlGetEmail/ResGetEmail": {
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
                    "name": "emiadlDatas",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "target": {
                                "type": "Reference",
                                "target": "../shareType/MongoData/dbEmail"
                            },
                            "keys": [
                                "_id",
                                "emialType",
                                "isRead",
                                "msg",
                                "isReceived",
                                "itemId",
                                "itemNum"
                            ],
                            "type": "Pick"
                        }
                    }
                }
            ]
        },
        "../shareType/MongoData/dbEmail": {
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
                    "name": "playerId",
                    "type": {
                        "type": "Reference",
                        "target": "?mongodb/ObjectId"
                    }
                },
                {
                    "id": 2,
                    "name": "emialType",
                    "type": {
                        "type": "Union",
                        "members": [
                            {
                                "id": 0,
                                "type": {
                                    "type": "Literal",
                                    "literal": "notice"
                                }
                            },
                            {
                                "id": 1,
                                "type": {
                                    "type": "Literal",
                                    "literal": "item"
                                }
                            }
                        ]
                    }
                },
                {
                    "id": 3,
                    "name": "isRead",
                    "type": {
                        "type": "Boolean"
                    },
                    "optional": true
                },
                {
                    "id": 4,
                    "name": "msg",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 5,
                    "name": "isReceived",
                    "type": {
                        "type": "Boolean"
                    },
                    "optional": true
                },
                {
                    "id": 6,
                    "name": "itemId",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Number"
                        }
                    },
                    "optional": true
                },
                {
                    "id": 7,
                    "name": "itemNum",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Number"
                        }
                    },
                    "optional": true
                },
                {
                    "id": 8,
                    "name": "isDelete",
                    "type": {
                        "type": "Boolean"
                    },
                    "optional": true
                },
                {
                    "id": 9,
                    "name": "readTime",
                    "type": {
                        "type": "Number",
                        "scalarType": "uint"
                    },
                    "optional": true
                },
                {
                    "id": 10,
                    "name": "receiveTime",
                    "type": {
                        "type": "Number",
                        "scalarType": "uint"
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
                },
                {
                    "id": 5,
                    "name": "gotCdk",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "String"
                        }
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