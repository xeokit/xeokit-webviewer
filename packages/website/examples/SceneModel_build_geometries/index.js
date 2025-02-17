
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

demoHelper
    .init()
    .then(() => {

        // Create a single View that renders to a canvas

        const view = viewer.createView({
            id: "demoView",
            elementId: "demoCanvas"
        });

        // Position the View's Camera

        view.camera.eye = [10, 0, 35];
        view.camera.look = [10, 0, 0];
        view.camera.up = [0, 1, 0];

        view.camera.orbitPitch(20);

        // Add a CameraControl to interactively control the Camera with keyboard,
        // mouse and touch input

        new xeokit.cameracontrol.CameraControl(view);

        // Within the Scene, create a SceneModel to hold geometry and materials for our model

        const sceneModel = scene.createModel({
            id: "demoModel"
        });

        if (sceneModel instanceof xeokit.core.SDKError) {
            demoHelper.logError(`Error creating SceneModel: ${sceneModel.message}`);
        } else {

            // Box triangles

            const box = xeokit.procgen.buildBoxGeometry({
                xSize: 1,
                ySize: 1,
                zSize: 1
            });

            sceneModel.createGeometry({
                id: "boxGeometry",
                primitive: xeokit.constants.TrianglesPrimitive,
                positions: box.positions,
                indices: box.indices
            });

            sceneModel.createMesh({
                id: "boxMesh",
                geometryId: "boxGeometry",
                matrix: xeokit.scene.buildMat4({
                    position: [0, 0, 0],
                    color: [1, 0, 0]
                })
            });

            // Box lines

            const boxLines = xeokit.procgen.buildBoxLinesGeometry({
                xSize: 1,
                ySize: 1,
                zSize: 1
            });

            sceneModel.createGeometry({
                id: "boxLinesGeometry",
                primitive: xeokit.constants.LinesPrimitive,
                positions: boxLines.positions,
                indices: boxLines.indices
            });

            sceneModel.createMesh({
                id: "boxLinesMesh",
                geometryId: "boxLinesGeometry",
                matrix: xeokit.scene.buildMat4({
                    position: [3, 0, 0]
                }),
                color: [0, 0, 1]
            });

            // Sphere triangles

            const sphere = xeokit.procgen.buildSphereGeometry({
                center: [0, 0, 0],
                radius: 1.5,
                heightSegments: 60,
                widthSegments: 60
            });

            sceneModel.createGeometry({
                id: "sphereGeometry",
                primitive: xeokit.constants.TrianglesPrimitive,
                positions: sphere.positions,
                normals: sphere.normals,
                indices: sphere.indices
            });

            sceneModel.createMesh({
                id: "sphereMesh",
                geometryId: "sphereGeometry",
                matrix: xeokit.scene.buildMat4({
                    position: [7, 0, 0]
                }),
                color: [0, 0.5, 1]
            });

            // Torus triangles

            const torus = xeokit.procgen.buildTorusGeometry({
                center: [0, 0, 0],
                radius: 1.5,
                tube: 0.5,
                radialSegments: 32,
                tubeSegments: 24,
                arc: Math.PI * 2.0
            });

            sceneModel.createGeometry({
                id: "torusGeometry",
                primitive: xeokit.constants.TrianglesPrimitive,
                positions: torus.positions,
                normals: torus.normals,
                indices: torus.indices
            });

            sceneModel.createMesh({
                id: "torusMesh",
                geometryId: "torusGeometry",
                matrix: xeokit.scene.buildMat4({
                    position: [11, 0, 0]
                }),
                color: [0.7, 0, 1]
            });

            // Cylinder triangles

            const cylinder = xeokit.procgen.buildCylinderGeometry({
                center: [0, 0, 0],
                radiusTop: 1.0,
                radiusBottom: 2.0,
                height: 2.5,
                radialSegments: 20,
                heightSegments: 1,
                openEnded: false
            });

            sceneModel.createGeometry({
                id: "cylinderGeometry",
                primitive: xeokit.constants.TrianglesPrimitive,
                positions: cylinder.positions,
                normals: cylinder.normals,
                indices: cylinder.indices
            });

            sceneModel.createMesh({
                id: "cylinderMesh",
                geometryId: "cylinderGeometry",
                matrix: xeokit.scene.buildMat4({
                    position: [16, 0, 0]
                }),
                color: [1, .6, 0]
            });

            // Grid lines

            const grid = xeokit.procgen.buildGridGeometry({
                size: 10,
                divisions: 10
            });

            sceneModel.createGeometry({
                id: "gridGeometry",
                primitive: xeokit.constants.LinesPrimitive,
                positions: grid.positions,
                indices: grid.indices
            });

            sceneModel.createMesh({
                id: "gridMesh",
                geometryId: "gridGeometry",
                matrix: xeokit.scene.buildMat4({
                    position: [25, 0, 0]
                }),
                color: [0, 1, 0]
            });

            // Text

            const text = xeokit.procgen.buildVectorTextGeometry({
                text: "An assortment of geometry\nprogrammatically generated\nwithin a SceneModel\nusing instanced geometry",
            });

            sceneModel.createGeometry({
                id: "textGeometry",
                primitive: xeokit.constants.LinesPrimitive,
                positions: text.positions,
                indices: text.indices
            });

            sceneModel.createMesh({
                id: "textMesh",
                geometryId: "textGeometry",
                matrix: xeokit.scene.buildMat4({
                    position: [0, 7.5, 0]
                }),
                color: [0, 1, 0]
            });

            // Points

            const positions = [];
            const colors = [];

            const map = {};

            for (let i = 0; i < 2000;) {

                const x = Math.random();
                const y = Math.random();
                const z = Math.random();

                const hash = "" + x + "." + y + "." + z;
                if (map[hash]) {
                    continue;
                }

                map[hash] = true;

                positions.push(x);
                positions.push(y);
                positions.push(z);

                colors.push(Math.random());
                colors.push(Math.random());
                colors.push(Math.random());
                colors.push(Math.random());

                i++;
            }

            sceneModel.createGeometry({
                id: "pointsGeometry",
                primitive: xeokit.constants.PointsPrimitive,
                positions,
                colors
            });

            sceneModel.createMesh({
                id: "pointsMesh",
                geometryId: "pointsGeometry",
                matrix: xeokit.scene.buildMat4({
                    position: [-7, 0, 0],
                    scale: [4, 4, 4],
                    rotation: [0, 0, 0]
                }),
            });

            sceneModel.createObject({
                id: "geometries",
                meshIds: ["boxMesh", "boxLinesMesh", "sphereMesh", "torusMesh", "cylinderMesh", "gridMesh", "textMesh", "pointsMesh"]
            });
        }

        sceneModel.build();

        demoHelper.finished();
    });
