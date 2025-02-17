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


// Create View 1
//
// Has a green directional light


{
    const view = viewer.createView({
        id: "demoView1",
        elementId: "demoCanvas1"
    });

    view.camera.projectionType = xeokit.constants.PerspectiveProjectionType;
    view.camera.eye = [15, 0, 15];
    view.camera.look = [0, 0, 0];
    view.camera.up = [0, 1, 0];
    view.camera.orbitPitch(20);

    new xeokit.cameracontrol.CameraControl(view, {});

    view.clearLights();

    new xeokit.viewer.AmbientLight(view, {
        color: [1.0, 1.0, 1.0],
        intensity: 0.8
    });

    new xeokit.viewer.DirLight(view, {
        dir: [-0.8, 1.0, -0.5],
        color: [0, 1, 0],
        intensity: 1.0,
        space: "world"
    });
}


// Create View 2
//
// Has a blue directional light


{
    const view = viewer.createView({
        id: "demoView2",
        elementId: "demoCanvas2"
    });

    view.camera.projectionType = xeokit.constants.PerspectiveProjectionType;
    view.camera.eye = [15, 0, 15];
    view.camera.look = [0, 0, 0];
    view.camera.up = [0, 1, 0];
    view.camera.orbitPitch(20);

    new xeokit.cameracontrol.CameraControl(view, {});

    view.clearLights();

    new xeokit.viewer.AmbientLight(view, {
        color: [1.0, 1.0, 1.0],
        intensity: 0.8
    });

    new xeokit.viewer.DirLight(view, {
        dir: [-0.8, 1.0, -0.5],
        color: [0, 0, 1],
        intensity: 1.0,
        space: "world"
    });
}


// Create View 3
//
//  Has a red directional light


{
    const view = viewer.createView({
        id: "demoView3",
        elementId: "demoCanvas3"
    });

    view.camera.projectionType = xeokit.constants.PerspectiveProjectionType;
    view.camera.eye = [15, 0, 15];
    view.camera.look = [0, 0, 0];
    view.camera.up = [0, 1, 0];
    view.camera.orbitPitch(20);

    new xeokit.cameracontrol.CameraControl(view, {});

    view.clearLights();

    new xeokit.viewer.AmbientLight(view, {
        color: [1.0, 1.0, 1.0],
        intensity: 0.8
    });

    new xeokit.viewer.DirLight(view, {
        dir: [-0.8, 1.0, -0.5],
        color: [1, 0, 0],
        intensity: 1.0,
        space: "world"
    });

}


// Create a SceneModel containing a simple house model


fetch("../../models/models/IfcOpenHouse2x3/ifc2gltf/model.glb").then(response => {
    response.arrayBuffer().then(fileData => {
        xeokit.gltf.loadGLTF({fileData, sceneModel}).then(() => {
            sceneModel.build();
        });
    });
});
