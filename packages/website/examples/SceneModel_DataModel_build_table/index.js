import * as xeokit from "../../js/xeokit-demo-bundle.js";

import {DemoHelper} from "../../js/DemoHelper.js";

// Create a Scene to hold geometry and materials

const scene = new xeokit.scene.Scene();

// Create a Data to hold semantic data

const data = new xeokit.data.Data();

// Create a Viewer that will use a WebGLRenderer to draw the Scene

const viewer = new xeokit.viewer.Viewer({
    id: "demoViewer",
    scene,
    renderer: new xeokit.webglrenderer.WebGLRenderer({})
});

// Give the Viewer a single View to render the Scene in our HTML canvas element

const view = viewer.createView({
    id: "demoView",
    elementId: "demoCanvas"
});

// Position the View's Camera

view.camera.eye = [0, -5, 20];
view.camera.look = [0, -5, 0];
view.camera.up = [0, 1, 0];

// Add a CameraControl to interactively control the View's Camera with keyboard,
// mouse and touch input

new xeokit.cameracontrol.CameraControl(view);

// Ignore this DemoHelper

const demoHelper = new DemoHelper({
    elementId: "info-container",
    viewer,
    data
});

demoHelper.init()
    .then(() => {

        // Create a DataModel to hold semantic information about our table model

        const dataModel = data.createModel({
            id: "demoModel"
        });

        // Create some PropertySets in our DataModel

        if (dataModel instanceof xeokit.core.SDKError) {
            log(`Error creating DataModel: ${dataModel.message}`);
        } else {
            const tablePropertySet = dataModel.createPropertySet({ // PropertySet | SDKError
                id: "tablePropertySet",
                name: "Table properties",
                type: "",
                properties: [ // Property[]
                    {
                        name: "Weight",
                        value: 5,
                        type: "",
                        valueType: "",
                        description: "Weight of the thing"
                    },
                    {
                        name: "Height",
                        value: 12,
                        type: "",
                        valueType: "",
                        description: "Height of the thing"
                    }
                ]
            });

            if (tablePropertySet instanceof xeokit.core.SDKError) {
                console.error(tablePropertySet.message);
            }

            const tableTopPropertySet = dataModel.createPropertySet({ // PropertySet | SDKError
                id: "tableTopPropertySet",
                name: "Table Top properties",
                type: "",
                properties: [ // Property[]
                    {
                        name: "Weight",
                        value: 10,
                        type: "",
                        valueType: "",
                        description: "Weight of the thing"
                    },
                    {
                        name: "Height",
                        value: 3,
                        type: "",
                        valueType: "",
                        description: "Height of the thing"
                    }
                ]
            });

            if (tableTopPropertySet instanceof xeokit.core.SDKError) {
                console.error(tableTopPropertySet.message);
            }

            const legPropertySet = dataModel.createPropertySet({
                id: "tableLegPropertySet",
                name: "Table leg properties",
                type: "",
                properties: [
                    {
                        name: "Weight",
                        value: 5,
                        type: "",
                        valueType: "",
                        description: "Weight of the thing"
                    },
                    {
                        name: "Height",
                        value: 12,
                        type: "",
                        valueType: "",
                        description: "Height of the thing"
                    }
                ]
            });

            if (legPropertySet instanceof xeokit.core.SDKError) {
                console.error(legPropertySet.message);
            }

            // Create DataObject instances in our SceneModel. One DataObject represents the
            // entire table assembly, while five other DataObjects represent the tabel top and legs.

            const myTableObject = dataModel.createObject({ // DataObject | SDKError
                id: "table",
                type: xeokit.basictypes.BasicEntity,
                name: "Table",
                propertySetIds: ["tablePropertySet"]
            });

            if (myTableObject instanceof xeokit.core.SDKError) {
                console.error(myTableObject.message);
            }

            dataModel.createObject({
                id: "redLeg",
                name: "Red table Leg",
                type: xeokit.basictypes.BasicEntity,
                propertySetIds: ["tableLegPropertySet"]
            });

            dataModel.createObject({
                id: "greenLeg",
                name: "Green table leg",
                type: xeokit.basictypes.BasicEntity,
                propertySetIds: ["tableLegPropertySet"]
            });

            dataModel.createObject({
                id: "blueLeg",
                name: "Blue table leg",
                type: xeokit.basictypes.BasicEntity,
                propertySetIds: ["tableLegPropertySet"]
            });

            dataModel.createObject({
                id: "yellowLeg",
                name: "Yellow table leg",
                type: xeokit.basictypes.BasicEntity,
                propertySetIds: ["tableLegPropertySet"]
            });

            dataModel.createObject({
                id: "tableTop",
                name: "Purple table top",
                type: xeokit.basictypes.BasicEntity,
                propertySetIds: ["tableTopPropertySet"]
            });

            // Create Relationships to connect the DataObjects together
            // so that the DataObject that represents the table assembly aggregates
            // the other five DataObjects.

            const myRelationship = dataModel.createRelationship({
                type: xeokit.basictypes.BasicAggregation,
                relatingObjectId: "table",
                relatedObjectId: "tableTop"
            });

            if (myRelationship instanceof xeokit.core.SDKError) {
                console.error(myRelationship.message);
            }

            dataModel.createRelationship({
                type: xeokit.basictypes.BasicAggregation,
                relatingObjectId: "tableTop",
                relatedObjectId: "redLeg"
            });

            dataModel.createRelationship({
                type: xeokit.basictypes.BasicAggregation,
                relatingObjectId: "tableTop",
                relatedObjectId: "greenLeg"
            });

            dataModel.createRelationship({
                type: xeokit.basictypes.BasicAggregation,
                relatingObjectId: "tableTop",
                relatedObjectId: "blueLeg"
            });

            dataModel.createRelationship({
                type: xeokit.basictypes.BasicAggregation,
                relatingObjectId: "tableTop",
                relatedObjectId: "yellowLeg"
            });

            // Build the DataModel, making it ready for use

            const buildResult = dataModel.build(); // void | SDKError

            if (buildResult instanceof xeokit.core.SDKError) {
                console.error(buildResult.message);
            } else {
                // DataModel built OK
            }
        }

        // Create a SceneModel to hold geometry and materials

        const sceneModel = scene.createModel({
            id: "demoModel"
        });

        if (sceneModel instanceof xeokit.core.SDKError) {
            log(`Error creating SceneModel: ${sceneModel.message}`);
        } else {

            // Add a SceneGeometry that defines a box shape

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

            // For the tabletop and each of the legs, create a SceneObject
            // with a single SceneMesh that instances the SceneGeometry. A SceneMesh can be referenced by
            // one SceneObject only, but a SceneGeometry can be referenced by many SceneMeshes.

            sceneModel.createMesh({
                id: "redLegMesh",
                geometryId: "demoBoxGeometry",
                matrix: xeokit.scene.buildMat4({
                    position: [-4, -6, -4],
                    scale: [1, 3, 1]
                }),
                color: [1, 0.3, 0.3]
            });

            sceneModel.createObject({
                id: "redLeg",
                meshIds: ["redLegMesh"]
            });

            sceneModel.createMesh({
                id: "greenLegMesh",
                geometryId: "demoBoxGeometry",
                matrix: xeokit.scene.buildMat4({
                    position: [4, -6, -4],
                    scale: [1, 3, 1]
                }),
                color: [0.3, 1.0, 0.3]
            });

            sceneModel.createObject({
                id: "greenLeg",
                meshIds: ["greenLegMesh"]
            });

            sceneModel.createMesh({
                id: "blueLegMesh",
                geometryId: "demoBoxGeometry",
                matrix: xeokit.scene.buildMat4({
                    position: [4, -6, 4],
                    scale: [1, 3, 1]
                }),
                color: [0.3, 0.3, 1.0]
            });

            sceneModel.createObject({
                id: "blueLeg",
                meshIds: ["blueLegMesh"]
            });

            sceneModel.createMesh({
                id: "yellowLegMesh",
                geometryId: "demoBoxGeometry",
                matrix: xeokit.scene.buildMat4({
                    position: [-4, -6, 4],
                    scale: [1, 3, 1]
                }),
                color: [1.0, 1.0, 0.0]
            });

            sceneModel.createObject({
                id: "yellowLeg",
                meshIds: ["yellowLegMesh"]
            });

            sceneModel.createMesh({
                id: "purpleTableTopMesh",
                geometryId: "demoBoxGeometry",
                matrix: xeokit.scene.buildMat4({
                    position: [0, -3, 0],
                    scale: [6, 0.5, 6]
                }),
                color: [1.0, 0.3, 1.0]
            });

            sceneModel.createObject({
                id: "purpleTableTop",
                meshIds: ["purpleTableTopMesh"]
            });

            // Build the SceneModel. The View will now contain a ViewObject for each SceneObject in the SceneModel.

            sceneModel.build().then(() => {

                demoHelper.finished();

            }).catch((e) => {
                demoHelper.log(`Error building SceneModel: ${e}`);
                throw e;
            });
        }
    });
