// Import xeokit SDK from the JavaScript bundle that we've built for these examples

import * as xeokit from "../../js/xeokit-demo-bundle.js";

// Create a Viewer with a Scene and a WebGLRenderer

const scene = new xeokit.scene.Scene();

const renderer = new xeokit.webglrenderer.WebGLRenderer({});

const viewer = new xeokit.viewer.Viewer({
    id: "demoViewer",
    scene,
    renderer
});

// Create View 1 - perspective projection, looking at the model from the side.
// Configure the View to not automatically create ViewLayers on-demand.
// Create a ViewLayer in the View for the model.

{
    const view = viewer.createView({
        id: "demoView1",
        elementId: "demoCanvas1",
        autoLayers: false
    });

    view.camera.projectionType = xeokit.constants.PerspectiveProjectionType;
    view.camera.eye = [1841982.9384371885, 10.031355126263318, -5173286.744630201];
    view.camera.look = [1842009.4968455553, 9.685518291306686, -5173295.851503017];
    view.camera.up = [0.011650847910481935, 0.9999241456889114, -0.003995073374452514];
    view.camera.orbitPitch(20);

    new xeokit.cameracontrol.CameraControl(view, {});

    view.createLayer({
        id: "viewLayer1"
    });
}

// Create View 2  - orthographic, looking at the model from above.
// Configure the View to not automatically create ViewLayers on-demand.
// Create a ViewLayer in the View for the grid.

{
    const view = viewer.createView({
        id: "demoView2",
        elementId: "demoCanvas2",
        autoLayers: false
    });

    view.camera.eye = [1841982.9384371885, 10.031355126263318, -5173286.744630201];
    view.camera.look = [1842009.4968455553, 9.685518291306686, -5173295.851503017];
    view.camera.up = [0.011650847910481935, 0.9999241456889114, -0.003995073374452514];
    view.camera.projectionType = xeokit.constants.OrthoProjectionType;
    view.camera.orthoProjection.scale = 40;

    new xeokit.cameracontrol.CameraControl(view, {});

    view.createLayer({
        id: "viewLayer1"
    });
}


// Create View 3 - perspective projection, looking at the model from the side.
// Configure the View to not automatically create ViewLayers on-demand.
// Create a ViewLayer for the model.

{
    const view = viewer.createView({
        id: "demoView3",
        elementId: "demoCanvas3",
        autoLayers: false
    });

    view.camera.eye = [1394.38, 3.78, -247.05];
    view.camera.look = [1391.46, 0.89, -244.24];
    view.camera.up = [-0.41, 0.81, 0.40];
    view.camera.zoom(-20)

    new xeokit.cameracontrol.CameraControl(view, {});

    view.createLayer({
        id: "viewLayer2"
    });
}


// Create a SceneModel containing a simple house model. This SceneModel will appear in ViewLayer "viewLayer1".

fetch("../../models/MAP/ifc2gltf2xgf/model.xgf").then(response => {
    response.arrayBuffer().then(fileData => {
        const sceneModel = scene.createModel({
            id: "demoModel",
            layerId: "viewLayer1"
        });
        xeokit.xgf.loadXGF({
            fileData,
            sceneModel
        });
        sceneModel.build();
    });
});


// Create another SceneModel, containing a different house model. This SceneModel will appear in ViewLayer "viewLayer2".

fetch("../../models/HousePlan/gltf/model.glb").then(response => {
    response.arrayBuffer().then(fileData => {
        const sceneModel = scene.createModel({
            id: "demoModel2",
            layerId: "viewLayer2"
        });
        xeokit.gltf.loadGLTF({
            fileData,
            sceneModel
        }).then(() => {
            sceneModel.build();
        });
    });
});
