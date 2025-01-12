/**
 * <img style="padding:0px; padding-top:20px; padding-bottom:30px;" src="/docs/assets/example_cityJSON.png"/>
 *
 * # Animates a View's Camera to look at specified targets
 *
 * * Controls a {@link viewer!Camera | Camera}
 * * Navigates the Camera to look at a {@link viewer!ViewObject | ViewObject} or boundary
 * * Navigates the Camera to an explicit position given as ````eye````, ````look```` and ````up```` vectors
 * * Jumps or flies the Camera
 * * Smoothly transitions the camera between projection types
 *
 * <br>
 *
 * # Installation
 *
 * ````bash
 * npm install @xeokit/sdk
 * ````
 *
 * # Usage
 *
 * In the example below, we will create a {@link viewer!Viewer | Viewer} with
 * a {@link webglrenderer!WebGLRenderer | WebGLRenderer}  and a {@link scene!Scene | Scene}, which holds model geometry and materials.
 *
 * We'll also create a {@link data!Data | Data}, which will hold semantic data for our model.
 *
 * On our Viewer, we will create a single {@link viewer!View | View} to render it to a canvas element on the page. We will
 * also attach a {@link cameracontrol!CameraControl | CameraControl} to our View, allowing us to control its camera with mouse and touch input.
 *
 * Within the Scene, we will create a {@link scene!SceneModel | SceneModel} to hold model geometry and materials. Within Data, we will
 * create a {@link data!DataModel | DataModel} to hold semantic IFC data, which includes IFC elements and property sets.
 *
 * We will then use
 * {@link cityjson!loadCityJSON | loadCityJSON} to load a CityJSON file into our SceneModel and DataModel.
 *
 * The {@link core!SDKError | SDKError} class will be used to handle any errors that may occur during this process.
 *
 * ````javascript
 * import {SDKError} from "@xeokit/sdk/core";
 * import {Scene} from "@xeokit/sdk/scene";
 * import {WebGLRenderer} from "@xeokit/sdk/webglrenderer";
 * import {Viewer} from "@xeokit/sdk/viewer";
 * import {CameraControl} from "@xeokit/sdk/cameracontrol";
 * import {loadCityJSON} from "@xeokit/sdk/cityjson";
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
 *     elementId: "myCanvas" // << Ensure that this HTMLElement exists in the page
 * });
 *
 * view.camera.eye = [1841982.93, 10.03, -5173286.74];
 * view.camera.look = [1842009.49, 9.68, -5173295.85];
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
 * fetch("model.json").then(response => {
 *
 *     response.json().then(fileData => {
 *
 *         loadCityJSON({
 *             fileData,
 *             sceneModel,
 *             dataModel
 *         }).then(() => {
 *
 *             sceneModel.build();
 *             dataModel.build();
 *
 *         }).catch(err => {
 *
 *             sceneModel.destroy();
 *             dataModel.destroy();
 *
 *             console.error(`Error loading CityJSON: ${err}`);
 *         });
 *
 *     }).catch(err => {
 *         console.error(`Error creating JSON from fetch response: ${err}`);
 *     });
 *
 * }).catch(err => {
 *     console.error(`Error fetching CityJSON file: ${err}`);
 * });
 * ````
 *
 * @module cameraflight
 */
export * from './CameraFlightAnimation';

