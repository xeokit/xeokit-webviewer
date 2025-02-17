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

const view = viewer.createView({
    id: "demoView",
    elementId: "demoCanvas"
});

view.camera.eye = [0, -5, 20];
view.camera.look = [0, -5, 0];
view.camera.up = [0, 1, 0];

// Add a CameraControl to interactively control the Camera with keyboard,
        // mouse and touch input

        new xeokit.cameracontrol.CameraControl(view);

const demoHelper = new DemoHelper({
    elementId: "info-container",
    viewer
});

demoHelper
    .init()
    .then(() => {

        // Within the Scene, create a SceneModel to hold geometry and materials for our model

        const sceneModel = scene.createModel({
            id: "demoModel"
        });

        sceneModel.createGeometry({
            id: "demoBoxGeometry",
            primitive: xeokit.constants.TrianglesPrimitive,
            positions: [
                1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, 1, 1, 1, -1, -1, 1,
                -1, -1, 1, 1, -1, 1, 1, -1, 1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, 1, -1, -1, 1, -1, 1, -1, -1, 1, 1,
                -1, -1, -1, -1, -1, -1, 1, -1, 1, 1, -1
            ],
            indices: [
                0, 1, 2, 0, 2, 3,            // front
                4, 5, 6, 4, 6, 7,            // right
                8, 9, 10, 8, 10, 11,         // top
                12, 13, 14, 12, 14, 15,      // left
                16, 17, 18, 16, 18, 19,      // bottom
                20, 21, 22, 20, 22, 23
            ]
        });

        sceneModel.createMesh({
            id: "redLegMesh",
            geometryId: "demoBoxGeometry",
            matrix: xeokit.scene.buildMat4({
                position: [-4, -6, -4],
                scale: [1, 3, 1]
            }),
            color: [1, 0.3, 0.3]
        });

        sceneModel.createObject({
            id: "redLeg",
            meshIds: ["redLegMesh"]
        });

        sceneModel.createMesh({
            id: "greenLegMesh",
            geometryId: "demoBoxGeometry",
            matrix: xeokit.scene.buildMat4({
                position: [4, -6, -4],
                scale: [1, 3, 1]
            }),
            color: [0.3, 1.0, 0.3]
        });

        sceneModel.createObject({
            id: "greenLeg",
            meshIds: ["greenLegMesh"]
        });

        sceneModel.createMesh({
            id: "blueLegMesh",
            geometryId: "demoBoxGeometry",
            matrix: xeokit.scene.buildMat4({
                position: [4, -6, 4],
                scale: [1, 3, 1]
            }),
            color: [0.3, 0.3, 1.0]
        });

        sceneModel.createObject({
            id: "blueLeg",
            meshIds: ["blueLegMesh"]
        });

        sceneModel.createMesh({
            id: "yellowLegMesh",
            geometryId: "demoBoxGeometry",
            matrix: xeokit.scene.buildMat4({
                position: [-4, -6, 4],
                scale: [1, 3, 1]
            }),
            color: [1.0, 1.0, 0.0]
        });

        sceneModel.createObject({
            id: "yellowLeg",
            meshIds: ["yellowLegMesh"]
        });

        sceneModel.createMesh({
            id: "purpleTableTopMesh",
            geometryId: "demoBoxGeometry",
            matrix: xeokit.scene.buildMat4({
                position: [0, -3, 0],
                scale: [6, 0.5, 6]
            }),
            color: [1.0, 0.3, 1.0]
        });

        sceneModel.createObject({
            id: "purpleTableTop",
            meshIds: ["purpleTableTopMesh"]
        });

        sceneModel.build().then(() => {

            demoHelper.finished();

        }).catch((e) => {
            demoHelper.log(`Error building SceneModel: ${e}`);
            throw e;
        });
    });
