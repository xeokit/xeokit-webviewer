// Call from ./packages/sdk

const {build} = require("esbuild");
const sharedConfig = {
    entryPoints: [
        "src/cityjson2xgf/cityjson2xgf.ts"
    ],
    bundle: true,
    minify: false
};

build({
    ...sharedConfig,
    platform: 'node',
    format: 'cjs',
    target: "node10.4",
    outfile: "src/cityjson2xgf/dist/cityjson2xgf.cjs.js",
});
