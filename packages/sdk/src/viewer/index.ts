/**
 * <img style="padding:0px; padding-top:20px; padding-bottom:30px;" src="/docs/assets/xeokit_viewer_logo.png"/>
 *
 * # xeokit Viewer
 *
 * ---
 *
 * ***The SDK's browser-based 3D/2D scene viewer***
 *
 * ---
 *
 * # Features
 *
 * * Use a {@link Viewer | Viewer} to interactively explore a {@link scene!Scene | Scene} across all major browsers, including mobile platforms.
 *
 * * **Pluggable Renderer** - The Viewer employs a customizable {@link Renderer | Renderer} strategy, enabling compatibility with various
 * browser graphics APIs. In this documentation, we utilize the {@link webglrenderer!WebGLRenderer | WebGLRenderer}, which configures
 * the Viewer to render using WebGL.
 *
 * * **Scene Models** - The Viewer includes a {@link scene!Scene | Scene} that contains the geometry and materials for models. The Scene
 * acts as a container for {@link scene!SceneModel | SceneModels}, {@link scene!SceneObject | SceneObjects},
 * {@link scene!SceneMesh | SceneMeshes}, and {@link scene!SceneGeometry | SceneGeometries}. It can be programmatically
 * constructed, as well as imported from or exported to various file formats.
 *
 * * **Full-Precision** - The Viewer supports accurate rendering of models that depend on large double-precision World coordinates.
 *
 * * **Multiple Views** - The Viewer can support multiple {@link View | Views}, each providing an independent perspective of the
 * Scene within its own HTML canvas. Each View maintains its own camera position, projection settings, lighting configuration,
 * and object states (e.g., visibility, highlighting, X-ray, colorization).
 *
 * * **View Layers** - Views in the Viewer can organize objects into {@link ViewLayer | ViewLayers}, which act as bins to group
 * objects based on their role within the View. These layers make it easier to apply updates (e.g., toggling visibility,
 * selection, highlighting, or slicing) to specific groups of objects.
 *
 * * **Data Models** - The Viewer can optionally integrate with semantic {@link data!Data | Data}, which is represented as an
 * entity-relationship graph. This graph provides an API for programmatically creating and searching data models. The Data
 * contains {@link data!DataModel | DataModels}, {@link data!DataObject | DataObjects}, {@link data!PropertySet | PropertySets},
 * and {@link data!Relationship | Relationships}. To attach semantic data to a {@link scene!SceneModel | SceneModel}, a
 * corresponding DataModel with the same ID can be created. Similarly, to attach data to specific SceneObjects, matching
 * DataObjects with the same IDs can be used.
 *
 * * **BCF Interoperability** - When viewing BIM models, use {@link bcf!saveBCFViewpoint | saveViewpoint} and {@link bcf!loadBCFViewpoint | loadViewpoint} to share snapshots
 * of the Viewer’s state with other BIM viewers. These snapshots are encoded in the Building Collaboration Format (BCF), an
 * open file format designed to facilitate data exchange and collaboration on 3D models and building information.
 *
 * * **Custom Slicing Planes** -
 *
 * * **Highlight, Select, X-Ray**
 *
 * * **Dynamic Resolution Scaling**
 *
 * * **Ambient Shadows (SAO)**
 *
 * * **Edge Enhancement**
 *
 * * **Dynamic Lighting**
 *
 * * **Object Picking**
 *
 * * **Canvas Snapshot**
 *
 * * **Perspective and Orthographic Projections**
 *
 * <br>
 *
 * [![](https://mermaid.ink/img/pako:eNqNVU1v4jAQ_SuRT7srQKRAgKjiQqXdA6iI7oe0ysVJpsWtY2cdhy2l_Pd1_JEmkK7KJWbemzdj541zRAlPAYUoobgobgh-EDiLWEoEJJJw5q22EdOY95PAXxDeMWKe-QlgKQgQJlAkwMAs94pZmGUiAEuoUj99NpGInZqKTi_BbI9tEo8fVXWngDMQ2Kwpedi5eGEa3FDMwIYoPoBoFV5VEVfZhO4aeW1kValXoVaDWsJ1SdKODv-UmBJ52OrjOMu-1cTz9D0pSEzBbYQqClhop5rQ23SBZ6EasOuEUy7Ii01MKMlzXOvkJHl6-4dxHDd6WepTdH3AATx7ZJw_mVWZWxnBH80RNdKbh-ZEcl54VkXZpfleb4jQZ-mYFeyoegstF2ytjTT7-hrHhRQ4kYtFg_ML4q-rFrG5t7KQPNvUfbuyGZaCPDd3UVm0RpXvaafhtBnWFVz7gwIWLWdoKc35rzWMljGBE4tLQlP3JwW1W3641L40jsIjZoYwQn6E-v2Ffm7rMewA78xUmkcNfLGAKfIurPdnUbN-V-G8tMKrUGivgmp9AZrcsD6wt5imtLZgucosuYACmCw8wrxv39er-uborKGnN3QXQx2J0HAw-EA7rbNc2pvoopDze-jupwtGc34iZoWa2hvVX16R9t34rZA73omcuz9i9Zxcv_b7Z6MTeiTLKWTVCXYxNz8-RF3z5OkdYvO-WXKm3F2PiP4waCO34NbL8M3LQD2kGBkmqfo26fQIyZ2qEaFQLVO4xyVVPlFqiopLye8OLEHhPaYF9FCZp2ru7OesjkJKJBdr-8GrHj2UY4bCI3pGoT-dD4JgOJv644nvj-ejWQ8dUDgKZoPRfDjxx1fB_Go6np166IVzpTocTILJVGGjSTAMRrPxSMv91qAUJZz-AZsUb1U?type=png)](https://mermaid.live/edit#pako:eNqNVU1v4jAQ_SuRT7srQKRAgKjiQqXdA6iI7oe0ysVJpsWtY2cdhy2l_Pd1_JEmkK7KJWbemzdj541zRAlPAYUoobgobgh-EDiLWEoEJJJw5q22EdOY95PAXxDeMWKe-QlgKQgQJlAkwMAs94pZmGUiAEuoUj99NpGInZqKTi_BbI9tEo8fVXWngDMQ2Kwpedi5eGEa3FDMwIYoPoBoFV5VEVfZhO4aeW1kValXoVaDWsJ1SdKODv-UmBJ52OrjOMu-1cTz9D0pSEzBbYQqClhop5rQ23SBZ6EasOuEUy7Ii01MKMlzXOvkJHl6-4dxHDd6WepTdH3AATx7ZJw_mVWZWxnBH80RNdKbh-ZEcl54VkXZpfleb4jQZ-mYFeyoegstF2ytjTT7-hrHhRQ4kYtFg_ML4q-rFrG5t7KQPNvUfbuyGZaCPDd3UVm0RpXvaafhtBnWFVz7gwIWLWdoKc35rzWMljGBE4tLQlP3JwW1W3641L40jsIjZoYwQn6E-v2Ffm7rMewA78xUmkcNfLGAKfIurPdnUbN-V-G8tMKrUGivgmp9AZrcsD6wt5imtLZgucosuYACmCw8wrxv39er-uborKGnN3QXQx2J0HAw-EA7rbNc2pvoopDze-jupwtGc34iZoWa2hvVX16R9t34rZA73omcuz9i9Zxcv_b7Z6MTeiTLKWTVCXYxNz8-RF3z5OkdYvO-WXKm3F2PiP4waCO34NbL8M3LQD2kGBkmqfo26fQIyZ2qEaFQLVO4xyVVPlFqiopLye8OLEHhPaYF9FCZp2ru7OesjkJKJBdr-8GrHj2UY4bCI3pGoT-dD4JgOJv644nvj-ejWQ8dUDgKZoPRfDjxx1fB_Go6np166IVzpTocTILJVGGjSTAMRrPxSMv91qAUJZz-AZsUb1U)
 *
 * # Installation
 *
 * ````bash
 * npm install @xeokit/sdk
 * ````
 *
 * <br>
 *
 * # Usage
 *
 * <br>
 *
 *  In JavaScript, import the modules:
 *
 * ````javascript
 * import {Scene} from "@xeokit/sdk/scene";
 * import {Viewer} from "@xeokit/sdk/viewer";
 * import {WebGLRenderer} from "@xeokit/sdk/webglrenderer";
 * import {KTX2TextureTranscoder} from "@xeokit/sdk/ktx2";
 * import {TrianglesPrimitive, LinearEncoding, LinearFilter} from "@xeokit/sdk/constants";
 * import {CameraControl} from "@xeokit/sdk/cameracontrol";
 * import {loadXGF} from "@xeokit/sdk/xgf";
 * import {saveBCFViewpoint, loadBCFViewpoint} from "@xeokit/sdk/bcf";
 * ````
 *
 * <br>
 *
 * ## Create a Scene
 *
 * Create a {@link scene!Scene | Scene} to hold our model geometry and materials.
 *
 * ````javascript
 * const scene = new Scene();
 * ````
 *
 * <br>
 *
 * ## Create a Viewer
 *
 * Create a {@link Viewer | Viewer} to view our Scene.
 *
 * Our Viewer gets a {@link webglrenderer!WebGLRenderer | WebGLRenderer}, which adapts it to use the browser's WebGL graphics API.
 * We'll also equip our WebGLRenderer with a {@link ktx2!KTX2TextureTranscoder | KTX2TextureTranscoder} so we that we can view compressed textures.
 *
 * ````javascript
 * const myViewer = new Viewer({
 *     id: "myViewer",
 *     scene,
 *     renderers: new WebGLRenderer({
 *          textureTranscoder: new KTX2TextureTranscoder({  // Optional, this is the default
 *              transcoderPath: "./../dist/basis/" // Optional, defaults to CDN
 *          })
 *      })
 * });
 * ````
 *
 * <br>
 *
 * ## Create a View
 *
 * A Viewer draws its output to one or more {@link View | Views}. Each View is an independent and interactive view of the Scene,
 * with its own canvas, {@link Camera | Camera}, object visual states etc.
 *
 * Within our Viewer, we'll create a {@link View | View} and arrange its Camera:
 *
 * ````javascript
 * const view1 = myViewer.createView({
 *     id: "myView",
 *     elementId: "myView1"
 * });
 *
 * view1.camera.eye = [-3.933, 2.855, 27.018];
 * view1.camera.look = [4.400, 3.724, 8.899];
 * view1.camera.up = [-0.018, 0.999, 0.039];
 * ````
 *
 * <br>
 *
 * ## Add a CameraControl
 *
 * Add a {@link cameracontrol!CameraControl | CameraControl} to the View, to control the View's Camera with mouse and
 * touch input:
 *
 * ````javascript
 * const myCameraControl = new CameraControl({
 *      view: view1
 * });
 * ````
 *
 * <br>
 *
 * ## Create a SceneModel
 *
 * Our {@link scene!Scene | Scene } is a container for model geometry and materials.
 *
 * Within the Scene, we'll create a {@link scene!SceneModel | SceneModel} that contains a couple
 * of textured {@link scene!SceneModel | SceneObjects}. As soon as we've
 * called {@link scene!SceneModel.build | SceneModel.build}, two
 * new 3D objects appear in the View's canvas.
 *
 * ````javascript
 * const sceneModel = scene.createModel();
 *
 * sceneModel.createGeometry({
 *      id: "myGeometry",
 *      primitive: TrianglesPrimitive,
 *      positions: [202, 202, 202, 200, 202, 202, ...],
 *      indices: [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, ...]
 * });
 *
 * sceneModel.createTexture({
 *      id: "myColorTexture",
 *      src: "myTexture",
 *      encoding: LinearEncoding, // Demo some texture configs
 *      magFilter: LinearFilter,
 *      minFilter: LinearFilter
 * });
 *
 * sceneModel.createTextureSet({
 *      id: "myTextureSet",
 *      colorTextureId: "myColorTexture"
 * });
 *
 * sceneModel.createLayerMesh({
 *     id: "myMesh1",
 *     geometryId: "myGeometry",
 *     textureSetId: "myTextureSet"
 * });
 *
 * sceneModel.createLayerMesh({
 *     id: "myMesh2",
 *     geometryId: "myGeometry",
 *     textureSetId: "myTextureSet"
 * });
 *
 * sceneModel.createObject({
 *     id: "myObject1",
 *     meshIds: ["myMesh1"]
 * });
 *
 * sceneModel.createObject({
 *     id: "myObject2",
 *     meshIds: ["myMesh2"]
 * });
 *
 * sceneModel.build();
 * ````
 *
 * <br>
 *
 * ## Show and Hide Objects
 *
 * Having created our Scene, Viewer, View and SceneModel, we now have a couple of objects showing in our View.
 *
 * Hide one of the objects in the View's canvas:
 *
 * ````javascript
 * view1.setObjectsVisible(["myObject1"], false);
 * ````
 *
 * Another way to hide the object:
 *
 * ````javascript
 * view1.objects["myObject1"].visible = false;
 * ````
 *
 * Show the object again:
 *
 * ````javascript
 * view1.objects["myObject1"].visible = true;
 * ````
 *
 * <br>
 *
 * ## Highlight, Select and X-Ray Objects
 *
 * The functions for highlighting, selecting, colorizing and X-raying objects work the same as when hiding and
 * showing them.
 *
 * Let's highlight the first object in our View:
 *
 * ````javascript
 * view1.objects["myObject1"].highlighted = true;
 *
 * view1.highlightMaterial.fillColor=[0,1,0];
 * ````
 *
 * <br>
 *
 * ## Create Additional Views
 *
 * A Viewer can have an unlimited number of Views, each providing an independent view of the Scene in a separate
 * HTML canvas. Each View can have a completely different viewpoint, projection, and configuration of which objects
 * are visible, x-rayed, highlighted etc.
 *
 * Let's create a second View, with a separate canvas, that shows the other object highlighted instead:
 *
 * ```` javascript
 * const view2 = myViewer.createView({
 *      id: "myView2",
 *      elementId: "myView2"
 * });
 *
 * view2.camera.eye = [-3.933, 2.855, 27.018];
 * view2.camera.look = [4.400, 3.724, 8.899];
 * view2.camera.up = [-0.018, 0.999, 0.039];
 *
 * const myCameraControl2 = new CameraControl({
 *      view: view2
 * });
 *
 * view2.objects["myObject1"].highlighted = true;
 * ````
 *
 * To show an independent view of {@link scene!SceneModel | SceneObjects}, a View
 * proxies them with {@link ViewObject | ViewObjects}, which represent and control their appearance within the View's canvas.
 *
 * <br>
 *
 * ## Slice Objects
 *
 * Each View can have an unlimited number of interactive {@link SectionPlane | SectionPlanes}, with which we can use to slice open objects
 * to view interior structures.
 *
 * Create a couple of SectionPlanes within our second View, to slice through one of our
 * objects, then adjust the direction of one of the SectionPlanes:
 *
 * ````javascript
 * const mySlice1 = view2.createSlice({
 *     id: "mySlice1",
 *     pos: [0,0,0],
 *     dir: [-1,-1,-1]
 * });
 *
 * const mySlice2 = view2.createSlice({
 *     id: "mySlice2",
 *     pos: [0,0,0],
 *     dir: [1,1,.5]
 * });
 *
 * mySlice1.dir = [1,1,1];
 * ````
 *
 * <br>
 *
 * ## Creating ViewLayers
 *
 * A {@link ViewLayer} is a layer of {@link ViewObject | ViewObjects} within a {@link View}.
 *
 * ViewLayers allow users to group and segregate ViewObjects based on their roles or aspects in a scene, simplifying
 * interaction and focusing operations
 * on specific object groups.
 *
 * ViewLayers group ViewObjects based on the {@link scene!SceneObject.layerId | layerId} of the
 * corresponding {@link scene!SceneObject | SceneObject}.
 *
 * Let's add a ViewLayer to our {@link View}, to hold environmental objects, like sky boxes, that are not part of any model.
 *
 * ````javascript
 * const environmentViewLayer = view.createLayer({
 *     id: "myEnviromentViewLayer"
 * });
 * ````
 *
 * Now we'll create a SceneModel for our skybox in that ViewLayer:
 *
 * ````javascript
 * const skyboxSceneModel = myVScene.createModel({
 *      id: "mySkyBox",
 *      layerId: "myEnviromentViewLayer"
 * });
 *
 * skyboxSceneModel.createObject({
 *      id: "skyBox",
 *      //...
 * });
 *
 * skyboxSceneModel.build();
 * ````
 *
 * Hide all objects in our new ViewLayer:
 *
 * ````javascript
 * environmentViewLayer.setObjectsVisible(environmentLayer.objectIds, false);
 * ````
 *
 * ## Loading SceneModels
 *
 * We can view additional models by creating SceneModels and loading files into them.
 *
 * Lets create a new SceneModel in the Scene and then use {@link dotbim!loadDotBIM} to
 * load a house model into it from .BIM format.
 *
 * ````javascript
 * const sceneModel2 = scene.createModel({
 *     id: "houseModel"
 * });
 *
 * fetch(`model.bim`)
 *     .then(response => {
 *         response
 *             .json()
 *             .then(fileData => {
 *
 *                  loadDotBIM({
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
 * ## Saving SceneModels
 *
 * We can save the SceneModels in our Scene to a variety of formats.
 *
 * Lets use {@link dotbim!saveDotBIM} to save our house model back to a .BIM file.
 *
 * ````javascript
 * const xktFileData = saveXKT({
 *      sceneModel
 * });
 * ````
 *
 * <br>
 *
 * ## Capturing Canvas Snapshots
 *
 * Let's use {!link View.getSnapshot | View.getSnapshot} to capture a snapshot image of the
 * canvas to a {@link SnapshotResult}, while including UI elements ({@link treeview!TreeView | TreeView} etc) in the snapshot.
 *
 * ````javascript
 * const snapshotResult = view.getSnapshot({
 *     includeGizmos: true,
 *     height: 100,
 *     width: 150
 * });
 * ````
 *
 * <br>
 *
 * ## Render Modes
 *
 * A View allows us to define various rendering modes and specify the rendering effects for each mode. When a View
 * is set to a particular rendering mode, it activates only the effects configured for that mode.
 *
 * Let's configure our View to apply enhanced edges and ambient
 * shadows when in {@link constants!QualityRender | QualityRender} mode, and only apply resolution scaling
 * in {@link constants!FastRender | FastRender} mode.
 *
 * ````javascript
 * import {FastRender, QualityRender} from "@xeokit/sdk/constants";
 *
 * myView.edges.renderModes = [QualityRender];
 * myView.sao.renderModes = [QualityRender];
 * myView.resolutionScale.renderModes = [FastRender];
 *````
 *
 * Initially we'll set the View in FastRender mode.
 *
 * ````javascript
 * myView.renderMode = FastRender;
 * ````
 *
 * Now, whenever we want to render the View with full resoltion, edge enhancement and ambient shadows, we just switch
 * it over to QualityRender mode.
 *
 * ````javascript
 * myView.renderMode = QualityRender;
 * ````
 *
 * Switch it back to FastRender mode whenever we want to enable canvas scaling, and disable edges and ambient shadows
 * for smoother interaction.
 *
 * ````javascript
 * myView.renderMode = FastRender;
 * ````
 *
 * In this documentation, we use the two bundled constants, QualityRender and FastRender, to identify two
 * rendering modes. However, the number of supported modes is actually unlimited, and we can use our own constants
 * to identify them if we want.
 *
 * <br>
 *
 * ## Saving BCF
 *
 * Let's use {@link bcf!saveBCFViewpoint | saveBCFViewpoint} to save the visual state of our View to a BCF
 * viewpoint. The viewpoint is a {@link bcf!BCFViewpoint | BCFViewpoint}, which can serialize directly to JSON.
 *
 * We'll also exclude the states of the ViewObjects in the skybox/environment ViewLayer from being saved in the viewpoint.
 *
 * ````javascript
 * const bcfViewpoint = saveBCFViewpoint({
 *     view,
 *     excludeLayerIds: ["myEnviromentViewLayer"]
 * });
 * ````
 *
 * <br>
 *
 * ## Loading BCF
 *
 * Let's now use {@link bcf!loadBCFViewpoint | loadBCFViewpoint} to reload that BCF viewpoint back into our View.
 *
 * Even though no skybox/environment ViewObject states were saved in this viewpoint, we'll pretend they were, and demonstrate
 * how we can filter them out and prevent them from loading.
 *
 * ````javascript
 * loadBCFViewpoint({
 *      bcfViewpoint
 *      view,
 *      excludeLayerIds: ["myEnvironmentViewLayer"]
 * });
 * ````
 *
 * @module viewer
 */
export * from "./Viewer";
export * from "./ViewParams";
export * from "./Renderer";
export * from "./Camera";
export * from "./Projection";
export * from "./FrustumProjection";
export * from "./OrthoProjection";
export * from "./PerspectiveProjection";
export * from "./CustomProjection";
export * from "./scheduler";
export * from "./AmbientLight";
export * from "./DirLight";
export * from "./PointLight";
export * from "./EmphasisMaterial";
export * from "./Edges";
export * from "./PointsMaterial";
export * from "./LinesMaterial";
export * from "./Metriqs";
export * from "./View";
export * from "./ViewLayer";
export * from "./ViewObject";
export * from "./SectionPlane";
export * from "./SectionPlaneParams";
export * from "./SAO";
export * from "./PickParams";
export * from "./PickResult";
export * from "./ViewLayerParams";
export * from "./ResolutionScale";
export * from "./Texturing";
export * from "./TickParams";
export * from "./SnapshotParams";
export * from "./SnapshotResult";
