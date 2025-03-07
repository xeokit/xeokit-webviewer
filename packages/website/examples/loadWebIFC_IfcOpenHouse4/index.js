// Import the SDK from a bundle built for these examples

import * as xeokit from "../../js/xeokit-demo-bundle.js";

import * as WebIFC from "https://cdn.jsdelivr.net/npm/web-ifc@0.0.51/web-ifc-api.js";

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

// Create a DataModel to hold semantic data for our model

const dataModel = data.createModel({
    id: "demoModel"
});

// Ignore the DemoHelper

const demoHelper = new DemoHelper({
    viewer,
    data
});

demoHelper.init()
    .then(() => {

        // Instantiate, configure and initialize the WebIFC JavaScript API.

        const ifcAPI = new WebIFC.IfcAPI();

        ifcAPI.SetWasmPath("https://cdn.jsdelivr.net/npm/web-ifc@0.0.51/");

        ifcAPI.Init().then(() => {

            // Use loadWebIFC with the WebIFC API to load the IFC model into our SceneModel and DataModel.

            fetch("../../models/IfcOpenHouse4/ifc/model.ifc").then(response => {

                response.arrayBuffer().then(fileData => {

                    xeokit.webifc.loadWebIFC({
                        ifcAPI,
                        fileData,
                        sceneModel,
                        dataModel
                    }).then(() => {

                        // Build the SceneModel and DataModel.
                        // The Scene and SceneModel will now contain a SceneObject for each displayable object in our model.
                        // The Data and DataModel will contain a DataObject for each IFC element in the model. Each SceneObject
                        // will have a corresponding DataObject with the same ID, to attach semantic meaning.
                        // The View will contain a ViewObject corresponding to each SceneObject, through which the
                        // appearance of the object can be controlled in the View.

                        dataModel.build();
                        sceneModel.build();

                        // Using the searchObjects function, query the Data for all the
                        // IfcMember elements within a given IfcBuildingStorey.

                        const resultObjectIds = [];

                        const result = xeokit.data.searchObjects(data, {
                            startObjectId: "38aOKO8_DDkBd1FHm_lVXz",
                            includeObjects: [xeokit.ifctypes.IfcMember],
                            includeRelated: [xeokit.ifctypes.IfcRelAggregates],
                            resultObjectIds
                        });

                        // Check if the query was valid.

                        if (typeof result === xeokit.core.SDKError) {
                            console.error(result);
                            return;
                        }

                        // If the query succeeded, go ahead and mark whatever
                        // objects we found as selected. In this case, it will set the window
                        // frames as selected in the View.

                        view.setObjectsSelected(resultObjectIds, true);

                        demoHelper.finished();
                    });
                });
            });
        });
    });
