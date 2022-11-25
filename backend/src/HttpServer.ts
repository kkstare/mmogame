import path from "path";
import { HttpServer } from "tsrpc";
import { serviceProto as HttpProto } from './shared/httpProtocols/httpProto';
import { useCheckAccess } from "./SSOUtil";

export const httpServer = new HttpServer(HttpProto, {
    port: 3000,
    // Remove this to use binary mode (remove from the client too)
    json: true
});

useCheckAccess(httpServer) // 验证登录态及权限

export async function initHttpServer() {
    await httpServer.autoImplementApi(path.resolve(__dirname, 'httpApi'));

    await httpServer.start()
}
