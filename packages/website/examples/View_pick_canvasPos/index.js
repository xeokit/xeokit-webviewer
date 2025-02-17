import {log} from "../../js/logger.js";

import * as xeokit from "../../js/xeokit-demo-bundle.js?foo=";

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

const cameraControl = new xeokit.cameracontrol.CameraControl(view, {});

const sceneModel = scene.createModel({
    id: "demoModel"
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

    sceneModel.build().then(() => {

        view.setObjectsSelected(["purpleTableTop"], true)
        view.objects["purpleTableTop"].edges = true;

    }).catch((e) => {
        log(`Error building SceneModel: ${e}`);
        throw e;
    });
}

let lastViewObject = null;

view.htmlElement.addEventListener("mousemove", (e) => {

    const canvasPos = getCanvasPosFromEvent(e, view.htmlElement, []);

    const pickResult = view.pick({
        pickViewObject: true,
        canvasPos
    });

    if (pickResult && pickResult.viewObject) {

        if (!lastViewObject || pickResult.viewObject.id !== lastViewObject.id) {

            if (lastViewObject) {
                lastViewObject.highlighted = false;
            }

            lastViewObject = pickResult.viewObject;

            pickResult.viewObject.highlighted = true;
        }

    } else {

        if (lastViewObject) {
            lastViewObject.highlighted = false;
            lastViewObject = null;
        }
    }
});

function getCanvasPosFromEvent(event, htmlElement, canvasPos) {
    // if (!event) {
    //     event = window.event;
    canvasPos[0] = event.x;
    canvasPos[1] = event.y;
    // } else {
    //     const { left, top } = htmlElement.getBoundingClientRect();
    //     canvasPos[0] = event.clientX - left;
    //     canvasPos[1] = event.clientY - top;
    // }
    return canvasPos;
}
