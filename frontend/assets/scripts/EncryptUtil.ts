
export class EncryptUtil {
    // 加密
    static encrypt(buf: Uint8Array) {
        for (let i = 0; i < buf.length; ++i) {
            buf[i] -= 1
        }
        return buf
    }

    // 解密
    static decrypt(buf: Uint8Array) {
        for (let i = 0; i < buf.length; ++i) {
            buf[i] += 1
        }
        return buf
    }

}