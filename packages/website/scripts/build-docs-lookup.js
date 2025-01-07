const fs = require('fs');
const path = require('path');

function buildDocsLookup(docsDir) {

    const jsonDir = `${docsDir}/json/`;

    const index = new Map();

    try {
        const files = fs.readdirSync(jsonDir);

        files.forEach(file => {
            const filePath = path.join(jsonDir, file);
            const stats = fs.statSync(filePath);
            if (stats.isFile()) {
                try {
                    const data = fs.readFileSync(filePath, 'utf8');
                    const moduleData = JSON.parse(data);
                    const packageId = moduleData.name;
                    const offset = "@xeokit/".length;
                    const packageLocalName = packageId.substring(offset);

                  //  console.log(packageLocalName);
                    const children = moduleData.children;
                    if (children) {
                        for (let child of children) {
                            const kind = child.kind;
                            let path = null;
                            const entry = {
                                path:null,
                                kind:null
                            };
                            switch (kind) {
                                case 4:
                                    continue;
                                    break;
                                case 128:
                                    entry.path = `/api-docs#/docs/api/classes/${packageLocalName}.${child.name}.html`;
                                    entry.kind="class";
                                    break;
                                case 32:
                                    entry.path = `/api-docs#/docs/api/variables/${packageLocalName}.${child.name}.html`;
                                    entry.kind="variable";
                                    break;
                                case 64:
                                    entry.path = `/api-docs#/docs/api/functions/${packageLocalName}.${child.name}.html`;
                                    entry.kind="function";
                                    break;
                                case 87:
                                case 256:
                                    entry.path = `/api-docs#/docs/api/interfaces/${packageLocalName}.${child.name}.html`;
                                    entry.kind="interface";
                                    break;
                                case 2097152:
                                    entry.path = `/api-docs#/docs/api/types/${packageLocalName}.${child.name}.html`;
                                    entry.kind="type";
                                    break;
                                default:
                                    console.log(`kind not handled: ${kind}`)
                            }
                            index.set(child.name, entry);
                        }
                    }


                } catch (err) {
                    console.error(`Error reading or parsing JSON in file: ${filePath}`, err);
                }
            }
        });
    } catch (err) {
        console.error(`Error reading directory: ${err}`);
    }

    const sortedIndex = Object.fromEntries([...index.entries()].sort((a, b) => a[0].localeCompare(b[0])));

    return sortedIndex;
}

const docsDirectory = './docs';
const index = buildDocsLookup(docsDirectory);

fs.writeFileSync("./data/docsLookup.json", JSON.stringify(index, null, 2), 'utf8');
