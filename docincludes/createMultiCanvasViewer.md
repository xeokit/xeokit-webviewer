# Creating a Multi-Canvas 3D Viewer



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
