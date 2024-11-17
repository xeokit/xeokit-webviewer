# View a glTF Model in a Web Page

Let's use xeokit to view a glTF model in a web page.

First import the npm modules we need from the SDK:

````bash
npm install @xeokit/scene
npm install @xeokit/viewer
npm install @xeokit/webglrenderer
npm install @xeokit/constants
npm install @xeokit/gltf
````

Here's the JavaScript for our glTF viewer app:

````javascript
import {Scene} from "@xeokit/scene";
import {Viewer} from "@xeokit/viewer";
import {WebGLRenderer} from "@xeokit/webglrenderer";
import {loadGLTF} from "@xeokit/gltf";

const scene = new Scene(); // Scene graph

const renderer = new WebGLRenderer({}); // WebGL renderers kernel

const viewer = new Viewer({ // Browser-based viewer
    scene,
    renderer
});

const view = myViewer.createView({ // Independent view 
    id: "myView",
    canvasId: "myView1"
});

view.camera.eye = [0, 0, 10]; // Looking down the -Z axis
view.camera.look = [0, 0, 0];
view.camera.up = [0, 1, 0];

const sceneModel = scene.createModel();

fetch("myModel.glb")
    .then(response => { // Fetch the glTF

        response
            .arrayBuffer()
            .then(fileData => {

                loadGLTF({
                    fileData,
                    sceneModel
                }).then(() => { // Load the glTF

                    sceneModel
                        .build()
                        .then(() => { // Compresses textures, geometries etc.

                            // A model now appears on our View's canvas.

                            // We can now show/hide/select/highlight the model's objects through the View:

                            view.objects["2hExBg8jj4NRG6zzE$aSi6"].visible = true;
                            view.objects["2hExBg8jj4NRG6zzE$aSi6"].highlighted = false;  // etc.

                            // Start orbiting the camera:

                            viewer.onTick.subscribe(() => {
                                view.camera.orbitYaw(1.0);
                            });
                        });
                });
            });
    });
````

In this example, we are:

1. Instantiating a Scene and WebGLRenderer instance, and attaching them to a Viewer.
2. Creating a view, and setting its camera to view the scene from a certain position.
3. Fetching a model in GLTF format, and loading it into the Scene.
4. Making a couple of objects visible and un-highlighted.
5. Subscribing to the Viewer's onTick event, and setting the view's camera to orbit around the model.
