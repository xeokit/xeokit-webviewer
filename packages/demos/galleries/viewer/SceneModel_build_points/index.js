import * as xeokit from "./../../../js/xeokit-demo-bundle.js";
import {DemoHelper} from "../../../js/DemoHelper.js";

const scene = new xeokit.scene.Scene();

const renderer = new xeokit.webglrenderer.WebGLRenderer({});

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

        new xeokit.cameracontrol.CameraControl(view);

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
