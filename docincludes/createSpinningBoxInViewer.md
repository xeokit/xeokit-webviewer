# View a Spinning 3D Box in a Web Page

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
