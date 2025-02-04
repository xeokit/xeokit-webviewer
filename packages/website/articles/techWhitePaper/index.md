[![](screenshot.png)](./../../examples/#SceneModel_build_table/index.html)

* *[Run this example](./../../examples/#SceneModel_build_table/index.html)*

# 1. Introduction

Code, particularly open-source toolkits, requires regular refactoring to keep up with modern coding standards. Version 3
of the xeokit SDK contains several enhancements that
significantly improve the quality of the codebase.

Firstly, the internal functions, such as compression, rendering, and mathematical functions, have been factored out and
integrated into fully documented public library
modules within the SDK.

This approach results in more explicitly defined contracts between the various components, thereby enabling their
replacement or modification. The SDK is designed as a
*white box* style SDK, that gives you the manual on all the parts.

Secondly, the code has been rewritten in TypeScript, which has resulted in better organization and solidity due to the
increased strictness of the contracts between
the components. Coding with TypeScript has also been faster.

The new semantic data model is an exciting addition to the SDK. It is an entity-relationship graph that enables proper
viewing of federated IFC models and supports
advanced queries, including interoperability with other BIM software.

The new scene representation is also exciting. It's a scene graph representation, with objects, meshes, geometries,
materials etc, that's capable of
operating seamlessly in both NodeJS and browser environments. This scene graph can be constructed in JavaScript using
builder methods, while different importer and
exporter functions available in the SDK can be used to load and save the scene graph, along with the semantic data
graph, in several AECO file formats.

When used in the browser environment, the scene graph can be attached to the SDK's Viewer, allowing for a dynamic and
interactive 3D visualization
of the scene.

# Objectives

* Interact with large AEC models in the browser.
* View model geometry in double-precision Global coordinate space.
* Give users sovereignty over their models and code.
* Allow customization and extension of the SDK.
* Comprehensive documentation, examples and tests.
* Natively written in TypeScript.
* Grab-Bag of generic components - use what you need from a collection of standard components
*

# xeokit Design Principles

* Separation of Concerns
* Open-Closed Principle
* Single-Responsibility Pattern

# Repository Organization

**@xeokit/sdk** is organized as a monorepo containing two main packages:

1. **@xeokit/sdk**:
    - The core xeokit SDK, including the Viewer, loaders, and file conversion tools.
2. **@xeokit/website**:
    - The xeokit website, which provides examples, demos, and documentation resources.

Typically, developers primarily work with the **@xeokit/sdk** package. In this package, each module of the codebase
resides in its own dedicated subdirectory. The SDK build process compiles TypeScript (TS) to JavaScript (JS) and outputs
both in the `@xeokit/sdk/dist` directory. The NPM package exports the contents of `./dist`, allowing users to import
specific SDK components. Tree
shaking ensures that only the required components are included in the final application build, optimizing performance.

# 2. xeokit SDK Modules

---

## 2.1 xeokit Viewer

The SDK contains a high-performance Web viewer for displaying our model representations. Through a pluggable renderer
strategy,
the viewer can be extended to utilize various browser graphics APIs, including WebGL and WebGPU. Multiple models can be
viewed
simultaneously, and the viewer allows for the creation of separate canvases, featuring lights, section planes,
annotations,
and other elements, to display multiple views of our models.

| Modules                                                                                                            | Description                                 |
|--------------------------------------------------------------------------------------------------------------------|---------------------------------------------|
| [`@xeokit/sdk/viewer`](https://xeokit.github.io/sdk/api-docs.html#sdk/docs/api/modules/viewer.html___)            | Browser-based model Viewer                  |
| [`@xeokit/sdk/cameracontrol`](https://xeokit.github.io/sdk/api-docs.html#sdk/docs/api/modules/cameracontrol.html) | Interactive camera control for a Viewer     |
| [`@xeokit/sdk/cameraflight`](https://xeokit.github.io/sdk/api-docs.html#sdk/docs/api/modules/cameraflight.html)   | Animates a camera to view specified targets |
| [`@xeokit/sdk/webglrenderer`](https://xeokit.github.io/sdk/api-docs.html#sdk/docs/api/modules/webglrenderer.html) | WebGL rendering strategy for a Viewer       |
| [`@xeokit/sdk/treeview`](https://xeokit.github.io/sdk/api-docs.html#sdk/docs/api/modules/treeview.html)           | HTML tree view widget for a Viewer          |
| [`@xeokit/sdk/locale`](https://xeokit.github.io/sdk/api-docs.html#sdk/docs/api/modules/locale.html)               | Localization service for a Viewer           |

[![](https://mermaid.ink/img/pako:eNqNVUtv2kAQ_ivWntoKUEyMAQtxIVJ7ADWCPqTKl7U9CZssu-7apnEI_737dGweVX3xeuabb97rA0p5BihCKcVFcUfwo8C7mGVEQFoSzrzlOmZa5_0g8AeEd4iZZx4BLAMBwgiKFBiY414iC3NMBeASlOmHj0YSs2Ob0fGlmO2xNeLJk_TuGPAOBDZnSh63Tl6YAO8pZmBFFNcgOo6XSuI8G9GmZdfVLBW7EnUC1BQuSpJdiPB3hSkp67Uux4n1Vw08Nd-TgiQUXCJUQsCqtjIInaYTvAgZgD2nnHJBXq1hSkme44YnJ-nz-xfGSdKKZaGr6OKAGjxbMs6fzanKLY3gT6ZELfN20RxJzgvPsshxaff1jghdS4dUagfVKXSmYG3HSKNnM5wUpcBpOZ-3MD8h-bzsALWyCU_NnvO2kwNNL06S7vJKqZvGU8Ci03JNpTH_7LnhMt11ZElFaOY-MpBp8Pqc-3widCJmu2Lkx6jfn-v3utmvC8qNWTfzahSfrMI4uarW-VmtOV9lOHUt9UoU2R1X5zOlsY2agr3LNKSTgsXKKcgFFMDKwiPM-_JttWyuhIs-9FpGbuMbSYxuBoP_CKdTy4W9Ys4cuUGO3MVzhmgvhmpjM6Ozt37_ZGwjj-xyCjuV5CXk_fcr0PYKLziTc9UMp75r9Qh11J0y-KYMqIckYodJJq97bR6jcit9xCiSxwwecEVlhySbhOKq5JuapSgqRQU9VOWZHHj7g0DRA6aFlEJGSi5W9heiXj2UY4aiA3pB0TD0B74_HvnhcHI7DcPpqIdqKR4Oguk4HAVTfzwMJ7ejYw-9ci5ZbwaTYRgE4XAajCfBKBhNNd0vrVRxHP8CUYMzSw?type=png)](https://mermaid.live/edit#pako:eNqNVUtv2kAQ_ivWntoKUEyMAQtxIVJ7ADWCPqTKl7U9CZssu-7apnEI_737dGweVX3xeuabb97rA0p5BihCKcVFcUfwo8C7mGVEQFoSzrzlOmZa5_0g8AeEd4iZZx4BLAMBwgiKFBiY414iC3NMBeASlOmHj0YSs2Ob0fGlmO2xNeLJk_TuGPAOBDZnSh63Tl6YAO8pZmBFFNcgOo6XSuI8G9GmZdfVLBW7EnUC1BQuSpJdiPB3hSkp67Uux4n1Vw08Nd-TgiQUXCJUQsCqtjIInaYTvAgZgD2nnHJBXq1hSkme44YnJ-nz-xfGSdKKZaGr6OKAGjxbMs6fzanKLY3gT6ZELfN20RxJzgvPsshxaff1jghdS4dUagfVKXSmYG3HSKNnM5wUpcBpOZ-3MD8h-bzsALWyCU_NnvO2kwNNL06S7vJKqZvGU8Ci03JNpTH_7LnhMt11ZElFaOY-MpBp8Pqc-3widCJmu2Lkx6jfn-v3utmvC8qNWTfzahSfrMI4uarW-VmtOV9lOHUt9UoU2R1X5zOlsY2agr3LNKSTgsXKKcgFFMDKwiPM-_JttWyuhIs-9FpGbuMbSYxuBoP_CKdTy4W9Ys4cuUGO3MVzhmgvhmpjM6Ozt37_ZGwjj-xyCjuV5CXk_fcr0PYKLziTc9UMp75r9Qh11J0y-KYMqIckYodJJq97bR6jcit9xCiSxwwecEVlhySbhOKq5JuapSgqRQU9VOWZHHj7g0DRA6aFlEJGSi5W9heiXj2UY4aiA3pB0TD0B74_HvnhcHI7DcPpqIdqKR4Oguk4HAVTfzwMJ7ejYw-9ci5ZbwaTYRgE4XAajCfBKBhNNd0vrVRxHP8CUYMzSw)

## 2.2. xeokit 3D Scene

The SDK represents models in a scene graph that include the model's 3D objects, geometries, and materials. This scene
graph works on
both the browser and NodeJS platforms and can be used to create models, convert between model formats, and provide
content for the
SDK's model viewer.

| Modules                                                                             | Description                                                           |
|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------|
| [`@xeokit/sdk/scene`](https://xeokit.github.io/sdk/api-docs.html#sdk/docs/api/modules/scene.html) | Contains model geometric representations (geometries, materials etc.) |

[![](https://mermaid.ink/img/pako:eNqNVE1vozAQ_StoTrsVjSDNlpTrVuplo5WanlZcXHuaeAUY2aZKNsp_38FAYz5SlYvxm-c3n_YJuBIIKfCcGfMo2U6zIiuF1MitVGXw6zkrA_c5RrDlWOKpxxyukVnckEz-7fvAkCPTQ6hoWMZH1Otf8vQBnWe8OWnPpRSX_9HxxgWaPfrADlWBVssBaPFga41btDOoB7XJ_XZe_FS6pMnXFH1qHR6nlpdW_6qBwvFtr7XMhQ8INFYrT3iuXG2wgxb5FRtXaCTRpBRcKTZXudKXrVb1bl-i8cpFebN8CKmKcWmPHodRMw6Xfdcfj3FpzpUgu3LNxznPJbFP0-poo1RyyZ_7LCcMxXleG7okEwsW0hj5jiPDKLJ-Tq7FVWlZSEsyHqSMbK6leUSuiopG1WxG5azfPzF-nP_ZEVAMTs7Bkl4DPpmXfutGLsggzuDm9pbWxeImA-_iDogOucJu5_YrujPMFprym3HuiW60PQaZn0az5w3LQGpF3FEzZ9RevLntaf0KIRSoCyYFPbau4RnYPRaYQUq_At9YndsMsvJMVFZbtT2WHFKrawyhrgS9Et3zDOkbyw2hKKRVetM94M0SQsVKSE9wgDS-_7FIkiheP8SrVXJ3v74L4QhpdA7hn1KkEi-i9ltGyXL5ECVrd_yPM7Z-3RXv_J3_A-vIyXI?type=png)](https://mermaid.live/edit#pako:eNqNVE1vozAQ_StoTrsVjSDNlpTrVuplo5WanlZcXHuaeAUY2aZKNsp_38FAYz5SlYvxm-c3n_YJuBIIKfCcGfMo2U6zIiuF1MitVGXw6zkrA_c5RrDlWOKpxxyukVnckEz-7fvAkCPTQ6hoWMZH1Otf8vQBnWe8OWnPpRSX_9HxxgWaPfrADlWBVssBaPFga41btDOoB7XJ_XZe_FS6pMnXFH1qHR6nlpdW_6qBwvFtr7XMhQ8INFYrT3iuXG2wgxb5FRtXaCTRpBRcKTZXudKXrVb1bl-i8cpFebN8CKmKcWmPHodRMw6Xfdcfj3FpzpUgu3LNxznPJbFP0-poo1RyyZ_7LCcMxXleG7okEwsW0hj5jiPDKLJ-Tq7FVWlZSEsyHqSMbK6leUSuiopG1WxG5azfPzF-nP_ZEVAMTs7Bkl4DPpmXfutGLsggzuDm9pbWxeImA-_iDogOucJu5_YrujPMFprym3HuiW60PQaZn0az5w3LQGpF3FEzZ9RevLntaf0KIRSoCyYFPbau4RnYPRaYQUq_At9YndsMsvJMVFZbtT2WHFKrawyhrgS9Et3zDOkbyw2hKKRVetM94M0SQsVKSE9wgDS-_7FIkiheP8SrVXJ3v74L4QhpdA7hn1KkEi-i9ltGyXL5ECVrd_yPM7Z-3RXv_J3_A-vIyXI)

## 2.3. xeokit Semantic Data

The SDK employs a generic entity-relationship data graph to manage model semantics, which includes entities, properties,
and
relationships. This data graph is compatible with both the browser and NodeJS and facilitates model generation, format
conversion,
and content navigation within the SDK's model viewer.

| Modules                                                                           | Description                                                                  |
|-----------------------------------------------------------------------------------|------------------------------------------------------------------------------|
| [`@xeokit/sdk/data`](https://xeokit.github.io/sdk/api-docs.html#sdk/docs/api/modules/data.html) | Entity-relationship graph that contains model semantic data.                 |

[![](https://mermaid.ink/img/pako:eNqNVMFunDAU_BX0Tu1qgxaW9QLnHBOlSm4VFwc7WVeAkTFV6Wr_vcZmu89A0nIBzxvPmzdGPkMpGYccyop23b2g74rWRcOE4qUWsgkenosmsI9lBPdU0_MVcrjiVPNHI1N9-epVOk5VeXp6_WG0ulmtrExxhtWjRudB0m32sFbJlis9vHC_cP2-LB1bd9i2YGixbLLewk3q5sHWHf7MKzpG1p1Eu6x-uyni4msvKoYBxjut5HCDVqZxDrxT8OYJ9NByvF4bZ6aL_CFhLDuJCP4viQAJNLRGTn7SqkdLbHOmhcPEev5kyrKadxfIDOfMh_92GCMMCogK2NzdmXcYbgq4_SaYZoF1ri_-seaS5xDD3kzsnWOjI_hA9hPWwuk61cvVCl7JN2f5eqz_v3WePPKxzOhanMiwhZqrmgpmLiV78AXoEzd_EeTmk_E32le6gKK5GCrttXwZmhJyrXq-hb5lpv10jUH-RqvOoC1tID_DL8hjEoVRdDxEJE73GSHZYQuDgeMwyY7kkGTRMSbp_nDZwm8pjcIuTGOSJGS_yxKSpjvD50xoqR6na3N82Q7fLX-0cfkD0IeHkg?type=png)](https://mermaid.live/edit#pako:eNqNVMFunDAU_BX0Tu1qgxaW9QLnHBOlSm4VFwc7WVeAkTFV6Wr_vcZmu89A0nIBzxvPmzdGPkMpGYccyop23b2g74rWRcOE4qUWsgkenosmsI9lBPdU0_MVcrjiVPNHI1N9-epVOk5VeXp6_WG0ulmtrExxhtWjRudB0m32sFbJlis9vHC_cP2-LB1bd9i2YGixbLLewk3q5sHWHf7MKzpG1p1Eu6x-uyni4msvKoYBxjut5HCDVqZxDrxT8OYJ9NByvF4bZ6aL_CFhLDuJCP4viQAJNLRGTn7SqkdLbHOmhcPEev5kyrKadxfIDOfMh_92GCMMCogK2NzdmXcYbgq4_SaYZoF1ri_-seaS5xDD3kzsnWOjI_hA9hPWwuk61cvVCl7JN2f5eqz_v3WePPKxzOhanMiwhZqrmgpmLiV78AXoEzd_EeTmk_E32le6gKK5GCrttXwZmhJyrXq-hb5lpv10jUH-RqvOoC1tID_DL8hjEoVRdDxEJE73GSHZYQuDgeMwyY7kkGTRMSbp_nDZwm8pjcIuTGOSJGS_yxKSpjvD50xoqR6na3N82Q7fLX-0cfkD0IeHkg)

## 2.4. xeokit Model Importers and Exporters

The SDK provides functions for importing and exporting its model representations and semantics as industry-standard
AECO file formats. These functions can be used in NodeJS scripts for file format conversion or in the browser to load
various file formats into the viewer.

| Modules                                                                                   | Description                  |
|-------------------------------------------------------------------------------------------|------------------------------|
| [`@xeokit/sdk/xgf`](https://xeokit.github.io/sdk/api-docs.html#sdk/docs/api/modules/xgf.html)           | Import and export XKT files  |
| [`@xeokit/sdk/gltf`](https://xeokit.github.io/sdk/api-docs.html#sdk/docs/api/modules/gltf.html)         | Import glTF files            |
| [`@xeokit/sdk/las`](https://xeokit.github.io/sdk/api-docs.html#sdk/docs/api/modules/las.html)           | Import LAS pointcloud scans  |
| [`@xeokit/sdk/cityjson`](https://xeokit.github.io/sdk/api-docs.html#sdk/docs/api/modules/cityjson.html) | Import CityJSON files        |
| [`@xeokit/sdk/webifc`](https://xeokit.github.io/sdk/api-docs.html#sdk/docs/api/modules/webifc.html)     | Import IFC files             |
| [`@xeokit/sdk/dotbim`](https://xeokit.github.io/sdk/api-docs.html#sdk/docs/api/modules/dotbim.html)     | Import and export .BIM files |

## 2.5. xeokit BCF Support

The SDK offers functions for sharing bookmarks of viewer state with other BIM software as industry-standard BCF
Viewpoints.
These functions can be used to develop applications that facilitate collaboration on construction projects.

| Modules                                                                         | Description                                          |
|---------------------------------------------------------------------------------|------------------------------------------------------|
| [`@xeokit/sdk/bcf`](https://xeokit.github.io/sdk/api-docs.html#sdk/docs/api/modules/bcf.html) | Load and save BCF                    |

## 2.6. xeokit Collision Detection

The SDK provides a collision detection library that can be used to build various acceleration and selection mechanisms.
Intended applications for our collision library include:

* 3D frustum culling
* Ray-picking
* Cursor snap-to-vertex
* 2D marquee selection
* ..and more.

| Modules                                                                                           | Description                                                    |
|---------------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| [`@xeokit/sdk/kdtree2`](https://xeokit.github.io/sdk/api-docs.html#sdk/docs/api/modules/kdtree2.html) | Searches and collision tests with 2D k-d trees and boundaries  |
| [`@xeokit/sdk/kdtree3`](https://xeokit.github.io/sdk/api-docs.html#sdk/docs/api/modules/kdtree3.html) | Ssearches and collision tests with 3D k-d trees and boundaries |
| [`@xeokit/sdk/pick`](https://xeokit.github.io/sdk/api-docs.html#sdk/docs/api/modules/pick.html)       | Select objects and primitives using rays and boundaries        |

## 2.7. xeokit Utility Libraries

The SDK's internal and lower-level functionalities are mostly available as utility libraries with complete
documentation.

| Modules                                                                                            | Description                                          |
|----------------------------------------------------------------------------------------------------|------------------------------------------------------|
| [`@xeokit/sdk/components`](./docs/modules/core.html)                            | Basic component types used throughout the xeokit SDK |
| [`@xeokit/sdk/constants`](https://xeokit.github.io/sdk/api-docs.html#sdk/docs/api/modules/constants.html) | Constants used throughout the xeokit SDK             |
| [`@xeokit/sdk/utils`](https://xeokit.github.io/sdk/api-docs.html#sdk/docs/api/modules/utils.html)     | Core utilities used throughout the xeokit SDK        |
| [`@xeokit/sdk/basictypes`](/docs/api/modules/basictypes.html)                                      | Basic semantic data type constants                   |
| [`@xeokit/sdk/ifctypes`](https://xeokit.github.io/sdk/api-docs.html#sdk/docs/api/modules/ifcTypes.html) | IFC data type constants                              |
| [`@xeokit/sdk/math/math`](https://xeokit.github.io/sdk/api-docs.html#sdk/docs/api/modules/math.html)  | General math definitions and constants               |
| [`@xeokit/sdk/boundaries`](https://xeokit.github.io/sdk/api-docs.html#sdk/docs/api/modules/boundaries.html) | Boundaries math library                              |
| [`@xeokit/sdk/compression`](https://xeokit.github.io/sdk/api-docs.html#sdk/docs/api/modules/compression.html) | SceneGeometry de/compression utilities library       |
| [`@xeokit/sdk/curves`](https://xeokit.github.io/sdk/api-docs.html#sdk/docs/api/modules/curves.html)   | Spline curves math library                           |
| [`@xeokit/sdk/procgen`](https://xeokit.github.io/sdk/api-docs.html#sdk/docs/api/modules/procgen.html) | Geometry generation functions                        |
| [`@xeokit/sdk/matrix`](https://xeokit.github.io/sdk/api-docs.html#sdk/docs/api/modules/matrix.html)   | Matrix and vector math utilities library             |
| [`@xeokit/sdk/rtc`](https://xeokit.github.io/sdk/api-docs.html#sdk/docs/api/modules/rtc.html)         | Relative-to-center (RTC) coordinates math library    |
| [`@xeokit/sdk/webglutils`](https://xeokit.github.io/sdk/api-docs.html#sdk/docs/api/modules/webglutils.html) | WebGL utilities library                              |
| [`@xeokit/sdk/ktx2`](https://xeokit.github.io/sdk/api-docs.html#sdk/docs/api/modules/ktx2.html)       | Compressed texture support                           |

# 3. xeokit Usage Examples

---

## 3.1. Visualize a glTF Model

Let's use xeokit to view a glTF model in a web page.

First import the npm modules we need from the SDK:

````bash
npm install @xeokit/sdk
````

Here's the JavaScript for our glTF viewer app:.

In this example, we are:

1. Instantiating a Scene and WebGLRenderer instance, and attaching them to a Viewer.
2. Creating a View, and setting its Camera to view the Scene from a certain position.
3. Fetching a model in GLTF format, and loading it into the Scene.
4. Making a couple of objects visible and un-highlighted.
5. Subscribing to the Viewer's onTick event, and setting the View's Camera to orbit around the model.

````javascript
import {Scene} from "@xeokit/sdk/scene";
import {Viewer} from "@xeokit/sdk/viewer";
import {WebGLRenderer} from "@xeokit/sdk/webglrenderer";
import {loadGLTF} from "@xeokit/sdk/gltf";

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

## 3.2. Creating and Viewing a SceneModel

Let's use xeokit to show a spinning 3D box in a web page.

[![](holterTower.png)](/packages/demos/examples/viewer/#SceneModel_build_table/index.html)

* *[Run this example](/packages/demos/examples/viewer/#SceneModel_build_table/index.html)*

First install the npm modules we need:

````bash
npm install @xeokit/scene
````

Then create an HTML page in `index.html` that contains a canvas element:

````html
<!DOCTYPE html>
<html>
<head>
    <title>xeokit Spinning Box</title>
</head>
<body>
<canvas id="myView1"></canvas>
</body>
<script type="module" src="./index.js"></script>
</html>
````

Then create JavaScript in `index.js` to make a spinning box in the canvas.

1. Import the modules we need.
2. Create a Viewer with a WebGLRenderer and a Scene.
3. In the Viewer, create a View that draws to the canvas.
4. Position the View's Camera to look at the center of the 3D coordinate system (default).
5. In the Scene, create a SceneModel that contains a SceneObject, a SceneMesh, and a SceneGeometry that defines the
   shape of the box.
6. Build the SceneModel. This causes the SceneMode's objects to appear in the View's canvas.
7. Update the visibility and highlight status of the object.
8. Orbit the Camera by one degree on each Viewer "tick" event. This will continually orbit the model.

````javascript
// 1.

import {Scene} from "@xeokit/sdk/scene";
import {TrianglesPrimitive} from "@xeokit/sdk/constants";
import {Viewer} from "@xeokit/sdk/viewer";
import {WebGLRenderer} from "@xeokit/sdk/webglrenderer";
import {CameraControl} from "@xeokit/sdk/cameracontrol";

// 2.

const renderer = new WebGLRenderer({});

const scene = new Scene();

const viewer = new Viewer({
    renderer,
    scene
});

// 3.

const view = viewer.createView({
    id: "myView",
    elementId: "myView1"
});

// 4.

view.camera.eye = [0, 0, 10]; // Looking down the -Z axis
view.camera.look = [0, 0, 0];
view.camera.up = [0, 1, 0];

// 5.

const sceneModel = scene.createModel({
    id: "demoModel"
});

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

sceneModel.build()
    .then(() => {

        // A box object now appears on our View's canvas.

        // We can now show/hide/select/highlight our box through the View:

        view.objects["boxObject"].visible = true;
        view.objects["boxObject"].highlighted = false;  // etc.

        // Start orbiting the camera:

        viewer.onTick.subscribe(() => {
            view.camera.orbitYaw(1.0);
        });
    });
````

# 3.3. Creating a DataModel

````javascript
import {Data} from "@xeokit/sdk/data";
import {BasicEntity, BasicAggregation} from "@xeokit/sdk/basictypes";

const data = new Data();

const dataModel = data.createModel({ // DataModel | SDKError
    id: "demoModel"
});

dataModel.createPropertySet({ // PropertySet | SDKError 
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

dataModel.createPropertySet({
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

dataModel.createPropertySet({
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

dataModel.createObject({ // DataObject | SDKError
    id: "table",
    type: BasicEntity,
    name: "Table",
    propertySetIds: ["tablePropertySet"]
});

dataModel.createObject({
    id: "redLeg",
    name: "Red table Leg",
    type: BasicEntity,
    propertySetIds: ["tableLegPropertySet"]
});

dataModel.createObject({
    id: "greenLeg",
    name: "Green table leg",
    type: BasicEntity,
    propertySetIds: ["tableLegPropertySet"]
});

dataModel.createObject({
    id: "blueLeg",
    name: "Blue table leg",
    type: BasicEntity,
    propertySetIds: ["tableLegPropertySet"]
});

dataModel.createObject({
    id: "yellowLeg",
    name: "Yellow table leg",
    type: BasicEntity,
    propertySetIds: ["tableLegPropertySet"]
});

dataModel.createObject({
    id: "tableTop",
    name: "Purple table top",
    type: BasicEntity,
    propertySetIds: ["tableTopPropertySet"]
});

dataModel.createRelationship({ // Relationship | SDKError
    type: BasicAggregation,
    relatingObjectId: "table",
    relatedObjectId: "tableTop"
});

dataModel.createRelationship({
    type: BasicAggregation,
    relatingObjectId: "tableTop",
    relatedObjectId: "redLeg"
});

dataModel.createRelationship({
    type: BasicAggregation,
    relatingObjectId: "tableTop",
    relatedObjectId: "greenLeg"
});

dataModel.createRelationship({
    type: BasicAggregation,
    relatingObjectId: "tableTop",
    relatedObjectId: "blueLeg"
});

dataModel.createRelationship({
    type: BasicAggregation,
    relatingObjectId: "tableTop",
    relatedObjectId: "yellowLeg"
});

dataModel.build(); 
````

With our DataModel built, we'll now traverse it from a given DataObject, to collect the IDs of the DataObjects we find
on the traversal path.

One example of where we use this method is to query the aggregation hierarchy of the DataObjects for building
a tree view of an IFC element hierarchy.

````javascript
const resultObjectIds = [];

data.searchObjects({
    startObjectId: "table",
    includeObjects: [basicTypes.BasicEntity],
    includeRelated: [basicTypes.BasicAggregation],
    resultObjectIds
});

// resultObjectIds == ["table", "tableTop", "redLeg", "greenLeg", "blueLeg", "yellowLeg"];
````

````

# 3.3. Convert a glTF Model to .BIM

