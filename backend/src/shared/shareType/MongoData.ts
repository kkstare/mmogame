import { ObjectId } from "mongodb";
import { uint } from "tsrpc";

export interface dbUsers {
    _id: ObjectId,
    account: string,
    password: string,
    playerID: ObjectId[],
}

export interface dbPlayer {
    _id: ObjectId,
    userName: string,
    model: string,
    level: number,
    gold: number,
    //已经使用的cdk
    gotCdk: string[],

    data?: string
}

export interface dbCdk {
    _id: ObjectId,
    key: string,
    startTime: uint,
    endTime: uint,
    itemId: number[],
    itemNum: number[],
}

export interface dbEmail {
    _id: ObjectId,
    playerId: ObjectId
    emialType: "notice" | "item"
    isRead?: boolean
    msg: string

    //以下数据在奖励邮件中显示
    isReceived?: boolean
    itemId?: number[],
    itemNum?: number[],

    //以下数据存数据库 不进行邮件发送
    isDelete?: boolean
    readTime?: uint
    receiveTime?: uint

}

export interface CollectionType {
    users: dbUsers,
    player: dbPlayer,
    cdk: dbCdk,
    email: dbEmail,
}



