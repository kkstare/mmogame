import * as path from "path";
import { HttpServer, WsServer } from "tsrpc";
import Global from "./Global";
import { serviceProto as HttpProto } from './shared/httpProtocols/httpProto';
import { serviceProto as wsProto } from './shared/wsProtocols/wsProto';

import { useCheckAccess } from "./SSOUtil";

// Create the Server

export const httpServer = new HttpServer(HttpProto, {
    port: 3000,
    // Remove this to use binary mode (remove from the client too)
    json: true
});

export const wsServer = new WsServer(wsProto, {
    port: 3001,
    // Remove this to use binary mode (remove from the client too)
    json: true
});

// Initialize before server start
async function init() {
    await httpServer.autoImplementApi(path.resolve(__dirname, 'httpApi'));
    await wsServer.autoImplementApi(path.resolve(__dirname, 'wsApi'));

    // TODO
    // Prepare something... (e.g. connect the db)
};

// Entry function
async function main() {
    await Global.initDb();
    await init();
    await httpServer.start();
    useCheckAccess(httpServer);

    await wsServer.start();
    useCheckAccess(wsServer);

}
main();