import Global from "./Global";
import { initHttpServer } from "./HttpServer";
import { initWsServer } from "./WsServer";


async function main() {
    await Global.initDb();
    await initHttpServer()
    await initWsServer()
}
main();