import { Prefab, resources } from "cc"

export interface winType {
    name: string
    path?: string
}

export enum winName {
    email = "email",
    bag = "bag",
}

export const winConfig: Record<winName, winType> = {
    "email": { "name": "emailWindow" },
    "bag": { "name": "bagWindow" },
}


export default class WinMgr {

    //暂时只做一个加载预制体的
    static async loadPrefab<T extends winName>(winName: T) {
        return new Promise<Prefab>((resolve, reject) => {
            let config = winConfig[winName]
            resources.load(config.path ?? "./" + config.name, (err: Error, res: Prefab) => {
                if (err) {
                    resolve(null)
                }
                resolve(res)
            })

        })

    }

}

