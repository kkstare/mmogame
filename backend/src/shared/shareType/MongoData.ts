import { ObjectId } from "mongodb"

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

}

export interface CollectionType {
    users: dbUsers,
    player: dbPlayer
}



