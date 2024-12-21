import * as xeokit from "../../js/xeokit-demo-bundle.js";
import {DemoHelper} from "../../js/DemoHelper.js";

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
                primitive: xeokit.constants.LinesPrimitive,
                positions: [
                    -1, -1, -1,
                    -1, -1, 1,
                    -1, 1, -1,
                    -1, 1, 1,
                    1, -1, -1,
                    1, -1, 1,
                    1, 1, -1,
                    1, 1, 1
                ],
                indices: [
                    0, 1,
                    1, 3,
                    3, 2,
                    2, 0,
                    4, 5,
                    5, 7,
                    7, 6,
                    6, 4,
                    0, 4,
                    1, 5,
                    2, 6,
                    3, 7
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

                demoHelper.finished();

            }).catch((e) => {
                demoHelper.logError(`Error building SceneModel: ${e}`);
                throw e;
            });
        }

    });
