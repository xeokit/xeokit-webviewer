# Convert a glTF file to XGF

Let's make a NodeJS script that converts a glTF file into xeokit's native XGF format.

First import the npm modules we need from the SDK. Note that we don't need the viewer for this example.

````bash
npm install @xeokit/scene
npm install @xeokit/core/constants
npm install @xeokit/gltf
npm install @xeokit/xgf
````

Here's the JavaScript for our converter script.

````javascript

// 1

import {Scene} from "@xeokit/scene";
import {Data} from "@xeokit/data";
import {loadGLTF} from "@xeokit/gltf";
import {saveXGF} from "@xeokit/xgf";

const fs = require('fs');

// 2

const scene = new Scene(); // Scene graph
const sceneModel = scene.createModel({id: "myModel"}); // Start building the scene graph

const data = new Data();
const dataModel = data.createModel({id: "myModel"}); // Will model the glTF scene hierarchy

fs.readFile("./tests/assets/HousePlan.glb", (err, buffer) => {

    const arraybuffer = toArrayBuffer(buffer);

    loadGLTF({
        fileData: arrayBuffer,
        sceneModel,
        dataModel
    }).then(() => {

        sceneModel
            .build()
            .then(() => {

                const arrayBuffer = saveXGF({
                    sceneModel,
                    dataModel
                });

                fs.writeFile('myModel.xgf', arrayBuffer);
            });
    })
});

function toArrayBuffer(buf) {
    const ab = new ArrayBuffer(buf.length);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; ++i) {
        view[i] = buf[i];
    }
    return ab;
}
````

The script does the following steps:

1. Import packages and modules relevant to xeokit, as well as Node's file system module, which is used to read and write
   files.
2. Create a new Scene instance.
3. Create a new Data instance and DataModel with ID "myModel".
4. Use Node's fs module to read file called "HousePlan.glb" asynchronously.
5. Create an ArrayBuffer from the file using the toArrayBuffer() function.
6. Invoke the xeokit method loadGLTF() to load the model.
7. Invoke the xeokit method build() to prepare the scene model.
8. Invoke the xeokit method saveXGF() to create an XGF file from the scene model and data model.
9. Use Node's fs module to write the XGF file to disk.
10. The toArrayBuffer() function is called to create an ArrayBuffer from a Buffer object.
