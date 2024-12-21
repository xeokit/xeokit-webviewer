/**
 * [![npm version](https://badge.fury.io/js/%40xeokit%2Fchunkloader.svg)](https://badge.fury.io/js/%40xeokit%2Fchunkloader)
 * [![](https://data.jsdelivr.com/v1/package/npm/@xeokit/data/badge)](https://www.jsdelivr.com/package/npm/@xeokit/modelchunksloader)
 *
 * <img style="padding:50px" src="media://images/xeokit_datamodel_icon.png"/>
 *
 * # xeokit Model Chunks Loader
 *
 * ---
 *
 * ***Loads multi-part models into SceneModels and DataModels***
 *
 * ---
 *
 * # Usage
 *
 * Use a {@link @xeokit/modelchunksloader!ModelChunksLoader | ModelChunksLoader} to batch-load the files listed in a
 * {@link @xeokit/core!ModelChunksManifestParams | ModelChunksManifestParams} into a
 * {@link @xeokit/scene!SceneModel | SceneModel} and/or {@link @xeokit/data!DataModel | DataModel}.
 *
 * We'll provide our ModelChunksManifestParams in a JSON file named `modelChunksManifest.json`, the contents of which are shown below.
 *
 * ````json
 * {
 *     sceneModelMIMEType: "arraybuffer",
 *     sceneModelFiles: [
 *         "model.xgf",
 *         "model2.xgf"
 *         "model3.xgf"
 *     ],
 *     dataModelFiles: [
 *         "model.json",
 *         "model2.json"
 *         "model3.json"
 *     ]
 * }
 * ````
 *
 * In this file, `sceneModelFiles` contains a list of {@link "@xeokit/xgf" | XGF} files, and `dataModelFiles`
 * contains a list of {@link @xeokit/metamodel!MetaModelParams | ModelModelParams} files.
 *
 * We can now load this file into a {@link @xeokit/scene!SceneModel | SceneModel} and
 * {@link @xeokit/data!DataModel | DataModel}, using {@link @xeokit/xgf!loadXGF | loadXGF},
 * {@link @xeokit/data!loadDataModel | loadDataModel} and {@link @xeokit/modelchunksloader!ModelChunksLoader | ModelChunksLoader}:
 *
 * ````
 * import {Scene} from "@xeokit/scene}";
 * import {Data} from "@xeokit/data}";
 * import {ModelChunksLoader} from "@xeokit/modelChunksLoader}";
 * import {loadXGF} from "@xeokit/xgf}";
 * import {loadDataModel} from "@xeokit/data}";
 * import {SDKError} from "@xeokit/core";
 * import {WebGLRenderer} from "@xeokit/webglrenderer";
 * import {Viewer} from "@xeokit/viewer";
 * import {CameraControl} from "@xeokit/cameracontrol";
 *
 * const scene = new Scene();
 * const data = new Data();
 *
 * const renderer = new WebGLRenderer({});
 *
 * const viewer = new Viewer({
 *     id: "myViewer",
 *     scene,
 *     renderer
 * });
 *
 * const view = viewer.createView({
 *     id: "myView",
 *     elementId: "myCanvas"
 * });
 *
 * view.camera.eye = [0,0,-100];
 * view.camera.look = [0,0,0];
 * view.camera.up = [0.0, 1.0, 0.0];
 *
 * new CameraControl(view, {});
 *
 * const sceneModel = scene.createModel({
 *     id: "myModel"
 * });
 *
 * const dataModel = data.createModel({
 *     id: "myModel"
 * });
 *
 * const modelChunksLoader = new ModelChunksLoader({
 *     sceneModelLoader: loadXGF,
 *     dataModelLoader: loadDataModel
 * });
 *
 * fetch(`modelChunksManifest.json`).then(response => {
 *      response
 *      .json()
 *      .then(modelChunksManifest => {
 *
 *          modelChunksLoader.load({
 *              modelChunksManifest,
 *              baseDir: ".",
 *              sceneModel,
 *              dataModel
 *
 *        }).then(() =>{
 *              sceneModel.build();
 *              dataModel.build();
 *        });
 *    });
 * ````
 *
 * @module @xeokit/modelchunksloader
 */
export * from "./ModelChunksLoader";
