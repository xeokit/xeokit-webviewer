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
    elementId: "info-container",
    viewer
});

demoHelper.init()
    .then(() => {

        // Give the Viewer a single View to render the Scene in our HTML canvas element

        const view = viewer.createView({
            id: "demoView",
            elementId: "demoCanvas"
        });

        // Position the View's Camera

        view.camera.eye = [0, -5, 20];
        view.camera.look = [0, -5, 0];
        view.camera.up = [0, 1, 0];

        // Create a "non-retained" SceneModel.
        // Our SceneModel is configured with retained: false, when we build our
        // SceneModel, the SceneGeometry, SceneMesh and SceneObjects we created
        // within it will be cleared from it to save browser memory.
        // The Viewer will then still contain ViewObjects for the SceneModel until we
        // call SceneModel.destroy().

        const sceneModel = scene.createModel({
            id: "demoModel",
            retained: false // <<------------- Geometry, meshes and objects are not retained
        });

        if (sceneModel instanceof xeokit.core.SDKError) {
            log(`Error creating SceneModel: ${sceneModel.message}`);
        } else {

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
                position: [-4, -6, -4],
                scale: [1, 3, 1],
                rotation: [0, 0, 0],
                color: [1, 0.3, 0.3]
            });

            sceneModel.createObject({
                id: "redLeg",
                meshIds: ["redLegMesh"]
            });

            sceneModel.createMesh({
                id: "greenLegMesh",
                geometryId: "demoBoxGeometry",
                position: [4, -6, -4],
                scale: [1, 3, 1],
                rotation: [0, 0, 0],
                color: [0.3, 1.0, 0.3]
            });

            sceneModel.createObject({
                id: "greenLeg",
                meshIds: ["greenLegMesh"]
            });

            sceneModel.createMesh({
                id: "blueLegMesh",
                geometryId: "demoBoxGeometry",
                position: [4, -6, 4],
                scale: [1, 3, 1],
                rotation: [0, 0, 0],
                color: [0.3, 0.3, 1.0]
            });

            sceneModel.createObject({
                id: "blueLeg",
                meshIds: ["blueLegMesh"]
            });

            sceneModel.createMesh({
                id: "yellowLegMesh",
                geometryId: "demoBoxGeometry",
                position: [-4, -6, 4],
                scale: [1, 3, 1],
                rotation: [0, 0, 0],
                color: [1.0, 1.0, 0.0]
            });

            sceneModel.createObject({
                id: "yellowLeg",
                meshIds: ["yellowLegMesh"]
            });

            sceneModel.createMesh({
                id: "purpleTableTopMesh",
                geometryId: "demoBoxGeometry",
                position: [0, -3, 0],
                scale: [6, 0.5, 6],
                rotation: [0, 0, 0],
                color: [1.0, 0.3, 1.0]
            });

            sceneModel.createObject({
                id: "purpleTableTop",
                meshIds: ["purpleTableTopMesh"]
            });

            // Build the SceneModel

            sceneModel.build().then(() => {

                // Since our SceneModel was configured with retained: false, when we build our
                // SceneModel, the SceneGeometry, SceneMesh and SceneObjects we created
                // within it are now cleared from it.The Viewer will still contain ViewObjects for the SceneObjects until we
                // call Scene.destroy().

                view.setObjectsSelected(["purpleTableTop"], true)

            }).catch((e) => {
                log(`Error building SceneModel: ${e}`);
                throw e;
            });
        }


        viewer.onTick.subscribe(() => {
            view.camera.orbitYaw(0.5);
            view.camera.orbitPitch(0.1);
        });

        // window.viewer = viewer;
        // window.scene = scene;

    });
