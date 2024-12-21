// Call from ./packages/sdk

const {build} = require("esbuild");
const fs = require("fs");

function buildCLITool(moduleId) {
    build({
        ...{
            entryPoints: [
                `./src/${moduleId}/${moduleId}.ts`
            ],
            bundle: false,
            minify: false
        },
        platform: 'node',
        format: 'cjs',
        target: "node10.4",
        outfile: `./dist/${moduleId}/${moduleId}.cjs.js`,
    });
    if (!fs.existsSync(`./dist/${moduleId}`)) {
        fs.mkdirSync(`./dist/${moduleId}`);
    }
    fs.copyFileSync(`./src/${moduleId}/${moduleId}.js`, `./dist/${moduleId}/${moduleId}.js`);
    fs.copyFileSync(`./src/${moduleId}/${moduleId}.ts`, `./dist/${moduleId}/${moduleId}.ts`);
}

for (let moduleId of [
    "dotbim2xgf",
    "gltf2xgf",
    "cityjson2xgf",
    "las2xgf",
    "ifc2gltf2xgf"
]) {
    buildCLITool(moduleId);
}
