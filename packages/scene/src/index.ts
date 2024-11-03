/**
 * [![npm version](https://badge.fury.io/js/%40xeokit%2FscratchModel.svg)](https://badge.fury.io/js/%40xeokit%2FscratchModel)
 * [![](https://data.jsdelivr.com/v1/package/npm/@xeokit/scratchModel/badge)](https://www.jsdelivr.com/package/npm/@xeokit/scratchModel)
 *
 * <img style="padding:20px" src="media://images/xeokit_docmodel_greyscale_icon.png"/>
 *
 * # xeokit Scene Representation
 *
 * ---
 *
 * ***The SDK's buildable, viewable, importable and exportable 3D scene representation***
 *
 * ---
 *
 * # Overview
 *
 * The xeokit SDK facilitates the management of model representations through a scene graph that incorporates the
 * model's objects, geometries, and materials. This scene graph functions seamlessly in both the browser and NodeJS
 * environments, enabling the generation of models, format conversion, and the provision of content for the SDK's
 * model viewer.
 *
 * To elaborate further:
 *
 * * The {@link @xeokit/scene!Scene | Scene} acts as a container for {@link @xeokit/scene!SceneModel | SceneModels}, which, in turn,
 * comprise {@link @xeokit/scene!SceneObject | SceneObjects}, {@link @xeokit/scene!SceneMesh | SceneMeshes}, {@link @xeokit/scene!SceneGeometry | SceneGeometries}, and {@link @xeokit/scene!SceneTexture | SceneTextures}.
 * * SceneTextures undergo compression to [KTX2](https://xeokit.github.io/sdk/docs/pages/GLOSSARY.html#ktx2) via the Basis Universal codec.
 * * SceneGeometry undergoes compression through quantization.
 * * Use a {@link "@xeokit/viewer" | Viewer} to view SceneModels in the browser. A Viewer equipped with a {@link @xeokit/ktx2!KTX2TextureTranscoder | KTX2TextureTranscoder} can view a Scene that has KTX2-compressed textures.
 * * Import SceneModels from a variety of model file formats using importer functions like {@link "@xeokit/gltf" | loadGLTF}, {@link "@xeokit/las" | loadLAS}, {@link "@xeokit/cityjson" | loadCityJSON}, and {@link "@xeokit/xgf" | loadXGF}.
 * * Export SceneModels to the native [XGF](https://xeokit.github.io/sdk/docs/pages/GLOSSARY.html#xgf) format through {@link "@xeokit/xgf" | saveXGF}.
 * * Create SceneModels programmatically using builder methods like {@link @xeokit/scene!Scene.createModel | Scene.createModel},
 * {@link @xeokit/scene!SceneModel.createObject | SceneModel.createObject}, {@link @xeokit/scene!SceneModel.createMesh | SceneModel.createMesh},
 * {@link @xeokit/scene!SceneModel.createGeometry | SceneModel.createGeometry}, and {@link @xeokit/scene!SceneModel.createTexture | SceneModel.createTexture}. Add geometry
 * primitives using mesh generator functions like {@link @xeokit/procgen!buildBoxGeometry | buildBoxGeometry}, {@link @xeokit/procgen!buildSphereGeometry | buildSphereGeometry}, {@link @xeokit/procgen!buildTorusGeometry | buildTorusGeometry}, {@link @xeokit/procgen!buildCylinderGeometry | buildCylinderGeometry}, {@link @xeokit/procgen!buildPlaneGeometry | buildPlaneGeometry} and {@link @xeokit/procgen!buildVectorTextGeometry | buildVectorTextGeometry}.
 *
 * <br>
 *
 * [![](https://mermaid.ink/img/pako:eNqNVEuPmzAQ_ivIp3bFog1xeF270qpSo0qbPVVcHHuauAKMbLNKGuW_17wSQwAVDoZvvnmP54KoYIASRDOi1CsnB0nytGBcAtVcFM6P97RwmqdhODsKBVx6rMElEA1bYyb78nUgyIDIIZTXLGUjYv_HeLpB1wlvjWnLJWf375F67QLUEWzgACIHLfkA1HDSlYQd6AnUgtrkfjZe7FS6pI2vR_StdXh-lHy09mcFJhxbtq94xmyAgdJSWIanytUGO2iRXbGJCjmE7PeLHTAazkwHqMiEtBpSEsr1-Q7kxNT-dP_v2mEx7r1YiqEr0XQYCwrG7GLoHc0KGDTJMk7fRXU4FqDUA0NQmlXK3I4HCeRcKf4JI8FUeP2UzAVXSp5zbWxZkFC8vpTqFajISzOoajuqbvW5ILzpf-sIwAaaUzA3u4Da0wLsAN-H4C29_mwSdFK0StHT87M5Pe8pRdZtHhAbZIbdDvP_2J1gttBcHGamh2HUQ25xe-LbaGDHwzUwj3ut0QQseviwLkD9tirIRTnInHBm1nMzJCnSR8ghRYn5ZPCbVJlOUVpcDZVUWuzOBUWJlhW4qCqZ2SvdQu9BYFwLue02fn24qCQFSi7ohBI_ePFWqxBHgb-J1zhcYxedDbz2cBwGEY7xKorCOPKvLvorhLH64kV-gHHgxziM8AZv4sber0ZYu7z-A6rh2zE?type=png)](https://mermaid.live/edit#pako:eNqNVEuPmzAQ_ivIp3bFog1xeF270qpSo0qbPVVcHHuauAKMbLNKGuW_17wSQwAVDoZvvnmP54KoYIASRDOi1CsnB0nytGBcAtVcFM6P97RwmqdhODsKBVx6rMElEA1bYyb78nUgyIDIIZTXLGUjYv_HeLpB1wlvjWnLJWf375F67QLUEWzgACIHLfkA1HDSlYQd6AnUgtrkfjZe7FS6pI2vR_StdXh-lHy09mcFJhxbtq94xmyAgdJSWIanytUGO2iRXbGJCjmE7PeLHTAazkwHqMiEtBpSEsr1-Q7kxNT-dP_v2mEx7r1YiqEr0XQYCwrG7GLoHc0KGDTJMk7fRXU4FqDUA0NQmlXK3I4HCeRcKf4JI8FUeP2UzAVXSp5zbWxZkFC8vpTqFajISzOoajuqbvW5ILzpf-sIwAaaUzA3u4Da0wLsAN-H4C29_mwSdFK0StHT87M5Pe8pRdZtHhAbZIbdDvP_2J1gttBcHGamh2HUQ25xe-LbaGDHwzUwj3ut0QQseviwLkD9tirIRTnInHBm1nMzJCnSR8ghRYn5ZPCbVJlOUVpcDZVUWuzOBUWJlhW4qCqZ2SvdQu9BYFwLue02fn24qCQFSi7ohBI_ePFWqxBHgb-J1zhcYxedDbz2cBwGEY7xKorCOPKvLvorhLH64kV-gHHgxziM8AZv4sber0ZYu7z-A6rh2zE)
 *
 * <br>
 *
 * ### Notes
 *
 * * SceneTextureSets are collections of textures that are shared among SceneMeshes and are organized into texture atlasses to optimize rendering efficiency on GPUs.
 * * Each SceneMesh can be assigned to only one SceneObject, whereas each SceneGeometry and SceneTextureSet can be allocated to an unlimited number of SceneMeshes.
 *
 * <br>
 *
 * # Installation
 *
 * ````bash
 * npm install @xeokit/scene
 * ````
 *
 * <br>
 *
 * # Usage
 *
 * <br>
 *
 * ## Creating a Scene
 *
 * ````javascript
 * import {Scene} from "@xeokit/scene";
 * import {TrianglesPrimitive, LinearEncoding, LinearFilter, ClampToEdgeWrapping} from "@xeokit/constants";
 *
 * const theScene = new Scene();
 * ````
 *
 * <br>
 *
 * ## Viewing the Scene
 *
 * If we're coding in the browser, we can view our Scene by attaching it to a {@link @xeokit/viewer!Viewer | Viewer}, as
 * shown below. The Viewer will then provide an interactive 3D view of our Scene. As we create and destroy objects,
 * they will appear and disaapear in the view.
 *
 * Our minimal browser Viewer gets a {@link @xeokit/webglrenderer!WebGLRenderer | WebGLRenderer}, to adapt it
 * to use the browser's WebGL graphics API for 3D viewing. Our Viewer also gets a single {@link @xeokit/viewer!View | View}
 * to make it draw to a specified canvas in the page. The View also gets a {@link @xeokit/cameracontrol!CameraControl | CameraControl},
 * so we can interact with it using mouse and touch input.
 *
 * Note that a Scene does not need to be attached to a Viewer. A Scene functions as a stand-alone data structure, and
 * is agnostic of Viewer. In the browser, we typically use Scene with a Viewer. In a NodeJS script, that has no need to draw
 * anything, we would typically use Scene without a Viewer.
 *
 * > *See [@xeokit/viewer](/docs/api/modules/_xeokit_viewer.html)*
 *
 * ````javascript
 *
 * import {Viewer} from "@xeokit/viewer";
 * import {WebGLRenderer} from "@xeokit/webglrenderer";
 * import {CameraControl} from "@xeokit/cameracontrol";
 *
 * const myViewer = new Viewer({
 *     id: "myViewer",
 *     scene,
 *     renderers: new WebGLRenderer({})
 * });
 *
 * const view1 = myViewer.createView({
 *     id: "myView",
 *     elementId: "myView1"
 * });
 *
 * view1.camera.eye = [0,0,-100];
 * view1.camera.look = [0,0,0];
 * view1.camera.up = [0,1,0];
 *
 * const myCameraControl = new CameraControl({
 *      view: view1
 * });
 * ````
 *
 * <br>
 *
 * ## Building a SceneModel
 *
 * In the example below, we'll create a {@link @xeokit/scene!SceneModel | SceneModel} that will model the simple table object
 * shown in the image above. Our SceneModel will contain five
 * {@link @xeokit/scene!SceneObject | SceneObjects}, five {@link @xeokit/scene!SceneMesh | SceneMeshes},
 * one {@link @xeokit/scene!SceneGeometry | SceneGeometry} and one {@link @xeokit/scene!SceneTexture | SceneTexture}.
 *
 * When we've finished constructing our SceneModel, we'll call {@link @xeokit/scene!SceneModel.build | SceneModel.build}. After that,
 * our SceneModel appears in our Viewer and we can interact with it.
 *
 * ````javascript
 * const sceneModel = theScene.createModel({
 *   id: "theModel"
 * });
 *
 * if (sceneModel instanceof SDKError) {
 *
 *      // Most SDK methods return an SDKError when
 *      // something goes wrong.
 *
 *      // We'll use some SDKErrors in this example
 *      // to demonstrate where we can use them.
 *
 *      console.error(sceneModel.message);
 *
 * } else {
 *
 *      const geometry = sceneModel.createGeometry({
 *          id: "boxGeometry",
 *          primitive: TrianglesPrimitive,
 *          positions: [ // Floats
 *              1, 1, 1, -1, 1, 1,
 *              -1, -1, 1, 1, -1, 1, 1,
 *              -1, -1, 1, 1, -1, -1, 1, -1, -1,
 *              -1, -1
 *          ],
 *          indices: [
 *              0, 1, 2, 0, 2, 3, 4, 5, 6, 4,
 *              6, 7, 8, 9, 10, 8, 10, 11, 12,
 *              13, 14, 12, 14, 15, 16, 17, 18,
 *              16, 18, 19, 20, 21, 22, 20, 22, 23
 *          ]
 *      });
 *
 *      if (geometry instanceof SDKError) {
 *          console.error(geometry.message);
 *      }
 *
 *      const texture = sceneModel.createTexture({
 *          id: "colorTexture",
 *          src: "./assets/sample_etc1s.ktx2",
 *          preloadColor: [1, 0, 0, 1],
 *          flipY: false,
 *          encoding: LinearEncoding,
 *          magFilter: LinearFilter,
 *          minFilter: LinearFilter,
 *          wrapR: ClampToEdgeWrapping,
 *          wrapS: ClampToEdgeWrapping,
 *          wrapT: ClampToEdgeWrapping,
 *      });
 *
 *      if (texture instanceof SDKError) {
 *          console.error(texture.message);
 *      }
 *
 *      const theTextureSet = sceneModel.createTextureSet({
 *          id: "theTextureSet",
 *          colorTextureId: "colorTexture"
 *      });
 *
 *      if (theTextureSet instanceof SDKError) {
 *          console.error(theTextureSet.message);
 *      }
 *
 *      const redLegMesh = sceneModel.createLayerMesh({
 *          id: "redLegMesh",
 *          geometryId: "boxGeometry",
 *          position: [-4, -6, -4],
 *          scale: [1, 3, 1],
 *          rotation: [0, 0, 0],
 *          color: [1, 0.3, 0.3],
 *          textureSetId: "theTextureSet"
 *      });
 *
 *      if (redLegMesh instanceof SDKError) {
 *          console.error(redLegMesh.message);
 *      }
 *
 *      const greenLegMesh = sceneModel.createLayerMesh({
 *          id: "greenLegMesh",
 *          geometryId: "boxGeometry",
 *          position: [4, -6, -4],
 *          scale: [1, 3, 1],
 *          rotation: [0, 0, 0],
 *          color: [0.3, 1.0, 0.3],
 *          textureSetId: "theTextureSet"
 *      });
 *
 *      const blueLegMesh = sceneModel.createLayerMesh({
 *          id: "blueLegMesh",
 *          geometryId: "boxGeometry",
 *          position: [4, -6, 4],
 *          scale: [1, 3, 1],
 *          rotation: [0, 0, 0],
 *          color: [0.3, 0.3, 1.0],
 *          textureSetId: "theTextureSet"
 *      });
 *
 *      const yellowLegMesh = sceneModel.createLayerMesh({
 *          id: "yellowLegMesh",
 *          geometryId: "boxGeometry",
 *          position: [-4, -6, 4],
 *          scale: [1, 3, 1],
 *          rotation: [0, 0, 0],
 *          color: [1.0, 1.0, 0.0],
 *          textureSetId: "theTextureSet"
 *      });
 *
 *      const tableTopMesh = sceneModel.createLayerMesh({
 *          id: "tableTopMesh",
 *          geometryId: "boxGeometry",
 *          position: [0, -3, 0],
 *          scale: [6, 0.5, 6],
 *          rotation: [0, 0, 0],
 *          color: [1.0, 0.3, 1.0],
 *          textureSetId: "theTextureSet"
 *      });
 *
 *      // Create five SceneObjects, each using a SceneMesh.
 *      // A SceneMesh belongs to exactly one SceneObject.
 *
 *      const redLegSceneObject = sceneModel.createObject({
 *          id: "redLegObject",
 *          meshIds: ["redLegMesh"]
 *      });
 *
 *      if (redLegSceneObject instanceof SDKError) {
 *          console.log(redLegSceneObject.message);
 *      }
 *
 *      const greenLegSceneObject = sceneModel.createObject({
 *          id: "greenLegObject",
 *          meshIds: ["greenLegMesh"]
 *      });
 *
 *      const blueLegSceneObject = sceneModel.createObject({
 *          id: "blueLegObject",
 *          meshIds: ["blueLegMesh"]
 *      });
 *
 *      const yellowLegSceneObject = sceneModel.createObject({
 *          id: "yellowLegObject",
 *          meshIds: ["yellowLegMesh"]
 *      });
 *
 *      const tableTopSceneObject = sceneModel.createObject({
 *          id: "tableTopObject",
 *          meshIds: ["tableTopMesh"]
 *      });
 *
 *      sceneModel.build().then(()=> {
 *
 *           // SceneModel is ready for use
 *
 *      }).catch((err) => {
 *          console.error(err);
 *       });
 * }
 * ````
 *
 * <br>
 *
 * ## Reading the SceneModel
 *
 * Now that we've built our SceneModel, we can read all of its components.
 *
 * ````javascript
 * const theSceneModel = theScene.models["theModel"];
 * const theTexture = theSceneModel.textures["theColorTexture"];
 * const theTextureSet = theSceneModel.textureSets["theTextureSet"];
 * const boxGeometry = theSceneModel.geometries["boxGeometry"];
 * const theTableTopMesh = theSceneModel.meshes["tableTopMesh"];
 * const theTableTopObject = theSceneModel.objects["tableTopObject"];
 * const theTableTopObjectAgain = theScene.objects["tableTopObject"];
 * ````
 *
 * <br>
 *
 * ## Reading Boundaries
 *
 * The classes Scene, SceneModel, SceneObject, and SceneMesh each have
 * an "aabb" property that contains their axis-aligned world-space 3D boundaries
 * (AABB).
 *
 * The SceneGeometry class has an "aabb" property that represents the geometry's local-space boundary.
 *
 * ````javascript
 * const sceneAABB = theScene.aabb; // [xmin,ymin,zmin,xmax,ymax,zmax]
 * const sceneModelAABB = theSceneModel.aabb;
 * const sceneMeshAABB = theTableTopMesh.aabb;
 * const sceneObjectAABB = theTableTopObject.aabb;
 * ````
 *
 * <br>
 *
 * ## Using Compressed Geometry
 *
 * When we created our SceneModel, the {@link @xeokit/scene!SceneModel.createGeometry | SceneModel.createGeometry}
 * method internally performed some on-the-fly compression and processing of our geometry parameters.
 *
 * To speed up SceneModel creation, we may want to perform that compression in advance.
 *
 * We can use the {@link @xeokit/scene!compressGeometryParams | compressGeometryParams} function to pre-compress the geometry parameters so
 * that we can then use {@link @xeokit/scene!SceneModel.createGeometryCompressed | SceneModel.createGeometryCompressed}
 * instead, to create the geometry directly from the compressed parameters.
 *
 * In the example below, we'll now use {@link @xeokit/scene!compressGeometryParams | compressGeometryParams} to compress
 * a {@link @xeokit/scene!SceneGeometryParams | SceneGeometryParams} into a
 * {@link @xeokit/scene!SceneGeometryCompressedParams | SceneGeometryCompressedParams}.
 *
 * ````javascript
 * import {compressGeometryParams} from "@xeokit/compression";
 * import {TrianglesPrimitive} from "@xeokit/constants";
 *
 * const geometryCompressedParams = compressGeometryParams({
 *      id: "boxGeometry",
 *      primitive: TrianglesPrimitive,
 *      positions: [ // Floats
 *          1, 1, 1, -1, 1, 1,
 *          -1, -1, 1, 1, -1, 1, 1,
 *          -1, -1, 1, 1, -1, -1, 1, -1, -1,
 *          -1, -1
 *      ],
 *      indices: [
 *          0, 1, 2, 0, 2, 3, 4, 5, 6, 4,
 *          6, 7, 8, 9, 10, 8, 10, 11, 12,
 *          13, 14, 12, 14, 15, 16, 17, 18,
 *          16, 18, 19, 20, 21, 22, 20, 22, 23
 *      ]
 *  });
 * ````
 *
 * The value of our new {@link @xeokit/scene!SceneGeometryCompressedParams | SceneGeometryCompressedParams} is shown below.
 *
 * We can see that:
 *
 * * Vertex positions are now quantized to 16-bit integers
 * * Edge indices are generated for our TrianglesPrimitive
 * * Quantization range is given in axis-sligned bounding box ````aabb````, to de-quantize the positions within the Viewer
 *
 * ````javascript
 * {
 *      id: "boxGeometry",
 *      primitive: TrianglesPrimitive,
 *      aabb: [
 *          -1, -,1 -,1, 1, 1, 1
 *      ],
 *      positionsCompressed: [
 *          65525, 65525, 65525, 0, 65525, 65525,
 *          0, 0, 65525, 65525, 0, 65525, 65525,
 *          0, 0, 65525, 65525, 0, 0, 65525, 0, 0,
 *          0, 0
 *      ],
 *      indices: [
 *          0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5, 0, 5, 6,
 *          0, 6, 1, 1, 6, 7, 1, 7, 2, 7, 4, 3, 7, 3, 2,
 *          4, 7, 6, 4, 6, 5
 *      ],
 *      edgeIndices: [
 *          3, 4, 0, 4, 5, 0, 5, 6,
 *          0, 6, 1, 1, 6, 7, 1, 7,
 *          3, 2, 4, 7, 6, 4, 6
 *      ]
 * }
 * ````
 *
 * We could then create a SceneGeometry from the compressed parameters like this:
 *
 * ````javascript
 * const geometry = sceneModel.createGeometryCompressed(geometryCompressedParams);
 * ````
 *
 * <br>
 *
 * ## Saving a SceneModel to a File
 *
 * We can export SceneModels to several file formats.
 *
 * For example, let's use {@link @xeokit/dotbim!saveDotBIM | saveDotBIM} to save our SceneModel to .BIM format:
 *
 * ````javascript
 * import {loadDotBIM} from "@xeokit/dotbim";
 *
 * const fileData = saveDotBIM({ // ArrayBuffer
 *      sceneModel
 * });
 * ````
 *
 * <br>
 *
 * ## Loading a SceneModel from a File
 *
 * We can also import SceneModels from several file formats.
 *
 * For example, let's use {@link @xeokit/dotbim!loadDotBIM | loadDotBIM} to load a .BIM file into a new SceneModel:
 *
 * > *See [@xeokit/demos](/docs/api/modules/_xeokit_demos.html)*
 *
 * ````javascript
 * import {loadDotBIM} from "@xeokit/dotbim";
 *
 * const sceneModel2 = scene.createModel({
 *     id: "mySceneModel2"
 * });
 *
 * fetch(`model.bim`)
 *     .then(response => {
 *         response
 *             .json()
 *             .then(fileData => {
 *                 loadDotBIM({
 *                     fileData,
 *                     sceneModel2
 *                 })
 *                 .then(()=>{
 *                     sceneModel2.build();
 *                 })
 *                 .catch(err => {
 *                     console.error(err);
 *                 });
 *              }).catch(err => {
 *                  console.error(err);
 *              });
 *     }).catch(err => {
 *         console.error(err);
 *     });
 * ````
 *
 * <br>
 *
 * ## Serializing a SceneModel to JSON
 *
 * ````javascript
 *  const sceneModel2JSON = sceneModel2.getJSON();
 * ````
 *
 * <br>
 *
 * ## Deserializing a SceneModel from JSON
 *
 * ````javascript
 * const sceneModel3 = sce.createSceneModel({
 *     id: "mySceneModel3"
 * });
 *
 * sceneModel3.fromJSON(sceneModel2JSON);
 *
 * sceneModel3.build();
 * ````
 *
 * <br>
 *
 * ## Destroying a SceneModel
 *
 * ````javascript
 *  sceneModel3.destroy();
 * ````
 *
 * @module @xeokit/scene
 */

export * from "./Scene";
export * from "./SceneModel";
export * from "./SceneModelStats";
export * from "./SceneObject";
export * from "./SceneTexture";
export * from "./SceneTextureSet";
export * from "./SceneGeometry";
export * from "./SceneMesh";

export * from "./RendererGeometry";
export * from "./RendererMesh";
export * from "./RendererObject";
export * from "./RendererModel";
export * from "./RendererTexture";
export * from "./RendererTextureSet";

export * from "./SceneMeshParams";
export * from "./SceneObjectParams";
export * from "./SceneTextureParams";
export * from "./SceneTextureSetParams";
export * from "./SceneGeometryCompressedParams";
export * from "./SceneGeometryParams";
export * from "./SceneModelParams";
export * from "./compressGeometryParams";

export * from "./getSceneObjectGeometry";

export * from "./SceneModelStreamParams";
export * from "./SceneModelStreamLayerParams";

export * from "./buildMat4"
