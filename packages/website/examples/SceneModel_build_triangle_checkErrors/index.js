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

demoHelper.init()
    .then(() => {

        const view = viewer.createView({
            id: "demoView",
            elementId: "demoCanvas"
        });

        if (view instanceof xeokit.core.SDKError) {
            demoHelper.log(`Error creating View: ${view.message}`);
        }

        view.camera.eye = [0, 0, 10]; // Default
        view.camera.look = [0, 0, 0]; // Default
        view.camera.up = [0, 1, 0]; // Default

        view.camera.projectionType = xeokit.constants.PerspectiveProjectionType; // Default
        view.camera.perspectiveProjection.fov = 60; // Default
        view.camera.perspectiveProjection.near = 0.1; // Default
        view.camera.perspectiveProjection.far = 10000; // Default

        view.backfaces = true; // FIXME

        // Add a CameraControl to interactively control the Camera with keyboard,
        // mouse and touch input

        new xeokit.cameracontrol.CameraControl(view);

        // Within the Scene, create a SceneModel to hold geometry and materials for our model

        const sceneModel = scene.createModel({
            id: "demoModel"
        });

        if (sceneModel instanceof xeokit.core.SDKError) {
            demoHelper.log(`Error creating SceneModel: ${sceneModel.message}`);

        } else {

            const geometry = sceneModel.createGeometry({
                id: "triangleGeometry",
                primitive: xeokit.constants.TrianglesPrimitive,
                positions: [
                    0.0, 1.5, 0.0,
                    -1.5, -1.5, 0.0,
                    1.5, -1.5, 0.0,
                ],
                indices: [
                    0, 1, 2
                ]
            });

            if (geometry instanceof xeokit.core.SDKError) {
                demoHelper.log(`Error creating Geometry: ${geometry.message}`);
            }

            const triangleMesh = sceneModel.createMesh({
                id: "triangleMesh",
                geometryId: "triangleGeometry",
                matrix: [ // Default
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1
                ],
                color: [1, 1.0, 1.0] // Default
            });

            if (triangleMesh instanceof xeokit.core.SDKError) {
                demoHelper.log(`Error creating SceneMesh: ${triangleMesh.message}`);
            }

            const triangleSceneObject = sceneModel.createObject({
                id: "triangleObject",
                meshIds: ["triangleMesh"]
            });

            if (triangleSceneObject instanceof xeokit.core.SDKError) {
                demoHelper.log(`Error creating SceneObject: ${triangleSceneObject.message}`);
            }

            sceneModel.onBuilt.subscribe((theSceneModel) => {
                // demoHelper.log(`SceneModel built`);
            });

            sceneModel.onDestroyed.subscribe((theSceneModel) => {
                // demoHelper.log(`SceneModel destroyed`);
            });

            sceneModel.build().then(() => {

                // Now the SceneModel appears in the View

                demoHelper.finished();

            }).catch((sdkError) => {
                demoHelper.log(`Error building SceneModel: ${sdkError.message}`);
                throw e;
            });
        }
    });
