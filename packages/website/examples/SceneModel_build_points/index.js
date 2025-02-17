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

const demoHelper = new DemoHelper({
    viewer
});

demoHelper
    .init()
    .then(() => {

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

        // Within the Scene, create a SceneModel to hold geometry and materials for our model

        const sceneModel = scene.createModel({
            id: "demoModel"
        });

        if (sceneModel instanceof xeokit.core.SDKError) {
            demoHelper.logError(`Error creating SceneModel: ${sceneModel.message}`);
        } else {

            sceneModel.createGeometry({
                id: "demoBoxGeometry",
                primitive: xeokit.constants.PointsPrimitive,
                positions: [
                    -1, -1, -1,
                    -1, -1, 1,
                    -1, 1, -1,
                    -1, 1, 1,
                    1, -1, -1,
                    1, -1, 1,
                    1, 1, -1,
                    1, 1, 1
                ]
            });

            sceneModel.createMesh({
                id: "demoMesh",
                geometryId: "demoGeometry",
                position: [-4, -6, -4],
                scale: [1, 1, 1],
                rotation: [0, 0, 0],
                color: [1, 1, 1]
            });

            sceneModel.createObject({
                id: "demoObject",
                meshIds: ["demoMesh"]
            });

            sceneModel.build().then(() => {

                demoHelper.finished();

            }).catch((e) => {
                demoHelper.logError(`Error building SceneModel: ${e}`);
                throw e;
            });
        }
    });
