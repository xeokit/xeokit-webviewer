// Import the SDK from a bundle built for these examples

import * as xeokit from "../../js/xeokit-demo-bundle.js";

import {DemoHelper} from "../../js/DemoHelper.js";


// Create a Scene to hold geometry and materials

const scene = new xeokit.scene.Scene();

// Create a WebGLRenderer to use the browser's WebGL API for 3D graphics

const renderer = new xeokit.webglrenderer.WebGLRenderer({});

// Create a Viewer that views our Scene using the WebGLRenderer. Note that the
// Scene and WebGLRenderer can only be attached to one Viewer at a time.

const viewer = new xeokit.viewer.Viewer({
    id: "demoViewer",
    scene,
    renderer
});

// Ignore the DemoHelper

const demoHelper = new DemoHelper({
    viewer
});

demoHelper.init()
    .then(() => {

        // Create a View that renders to the canvas in our HTML

        const view = viewer.createView({
            id: "demoView",
            elementId: "demoCanvas"
        });

        // Position the View's Camera to look at the origin of the World coordinate system

        view.camera.eye = [2, 2, 3]; // Default is [0,0,10]
        view.camera.look = [0, 0, 0]; // Default
        view.camera.up = [0, 1, 0]; // Default

        // Add a CameraControl to control the Camera

        new xeokit.cameracontrol.CameraControl(view);

        // Create a SceneModel containing a SceneObject, a SceneMesh and a box-shaped SceneGeometry

        const sceneModel = scene.createModel({
            id: "demoModel"
        });

        sceneModel.createGeometryCompressed({
            id: "boxGeometry",
            primitive: xeokit.constants.TrianglesPrimitive,
            aabb: [-1, -1, -1, 1, 1, 1],
            positionsCompressed: [
                65525, 65525, 65525, 0, 65525, 65525, 0, 0, 65525, 65525, 0,
                65525, 65525, 65525, 65525, 65525, 0, 65525, 65525, 0, 0,
                65525, 65525, 0, 65525, 65525, 65525, 65525, 65525, 0, 0,
                65525, 0, 0, 65525, 65525, 0, 65525, 65525, 0, 65525, 0,
                0, 0, 0, 0, 0, 65525, 0, 0, 0, 65525, 0, 0, 65525, 0, 65525,
                0, 0, 65525, 65525, 0, 0, 0, 0, 0, 0, 65525, 0, 65525, 65525, 0
            ],
            indices: [
                0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13,
                14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23
            ],
            edgeIndices: [
                8, 12, 12, 19, 19, 18, 8, 18, 18, 20, 20, 23,
                8, 23, 23, 22, 12, 22, 22, 21, 19, 21, 20, 21
            ]
        });

        sceneModel.createMesh({
            id: "boxMesh",
            geometryId: "boxGeometry",
            position: [0, 0, 0], // Default
            scale: [1, 1, 1], // Default
            rotation: [0, 0, 0], // Default
            color: [1.0, 0.0, 0.0] // Default is [1,1,1]
        });

        sceneModel.createObject({
            id: "boxObject",
            meshIds: ["boxMesh"]
        });

        // Build the SceneModel, causing the red box to appear in the View's canvas.

        sceneModel.build().then(()=>{

            // At this point, the View will contain a single ViewObject that has the same ID as the SceneModel. Through
            // the ViewObject, we can update the appearance of the box in that View.

            view.objects["boxObject"].highlighted = true;
            view.setObjectsHighlighted(view.highlightedObjectIds, false);

            // Ignore the DemoHelper

            demoHelper.finished();
        })
    });
