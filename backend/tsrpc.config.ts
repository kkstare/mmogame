import type { TsrpcConfig } from 'tsrpc-cli';

export default <TsrpcConfig>{
    // Generate ServiceProto
    proto: [
        {
            ptlDir: 'src/shared/httpProtocols', // Protocol dir
            output: 'src/shared/httpProtocols/httpProto.ts', // Path for generated ServiceProto
            apiDir: 'src/httpApi',   // API dir
            docDir: 'docs',     // API documents dir
            ptlTemplate: { baseFile: 'src/shared/httpProtocols/base.ts' },
            // msgTemplate: { baseFile: 'src/shared/protocols/base.ts' },
        }, {
            ptlDir: 'src/shared/wsProtocols', // Protocol dir
            output: 'src/shared/wsProtocols/wsProto.ts', // Path for generated ServiceProto
            apiDir: 'src/wsApi',   // API dir
            docDir: 'docs',     // API documents dir
            ptlTemplate: { baseFile: 'src/shared/wsProtocols/base.ts' },
        }
    ],
    // Sync shared code
    sync: [
        {
            from: 'src/shared',
            to: '../frontend/assets/shared',
            type: 'symlink'     // Change this to 'copy' if your environment not support symlink
        }
    ],
    // Dev server
    dev: {
        autoProto: true,        // Auto regenerate proto
        autoSync: true,         // Auto sync when file changed
        autoApi: true,          // Auto create API when ServiceProto updated
        watch: 'src',           // Restart dev server when these files changed
        entry: 'src/index.ts',  // Dev server command: node -r ts-node/register {entry}
    },
    // Build config
    build: {
        autoProto: true,        // Auto generate proto before build
        autoSync: true,         // Auto sync before build
        autoApi: true,          // Auto generate API before build
        outDir: 'dist',         // Clean this dir before build
    }
}