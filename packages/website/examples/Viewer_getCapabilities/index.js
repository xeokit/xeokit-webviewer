// Import xeokit SDK via the JavaScript bundle that we've built for these examples

import * as xeokit from "../../js/xeokit-demo-bundle.js";
import {DemoHelper} from "../../js/DemoHelper.js";

// Create a Scene to hold geometry and materials for our model

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

demoHelper.init()
    .then(() => {

        const capabilities = viewer.capabilities;

        demoHelper.log(`viewer.capabilities.headless = ${capabilities.headless}\n
            viewer.capabilities.maxViews = ${capabilities.maxViews}\n
            viewer.capabilities.dxtSupported = ${capabilities.dxtSupported}\n
            viewer.capabilities.etc1Supported = ${capabilities.etc1Supported}\n
            viewer.capabilities.etc2Supported = ${capabilities.etc2Supported}\n
            viewer.capabilities.bptcSupported = ${capabilities.bptcSupported}\n
            viewer.capabilities.astcSupported = ${capabilities.astcSupported}\n
            viewer.capabilities.pvrtcSupported = ${capabilities.pvrtcSupported}`);

        const sceneModel = scene.createModel({
            id: "demoModel"
        });

        // Add a View, which will render an independent view of the Scene within the
// given DOM element.

        const view = viewer.createView({
            id: "demoView",
            elementId: "demoCanvas"
        });

        view.camera.eye = [0, 0, 10]; // Default
        view.camera.look = [0, 0, 0]; // Default
        view.camera.up = [0, 1, 0]; // Default

        // Add a CameraControl to interactively control the Camera with keyboard,
        // mouse and touch input

        new xeokit.cameracontrol.CameraControl(view);

        sceneModel.createGeometry({
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

        sceneModel.createMesh({
            id: "triangleMesh",
            geometryId: "triangleGeometry",
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
