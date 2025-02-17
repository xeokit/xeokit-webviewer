// 1.
import {Scene} from "../../libs/@xeokit/sdk/scene/index.js";
import {WebGLRenderer} from "../../libs/@xeokit/sdk/webglrenderer/index.js";
import {Viewer} from "../../libs/@xeokit/sdk/viewer/index.js";
import {TrianglesPrimitive} from "../../libs/@xeokit/sdk/constants/index.js";
import {CameraControl} from "../../libs/@xeokit/sdk/cameracontrol/index.js";

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

const demoHelper = new DemoHelper({
    elementId: "info-container",
    viewer
});

demoHelper.init()
    .then(() => {

        // Create a single View that renders to a canvas

        const view = viewer.createView({
            id: "demoView",
            elementId: "demoCanvas"
        });

        // Position the View's Camera to look at the origin of the coordinate system

        view.camera.eye = [3, 3, 3]; // Default is [0,0,10]
        view.camera.look = [0, 0, 0]; // Default
        view.camera.up = [0, 1, 0]; // Default

        // Add a CameraControl to the View to control it's Camera with mouse and touchpad input

        new CameraControl(view);

        // Within the Scene, create a SceneModel to hold geometry and materials for our model

        const sceneModel = scene.createModel({
            id: "demoModel"
        });

        sceneModel.createGeometry({
            id: "boxGeometry",
            primitive: TrianglesPrimitive,

            // The vertices - eight for our box, each
            // one spanning three array elements for X,Y and Z

            positions: [
                // v0-v1-v2-v3 front
                1.0, 1.0, 1.0,
                -1.0, 1.0, 1.0,
                -1.0, -1.0, 1.0,
                1.0, -1.0, 1.0,

                // v0-v3-v4-v1 right
                1.0, 1.0, 1.0,
                1.0, -1.0, 1.0,
                1.0, -1.0, -1.0,
                1.0, 1.0, -1.0,

                // v0-v1-v6-v1 top
                1.0, 1.0, 1.0,
                1.0, 1.0, -1.0,
                -1.0, 1.0, -1.0,
                -1.0, 1.0, 1.0,

                // v1-v6-v7-v2 left
                -1.0, 1.0, 1.0,
                -1.0, 1.0, -1.0,
                -1.0, -1.0, -1.0,
                -1.0, -1.0, 1.0,

                // v7-v4-v3-v2 bottom
                -1.0, -1.0, -1.0,
                1.0, -1.0, -1.0,
                1.0, -1.0, 1.0,
                -1.0, -1.0, 1.0,

                // v4-v7-v6-v1 back
                1.0, -1.0, -1.0,
                -1.0, -1.0, -1.0,
                -1.0, 1.0, -1.0,
                1.0, 1.0, -1.0
            ],

            // Indices - these organise the
            // positions coordinates
            // into geometric primitives in accordance
            // with the "primitive" parameter,
            // in this case a set of three indices
            // for each triangle.
            //
            // Note that each triangle is specified
            // in counter-clockwise winding order.

            indices: [

                // Front
                0, 1, 2,
                0, 2, 3,

                // Right
                4, 5, 6,
                4, 6, 7,

                // Top
                8, 9, 10,
                8, 10, 11,

                // Left
                12, 13, 14,
                12, 14, 15,

                // Bottom
                16, 17, 18,
                16, 18, 19,

                // Back
                20, 21, 22,
                20, 22, 23
            ]
        });

        sceneModel.createMesh({
            id: "triangleMesh",
            geometryId: "boxGeometry",
            position: [0, 0, 0], // Default
            scale: [1, 1, 1], // Default
            rotation: [0, 0, 0], // Default
            color: [1, 1.0, 1.0] // Default
        });

        sceneModel.createObject({
            id: "triangleObject",
            meshIds: ["triangleMesh"]
        });

        sceneModel.build();

        demoHelper.finished();
    });
