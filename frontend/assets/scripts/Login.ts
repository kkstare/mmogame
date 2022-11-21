import { Component, director, EditBox, Node, _decorator } from 'cc';
import HttpMgr from './HttpMgr';
const { ccclass, property } = _decorator;

@ccclass('Login')
export class Login extends Component {
    @property(EditBox)
    accountEdit!: EditBox;

    @property(EditBox)
    pwdEdit!: EditBox;

    @property(Node)
    loginBtn!: Node;

    onLoad() {
        this.loginBtn.on(Node.EventType.TOUCH_END, this.login, this)

    }

    async login() {
        let account = this.accountEdit.string
        let pwd = this.pwdEdit.string

        let res = await HttpMgr.userLogin(account, pwd)
        if (res) {
            director.loadScene("player")
        } else {

        }
    }
}


