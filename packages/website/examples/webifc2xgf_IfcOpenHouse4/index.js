// Import the SDK from a bundle built for these examples

import * as xeokit from "../../js/xeokit-demo-bundle.js";

import {DemoHelper} from "../../js/DemoHelper.js";

// Create a Scene to hold geometry and materials

const scene = new xeokit.scene.Scene();

// Create a Data to hold semantic data

const data = new xeokit.data.Data();

// Create a WebGLRenderer to use the browser's WebGL graphics API for rendering

const renderer = new xeokit.webglrenderer.WebGLRenderer({});

// Create a Viewer that will use the WebGLRenderer to draw the Scene

const viewer = new xeokit.viewer.Viewer({
    id: "demoViewer",
    scene,
    renderer
});

// Give the Viewer a single View to render the Scene in our HTML canvas element

const view = viewer.createView({
    id: "demoView",
    elementId: "demoCanvas"
});

// Arrange the View's Camera

view.camera.eye = [-6.01, 4.85, 9.11];
view.camera.look = [3.93, -2.65, -12.51];
view.camera.up = [0.12, 0.95, -0.27];

// Add a CameraControl to interactively control the View's Camera with keyboard,
// mouse and touch input

new xeokit.cameracontrol.CameraControl(view, {});

// Create a SceneModel to hold our model's geometry and materials

const sceneModel = scene.createModel({
    id: "demoModel"
});

// Ignore the DemHelper

const demoHelper = new DemoHelper({
    viewer,
    data
});

demoHelper.init()
    .then(() => {

        // Create a DataModel to hold semantic data for our model

        const dataModel = data.createModel({
            id: "demoModel"
        });

        // Load DataModelParams into the DataModel.

        fetch(`../../models/IfcOpenHouse4/webifc2xgf/model.json`)
            .then(response => {
                response
                    .json()
                    .then(dataModelParams => {

                        dataModel.fromParams(dataModelParams);

                        // Use loadXKT to load the XKT file into the SceneModel.


                        fetch(`../../models/IfcOpenHouse4/webifc2xgf/model.xgf`)
                            .then(response => {
                                response
                                    .arrayBuffer()
                                    .then(fileData => {

                                        xeokit.xgf.loadXGF({
                                            fileData,
                                            sceneModel

                                        }).then(() => { // XGF and JSON files loaded

                                            // Build the SceneModel and DataModel.
                                            // The IFC model now appears in our Viewer.

                                            sceneModel.build();
                                            dataModel.build();

                                            demoHelper.finished();

                                        }).catch(e => {
                                            console.error(e);
                                        });
                                    });
                            });
                    });
            });
    });

window.view = view;
