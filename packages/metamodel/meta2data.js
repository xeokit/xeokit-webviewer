#!/usr/bin/env node

const {convertMetaModel} = require("./dist/index.cjs.js");

const commander = require('commander');
const npmPackage = require('./package.json');
const fs = require('fs');
const path = require("path");
const program = new commander.Command();

program.version(npmPackage.version, '-v, --version');

program
    .description(`CLI to convert a JSON MetaModel file into a JSON DataModel file`)
    .option('-i, --input [file]', 'path to input JSON MetaModel file (required)')
    .option('-d, --datamodel [file]', 'path to target JSON DataModel file (required)')
    .option('-l, --log', 'enable logging (optional)');

program.on('--help', () => {
    //  console.log(`\n\nXGF version: 10`);
});

program.parse(process.argv);

const options = program.opts();

function logInfo(msg) {
    if (options.log) {
        console.log(`[meta2data] ${msg}`);
    }
}

function logError(msg) {
    console.error(`[meta2data] ${msg}`);
}

if (!options.input) {
    logError(`Argument expected: -i`);
    process.exit(-1);
}

if (!options.datamodel) {
    logError(`Argument expected: -d`);
    process.exit(-1);
}

try {

    const metaModelSrc = options.input;
    const dataModelSrc = options.datamodel;

    logInfo(`\nReading JSON MetaModel file: ${metaModelSrc}`);

    const metaModelJSON = JSON.parse(fs.readFileSync(metaModelSrc));

    const dataModelDir = path.dirname(dataModelSrc);
    if (dataModelDir !== "" && !fs.existsSync(dataModelDir)) {
        fs.mkdirSync(dataModelDir, {recursive: true});
    }

    logInfo(`Writing target DataModel JSON: ${dataModelSrc}`);

    fs.writeFileSync(dataModelSrc, convertMetaModel(metaModelJSON));

    process.exit(1);

} catch (err) {
    logError(err);
    process.exit(-1);
}

function getBasePath(src) {
    const i = src.lastIndexOf("/");
    return (i !== 0) ? src.substring(0, i + 1) : "";
}
