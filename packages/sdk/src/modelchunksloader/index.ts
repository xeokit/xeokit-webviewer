/**
 * <img style="padding:50px" src="/docs/assets/xeokit_datamodel_icon.png"/>
 *
 * # xeokit Model Chunks Loader
 *
 * ---
 *
 * ***Batch-load multi-part models into SceneModels and DataModels***
 *
 * The `ModelChunksLoader` helps load large, multi-part models by grouping them into chunks and loading them into both
 * `SceneModels` and `DataModels` in a seamless process. This is particularly useful when dealing with models that are
 * too large to load as a single file, enabling efficient chunk-based loading and handling.
 *
 * ---
 *
 * # Installation
 *
 * To install the `@xeokit/sdk` package, use the following npm command:
 *
 * ````bash
 * npm install @xeokit/sdk
 * ````
 *
 * ---
 *
 * # Usage
 *
 * The `ModelChunksLoader` allows you to batch-load the files listed in a `ModelChunksManifestParams` into both
 * `SceneModel` and/or `DataModel`. The `ModelChunksManifestParams` is typically provided as a JSON file, which contains
 * the necessary file lists and metadata for the chunks.
 *
 * Here’s an example of a `modelChunksManifest.json` file:
 *
 * ````json
 * {
 *     "sceneModelMIMEType": "arraybuffer",
 *     "sceneModelFiles": [
 *         "model.xgf",
 *         "model2.xgf",
 *         "model3.xgf"
 *     ],
 *     "dataModelFiles": [
 *         "model.json",
 *         "model2.json",
 *         "model3.json"
 *     ]
 * }
 * ````
 *
 * In this manifest:
 * - `sceneModelFiles` lists the XGF model files.
 * - `dataModelFiles` lists the MetaModel JSON files.
 *
 * With this manifest, we can use the `ModelChunksLoader` to load both `SceneModel` and `DataModel` as follows:
 *
 * ```ts
 * import {Scene} from "@xeokit/sdk/scene";
 * import {Data} from "@xeokit/sdk/data";
 * import {ModelChunksLoader} from "@xeokit/sdk/modelchunksloader";
 * import {loadXGF} from "@xeokit/sdk/xgf";
 * import {loadDataModel} from "@xeokit/sdk/data";
 * import {SDKError} from "@xeokit/sdk/core";
 * import {WebGLRenderer} from "@xeokit/sdk/webglrenderer";
 * import {Viewer} from "@xeokit/sdk/viewer";
 * import {CameraControl} from "@xeokit/sdk/cameracontrol";
 *
 * // Initialize scene, data, and viewer
 * const scene = new Scene();
 * const data = new Data();
 * const renderer = new WebGLRenderer({});
 * const viewer = new Viewer({
 *     id: "myViewer",
 *     scene,
 *     renderer
 * });
 * const view = viewer.createView({
 *     id: "myView",
 *     elementId: "myCanvas"
 * });
 *
 * // Camera setup
 * view.camera.eye = [0, 0, -100];
 * view.camera.look = [0, 0, 0];
 * view.camera.up = [0, 1, 0];
 * new CameraControl(view, {});
 *
 * // Create SceneModel and DataModel
 * const sceneModel = scene.createModel({ id: "myModel" });
 * const dataModel = data.createModel({ id: "myModel" });
 *
 * // Initialize ModelChunksLoader
 * const modelChunksLoader = new ModelChunksLoader({
 *     sceneModelLoader: loadXGF,
 *     dataModelLoader: loadDataModel
 * });
 *
 * // Load the model chunks manifest and process the files
 * fetch(`modelChunksManifest.json`).then(response => {
 *     response.json().then(modelChunksManifest => {
 *         modelChunksLoader.load({
 *             modelChunksManifest,
 *             baseDir: ".",
 *             sceneModel,
 *             dataModel
 *         }).then(() => {
 *             sceneModel.build();
 *             dataModel.build();
 *         }).catch((error) => {
 *             console.error("Error loading model chunks:", error);
 *         });
 *     });
 * });
 * ````
 *
 * ---
 *
 * @module modelchunksloader
 */
export * from "./ModelChunksLoader";
