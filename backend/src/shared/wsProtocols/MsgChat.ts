export interface MsgChat {
    type: "world" | "map" | "private"
    content: string
}
