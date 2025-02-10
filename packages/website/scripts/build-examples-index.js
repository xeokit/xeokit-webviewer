//
// Creates the examples index file ./examples/index.json
//

const fs = require('fs');
const path = require('path');

function buildExamplesIndex(baseDir) {
    const index = {
        pages: {}
    };

    try {
        const files = fs.readdirSync(baseDir);

        files.forEach(file => {
            const subDirPath = path.join(baseDir, file);
            const stats = fs.statSync(subDirPath);
            if (stats.isDirectory()) {
                const indexPath = path.join(subDirPath, 'index.json');
                if (fs.existsSync(indexPath)) {
                    try {
                        const data = fs.readFileSync(indexPath, 'utf8');
                        const jsonData = JSON.parse(data);
                        jsonData.id = file;
                        jsonData.type = "example";
                        index.pages[file] = jsonData;
                        if (jsonData.template) {
                            //console.log(`Using template: ./templates/${jsonData.template}`);
                            fs.cpSync(`./templates/${jsonData.template}.html`, `${subDirPath}/index.html`);
                        }
                        fs.writeFileSync(indexPath, JSON.stringify(jsonData, null, 2), 'utf8');
                    } catch (err) {
                        console.error(`Error reading or parsing JSON in file: ${indexPath}`, err);
                    }
                } else {
                    console.log(`index.json not found in ${subDirPath}`);
                }
            }
        });
    } catch (err) {
        console.error(`Error reading directory: ${err}`);
    }

    return index;
}

const baseDirectory = './examples/';
const index = buildExamplesIndex(baseDirectory);

fs.writeFileSync("./examples/index.json", JSON.stringify(index, null, 2), 'utf8');
