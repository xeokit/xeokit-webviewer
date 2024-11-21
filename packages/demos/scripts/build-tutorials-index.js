const fs = require('fs');
const path = require('path');

function readIndexFilesFromSubdirs(baseDir) {
    const index = {
        tutorials: {}
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
                        index.tutorials[file] = jsonData;
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

const baseDirectory = './data/tutorials';
const index = readIndexFilesFromSubdirs(baseDirectory);

//console.log(`Contents of index:`, index);

fs.writeFileSync("./data/tutorials/index.json", JSON.stringify(index, null, 2), 'utf8');
