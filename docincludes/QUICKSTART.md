## View a Spinning 3D Box in a Web Page

Let's use xeokit to show a spinning 3D box in a web page.

First import the npm modules we need from the xeokit SDK:

````bash
npm install @xeokit/scene
npm install @xeokit/viewer
npm install @xeokit/webglrenderer
npm install @xeokit/core/constants
````

Then create an HTML page with a canvas element:

````html
<!DOCTYPE html>
<html>
<head>
    <title>xeokit Spinning Box</title>
</head>
<body>
<canvas id="myCanvas"></canvas>
</body>
</html>
````

Then create some JavaScript to create the spinning box:

````javascript
import {Scene} from "@xeokit/scene";
import {TrianglesPrimitive} from "@xeokit/constants";
import {Viewer} from "@xeokit/viewer";
import {WebGLRenderer} from "@xeokit/webglrenderer";

const renderer = new WebGLRenderer({});

const scene = new Scene();

const viewer = new Viewer({
    renderer,
    scene
});

const view = viewer.createView({
    id: "myView",
    canvasId: "myView1"
});

view.camera.eye = [0, 0, 10]; // Looking down the -Z axis
view.camera.look = [0, 0, 0];
view.camera.up = [0, 1, 0];

const sceneModel = scene.createModel(); // Start building the model

sceneModel.createGeometry({ // Define a box-shaped geometry
    id: "boxGeometry",
    primitive: TrianglesPrimitive,
    positions: [-1, -1, -1, 1, -1, -1, ...],
    indices: [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, ...]
});

sceneModel.createMesh({
    id: "boxMesh",
    geometryId: "boxGeometry",
    color: [1, 1, 1],
    textureSetId: "boxTextureSet"
});

sceneModel.createObject({
    id: "boxObject",
    meshIds: ["boxMesh"]
});

sceneModel
    .build()
    .then(() => {

        // A box object now appears on our View's canvas.

        // We can now show/hide/select/highlight our box through the View:

        view.objects["boxObject"].visible = true;
        view.objects["boxObject"].highlighted = false;  // etc.

        // Start orbiting the camera:

        viewer.onTick.subscribe(() => {
            view.camera.orbitYaw(1.0);
        });
    });
````

In this example:

1. The code imports necessary modules needed to create a 3D scene application: Scene, TrianglesPrimitive, Viewer, and
   WebGLRenderer.
2. A new Scene object is initialized and a WebGLRenderer object is instantiated.
3. A new Viewer object is also instantiated with the Scene and Renderer objects as parameters.
4. A View is then created with a given ID and canvas ID. The camera parameters such as eye, look and up are set.
5. A SceneModel is created which includes a box-shaped geometry.
6. A mesh is then created with the geometry.
7. A 3D object is created with the mesh.
8. The SceneModel is built and the object's visibility and highlight is set to true and false respectively.
9. Finally, a callback function to the viewer is set to orbit the camera's yaw by 1.0 on each tick.

## View a glTF Model in a Web Page

Let's use xeokit to view a glTF model in a web page.

First import the npm modules we need from the SDK:

````bash
npm install @xeokit/scene
npm install @xeokit/viewer
npm install @xeokit/webglrenderer
npm install @xeokit/constants
npm install @xeokit/gltf
````

Here's the JavaScript for our glTF viewer app:

````javascript
import {Scene} from "@xeokit/scene";
import {Viewer} from "@xeokit/viewer";
import {WebGLRenderer} from "@xeokit/webglrenderer";
import {loadGLTF} from "@xeokit/gltf";

const scene = new Scene(); // Scene graph

const renderer = new WebGLRenderer({}); // WebGL renderers kernel

const viewer = new Viewer({ // Browser-based viewer
    scene,
    renderer
});

const view = myViewer.createView({ // Independent view 
    id: "myView",
    canvasId: "myView1"
});

view.camera.eye = [0, 0, 10]; // Looking down the -Z axis
view.camera.look = [0, 0, 0];
view.camera.up = [0, 1, 0];

const sceneModel = scene.createModel();

fetch("myModel.glb")
    .then(response => { // Fetch the glTF

        response
            .arrayBuffer()
            .then(fileData => {

                loadGLTF({
                    fileData,
                    sceneModel
                }).then(() => { // Load the glTF

                    sceneModel
                        .build()
                        .then(() => { // Compresses textures, geometries etc.

                            // A model now appears on our View's canvas.

                            // We can now show/hide/select/highlight the model's objects through the View:

                            view.objects["2hExBg8jj4NRG6zzE$aSi6"].visible = true;
                            view.objects["2hExBg8jj4NRG6zzE$aSi6"].highlighted = false;  // etc.

                            // Start orbiting the camera:

                            viewer.onTick.subscribe(() => {
                                view.camera.orbitYaw(1.0);
                            });
                        });
                });
            });
    });
````

In this example, we are:

1. Instantiating a Scene and WebGLRenderer instance, and attaching them to a Viewer.
2. Creating a view, and setting its camera to view the scene from a certain position.
3. Fetching a model in GLTF format, and loading it into the Scene.
4. Making a couple of objects visible and un-highlighted.
5. Subscribing to the Viewer's onTick event, and setting the view's camera to orbit around the model.

## Convert a glTF file to XGF

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
import {Scene} from "@xeokit/scene";
import {Data} from "@xeokit/data";
import {loadGLTF} from "@xeokit/gltf";
import {saveXGF} from "@xeokit/xgf";

const fs = require('fs');

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
3. Create a new Data instance and Model with ID "myModel".
4. Use Node's fs module to read file called "HousePlan.glb" asynchronously.
5. Create an ArrayBuffer from the file using the toArrayBuffer() function.
6. Invoke the xeokit method loadGLTF() to load the model.
7. Invoke the xeokit method build() to prepare the scene model.
8. Invoke the xeokit method saveXGF() to create an XGF file from the scene model and data model.
9. Use Node's fs module to write the XGF file to disk.
10. The toArrayBuffer() function is called to create an ArrayBuffer from a Buffer object.

## Creating a Multi-Canvas 3D Viewer

![]()

* [Run this example]()

First, let's create an HTML page that has three canvases. 

````html
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>xeokit Multi-View Example</title>
    <style>

        body {
            user-select: none;
            -webkit-user-drag: none;
            -moz-user-drag: none;
            -ms-user-drag: none;
            user-drag: none;
        }

        #myCanvas1 {
            user-select: none;
            -webkit-user-drag: none;
            -moz-user-drag: none;
            -ms-user-drag: none;
            user-drag: none;
            width: 1000px;
            height: 800px;
            left: 10px;
            top: 60px;
            position: absolute;
            padding: 0px;
        }

        #myCanvas2 {
            user-select: none;
            -webkit-user-drag: none;
            -moz-user-drag: none;
            -ms-user-drag: none;
            user-drag: none;
            width: 500px;
            height: 390px;
            left: 1020px;
            top: 60px;
            position: absolute;
            padding: 0px;
        }

        #myCanvas3 {
            user-select: none;
            -webkit-user-drag: none;
            -moz-user-drag: none;
            -ms-user-drag: none;
            user-drag: none;
            width: 500px;
            height: 400px;
            left: 1020px;
            top: 460px;
            position: absolute;
            padding: 0px;
        }
    </style>
</head>
<body>
<img id="myCanvas1"> <img id="myCanvas2"/> <img id="myCanvas3"/>
</body>
<script type="module" src="index.js"></script>
</html>
````

In the JavaScript code, we'll create a Viewer configured with a WebGLRenderer, a Scene, and multiple Views. In the Scene, we build
a SceneModel containing a simple box-shaped triangle mesh. The Viewer then draws the box in each View's canvas.

````javascript
import {Scene} from "@xeokit/scene";
import {TrianglesPrimitive, OrthographicProjection} from "@xeokit/constants";
import {Viewer} from "@xeokit/viewer";
import {WebGLRenderer} from "@xeokit/webglrenderer";

const scene = new xeokit.scene.Scene();

const renderer = new xeokit.webglrenderer.WebGLRenderer({});

const viewer = new xeokit.viewer.Viewer({
    id: "myViewer",
    scene,
    renderer
});

// Create View #1 - perspective projection, looking at the model from the side

const view1 = viewer.createView({
    id: "myView1",
    elementId: "myCanvas1"
});

view1.camera.eye = [0, -5, 20];
view1.camera.look = [0, -5, 0];
view1.camera.up = [0, 1, 0];

// Create View #2  - orthographic, looking at the model from above

const view2 = viewer.createView({
    id: "myView2",
    elementId: "myCanvas2"
});

view2.camera.eye = [0, -5, 20];
view2.camera.look = [0, -5, 0];
view2.camera.up = [0, 1, 0];

view2.camera.projectionType = OrthographicProjection;

// Create View 3

const view3 = viewer.createView({
    id: "myView3",
    elementId: "myCanvas3"
});

view3.camera.eye = [0, -5, 20];
view3.camera.look = [0, -5, 0];
view3.camera.up = [0, 1, 0];

// Attach CameraControls to the Views, to control
// each View independently with mouse and touch input

const cameraControl1 = new xeokit.cameracontrol.CameraControl(view1, {});
const cameraControl2 = new xeokit.cameracontrol.CameraControl(view2, {});
const cameraControl3 = new xeokit.cameracontrol.CameraControl(view3, {});

// Create SceneModel to hold geometry

const sceneModel = scene.createModel({
    id: "myModel",
    geometries: [
        {
            id: "boxGeometry",
            primitive: 20002,
            positions: [
                1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0,
                1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0,
                1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0,
                -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0,
                -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0,
                1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0
            ],
            indices: [
                0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7,
                8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15,
                16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23
            ]
        }
    ],
    meshes: [
        {
            id: "boxMesh",
            geometryId: "boxGeometry",
            color: [1, 1, 1, 1],
            opacity: 1
        }
    ],
    objects: [
        {
            id: "boxObject",
            meshIds: ["boxMesh"]
        }
    ]
});

sceneModel.build();

viewer.views["myView1"].objects["greenLeg"].colorize = [0.3, 1, 1];
viewer.views["myView2"].objects["greenLeg"].colorize = [0.3, 1.0, 0.3];
viewer.views["myView3"].objects["greenLeg"].colorize = [1, 0.3, 0.3];

viewer.views["myView1"].objects["purpleTableTop"].colorize = [0.3, 1, 1];
viewer.views["myView2"].objects["purpleTableTop"].colorize = [0.3, 1.0, 0.3];
viewer.views["myView3"].objects["purpleTableTop"].colorize = [1, 0.3, 0.3];

viewer.onTick.subscribe(() => {
    view3.camera.orbitYaw(-1.3);
});

let toggle = false;

setInterval(() => {
    viewer.views["myView1"].objects["purpleTableTop"].colorize = (toggle = !toggle) ? [0.3, 1, 1] : [1, 0.3, 0.3];
}, 2000);
````
