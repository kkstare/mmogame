import { Collection, Db, MongoClient } from "mongodb";
import { CollectionType } from "./shared/shareType/MongoData";

export default class Global {
    static db: Db;

    static collection<T extends keyof CollectionType>(col: T): Collection<CollectionType[T]> {
        return this.db.collection(col);
    }

    static async initDb() {
        const uri = 'mongodb://user:password@127.0.0.1:27017/mmoGame?authSource=admin';
        const client = await new MongoClient(uri).connect();
        this.db = client.db();
    }




}