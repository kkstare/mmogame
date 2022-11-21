import { Component, game, instantiate, Node, _decorator } from 'cc';
import { myEvent } from './GameEnum';
import HttpMgr from './HttpMgr';
import { PlayerNode } from './PlayerNode';
const { ccclass, property } = _decorator;

@ccclass('PlayerChooseScene')
export class PlayerChooseScene extends Component {
    @property(Node)
    startBtn!: Node;

    @property(Node)
    content!: Node;

    @property(Node)
    playerNode!: Node

    onLoad() {
        this.initPlayers()
        this.startBtn.on(Node.EventType.TOUCH_END, this.beginGame, this)

        game.on(myEvent.refreshPlayer, this.initPlayers, this)
    }

    async initPlayers() {
        this.content.removeAllChildren()

        let data = await HttpMgr.getPlayers()
        for (let index = 0; index < data.res.players.length; index++) {
            const element = data.res.players[index];
            let node = instantiate(this.playerNode)
            node.getComponent(PlayerNode).initPlayerData(element)
            node.parent = this.content
        }

        let node = instantiate(this.playerNode)
        node.getComponent(PlayerNode).initPlayerData(null)
        node.parent = this.content
    }

    start() {

    }

    beginGame() {
        HttpMgr.createPlayer()
    }
}


