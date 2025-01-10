/**
 * <img style="padding:0px; padding-top:20px; padding-bottom:30px; height:100px;" src="/docs/assets/xeokit_webgl_logo.svg"/>
 *
 * # xeokit WebGL2 Renderer
 *
 * ---
 *
 * ### *Configures a xeokit Viewer to use WebGL2 for graphics*
 *
 * ---
 *
 * * Plug a {@link WebGLRenderer} into a {@link viewer!Viewer | Viewer} to use WebGL for model storage and rendering
 * * Compact texture-based model representation
 * * Fast full-precision rendering of large models
 * * Physically-based materials
 * * Multi-canvas
 * * Basis-compressed textures
 * * Compressed geometry
 *
 * ## Installation
 *
 * ````bash
 * npm install @xeokit/sdk
 * ````
 *
 * ## Usage
 *
 * Configuring a {@link viewer!Viewer | Viewer} with a {@link WebGLRenderer} to use the browser's WebGL
 * graphics API for storing and rendering models:
 *
 * ````javascript
 * import {Scene} from "@xeokit/sdk/scene";
 * import {Viewer} from "@xeokit/sdk/viewer";
 * import {WebGLRenderer} from "@xeokit/sdk/webglrenderer";
 *
 * const myViewer = new Viewer({
 *     id: "myViewer",
 *     scene: new Scene(),
 *     renderers: new WebGLRenderer({ // Mandatory
 *          textureTranscoder: new KTX2TextureTranscoder({ // Optional
 *              transcoderPath: "./../dist/basis/" // <------ Path to BasisU transcoder module
 *          })
 *     })
 * });
 *
 * //...
 * ````
 *
 * @module webglrenderer
 */
export {WebGLRenderer} from "./WebGLRenderer";
export {createSceneModelStreamParams} from "./createSceneModelStreamParams";
