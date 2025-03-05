

<!-- TOC start (generated with https://github.com/derlin/bitdowntoc) -->
- [1. Introduction](#1-introduction)
- [2. Resource Links](#2-resource-links)
- [3. Use Cases](#3-use-cases)
    + [3.1. BIM Model Visualization](#31-bim-model-visualization)
    + [3.2. Web-Based BIM Collaboration](#32-web-based-bim-collaboration)
    + [3.3. GIS and LiDAR Integration](#33-gis-and-lidar-integration)
    + [3.4. Interactive Model Analysis](#34-interactive-model-analysis)
    + [3.5. Web-Based Digital Twin Applications](#35-web-based-digital-twin-applications)
    + [3.6. AEC Model Conversion and Processing](#36-aec-model-conversion-and-processing)
    + [3.7. Custom Web-Based 3D Applications](#37-custom-web-based-3d-applications)
- [4. Features](#4-features)
- [5. Importing Models](#5-importing-models)
- [6. Modules](#6-modules)
    * [6.1. Scene](#61-scene)
    * [6.2. Viewer](#62-viewer)
    * [6.3. Data](#63-data)
    * [6.4. Model Importers and Exporters](#64-model-importers-and-exporters)
    * [6.5. Model Converters](#65-model-converters)
    * [6.6. BCF Support](#66-bcf-support)
    * [6.7. Collision Detection](#67-collision-detection)
    * [6.8. Utility Libraries](#68-utility-libraries)
- [7. Usage Examples](#7-usage-examples)
    * [7.1. View a .BIM model and hide all IfcSpaces](#71-view-a-bim-model-and-hide-all-ifcspaces)
    * [7.2. Build and view a SceneModel and a DataModel](#72-build-and-view-a-scenemodel-and-a-datamodel)
<!-- TOC end -->

<!-- TOC --><a name="1-introduction"></a>
## 1. Introduction
The **xeokit SDK** is an open-source toolkit designed for real-time 3D visualization in web-based **Architecture,  
Engineering, and Construction (AEC)** applications. It enables smooth interaction with large 3D models using **double-precision coordinates**, preventing floating-point errors.
The SDK features a powerful rendering engine through the **Viewer module**, which supports multiple views, object
interaction, and customizable lighting. The **Scene module** manages 3D geometry, materials, and model structures, while the **Data module**
integrates semantic metadata for querying and analysis.
This document introduces the SDK’s architecture, rendering techniques, and its applications in web-based 3D visualization.

<!-- TOC --><a name="2-resource-links"></a>
## 2. Resource Links
Below are essential resources to help you get started with xeokit SDK:
- [**Examples**](../../examples/index.html) – Interactive demos showcasing SDK features.
- [**Model Viewer**](../../models/index.html) – Explore test models imported from various AEC formats.
- [**Source Code**](https://github.com/xeokit/sdk) – Open-source repository under the AGPL3 license.
- [**API Documentation**](../../api-docs.html) – Comprehensive API reference generated with TypeDoc.
- [**User Guide**](../../articles/index.html) – Guides on using the SDK effectively.
- [**Releases**](https://github.com/xeokit/sdk/releases) – Latest SDK updates and version history.
- [**NPM Package**](https://www.npmjs.com/package/@xeokit/sdk) – Install the SDK via NPM.

<!-- TOC --><a name="3-use-cases"></a>
## 3. Use Cases
The xeokit SDK supports various **AEC industry use cases**, including:

<!-- TOC --><a name="31-bim-model-visualization"></a>
##### **3.1. BIM Model Visualization**
- Load and view **IFC, glTF, and other 3D formats** directly in a web browser.
- Efficiently visualize **large-scale BIM models** with optimized rendering.
- Overlay and compare **federated models** for coordination.

<!-- TOC --><a name="32-web-based-bim-collaboration"></a>
##### **3.2. Web-Based BIM Collaboration**
- Support **BCF (BIM Collaboration Format)** for issue tracking and annotations.
- Enable **real-time collaboration** through shared 3D views.
- Manage **object properties and metadata** with the **Data module**.

<!-- TOC --><a name="33-gis-and-lidar-integration"></a>
##### **3.3. GIS and LiDAR Integration**
- Visualize models using **double-precision coordinates** for precise geospatial alignment.
- Overlay **AEC models with point clouds** (LAS/LAZ format support).
- Enable **large-scale infrastructure visualization** with high accuracy.

<!-- TOC --><a name="34-interactive-model-analysis"></a>
##### **3.4. Interactive Model Analysis**
- Perform **sectioning, slicing, and x-ray views** for in-depth inspection.
- Apply **custom materials and rendering effects** for enhanced visualization.
- Use **collision detection** to verify model integrity.

<!-- TOC --><a name="35-web-based-digital-twin-applications"></a>
##### **3.5. Web-Based Digital Twin Applications**
- Integrate **real-time IoT data** with BIM models for facility management.
- Enable **historical and predictive visualization** for asset maintenance.
- Provide **interactive dashboards** with embedded 3D model viewers.

<!-- TOC --><a name="36-aec-model-conversion-and-processing"></a>
##### **3.6. AEC Model Conversion and Processing**
- Convert between **BIM formats** using built-in importers/exporters.
- Pre-convert models into **doc:XKT/doc:XGF format** for optimized loading.
- Process **semantic relationships** for structured data queries.

<!-- TOC --><a name="37-custom-web-based-3d-applications"></a>
##### **3.7. Custom Web-Based 3D Applications**
- Develop **custom visualization tools** using the xeokit Viewer.
- Embed **high-performance 3D models** in web dashboards.
- Create **multi-view 3D interfaces** for enhanced usability.

<!-- TOC --><a name="4-features"></a>
## 4. Features
- **Advanced AEC Graphics Toolkit** – Tools for building, loading, converting, saving, viewing, and interacting with 3D models.
- **Multi-Model Viewing** – Display multiple federated models simultaneously.
- **Support for Multiple Formats** – IFC, glTF, LAS/LAZ, CityJSON, XKT, XGF, .BIM, and more.
- **Multi-Canvas Support** – Display models in multiple canvases with independent settings.
- **Double-Precision Coordinates** – Accurately position and align geospatial models.
- **Optimized Loading** – Pre-convert large models to doc:XGF format for faster performance.
- **High-Performance Rendering** – Built specifically for complex AEC models.
- **Interactive Effects** – Slice, x-ray, highlight, and select objects.
- **BCF Collaboration** – Interoperate with other BIM software through exchange of BCF viewpoints.
- **Natively TypeScript** – Strongly-typed components with clear API contracts.

<!-- TOC --><a name="5-importing-models"></a>
## 5. Importing Models
The xeokit SDK supports viewing various AEC file formats through multiple import pipelines. The best pipeline to use depends on the source format and file size.
The table below outlines the recommended pipeline based on format and data size. Smaller files can be loaded directly into the xeokit Viewer while medium/large files should be preconverted to a more compact format, such as XGF, for optimal performance. The links on the right take you to the tutorials for the selected pipelines.

<table class="table table-striped table-bordered table-hover">
  <thead class="thead-dark">
    <tr>
      <th>Model Format</th>
      <th>File Size</th>
      <th>Load Directly vs. Preconvert</th>
      <th>Recommended Articles</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="4"><b style="font-size: 20px;">IFC</b></td>
      <td rowspan="2" style="background-color:#90ee9073">0MB - 10MB</td>
      <td>Load Directly</td>
      <td>
        <a href="@@base/articles/example_loadWebIFC_IfcOpenHouse4/">Viewing IFC using loadWebIFC</a>
      </td>
    </tr>
    <tr>
      <td>Preconvert</td>
      <td>
        <a href="@@base/articles/webifc2xgf/">Importing IFC using webifc2xgf</a>
      </td>
    </tr>
    <tr>
      <td rowspan="1" style="background-color:lightyellow">10MB - 100MB</td>
      <td>Preconvert</td>
      <td>
        <a href="">Importing IFC using ifc2gltf</a><br>
        <a href="">Importing IFC using ifc2gltf2xgf</a>
      </td>
    </tr>
    <tr>
      <td rowspan="1" style="background-color:#ffa50047">100MB - 2GB</td>
      <td>Preconvert</td>
      <td>
        <a href="">Importing IFC using ifc2gltf2xgf</a>
      </td>
    </tr>
    <tr>
      <td rowspan="2"><b style="font-size: 20px;">glTF</b></td>
      <td rowspan="1" style="background-color:#90ee9073">Small</td>
      <td>Load Directly</td>
      <td>
        <a href="@@base/articles/example_loadGLTF_MAP/">Viewing glTF using loadGLTF</a>
      </td>
    </tr>
    <tr>
      <td rowspan="1" style="background-color:#ffa50047">Medium / Large</td>
      <td>Preconvert</td>
      <td>
        <a href="@@base/articles/gltf2xgf/">Importing glTF using gltf2xgf</a>
      </td>
    </tr>
    <tr>
      <td rowspan="2"><b style="font-size: 20px;">.BIM</b></td>
      <td style="background-color:#90ee9073">Small</td>
      <td>Load Directly</td>
      <td>
        <a href="@@base/articles/example_loadDotBIM_BlenderHouse/">Viewing .BIM using loadDotBIM</a>
      </td>
    </tr>
    <tr>
      <td style="background-color:#ffa50047">Medium / Large</td>
      <td>Preconvert</td>
      <td>
        <a href="@@base/articles/dotbim2xgf/">Importing .BIM using dotbim2xgf</a>
      </td>
    </tr>
    <tr>
      <td rowspan="3"><b style="font-size: 20px;">CityJSON</b></td>
      <td rowspan="2" style="background-color:#90ee9073">Small</td>
      <td>Load Directly</td>
      <td>
        <a href="@@base/articles/example_loadCityJSON_Railway/">Viewing CityJSON using loadCityJSON</a>
      </td>
    </tr>
    <tr>
      <td>Preconvert</td>
      <td>
        <a href="@@base/articles/cityjson2xgf/">Importing CityJSON using cityjson2xgf</a>
      </td>
    </tr>
    <tr>
      <td rowspan="1" style="background-color:#ffa50047">Medium / Large</td>
      <td>Preconvert</td>
      <td>
        <a href="@@base/articles/cityjson2xgf/">Importing CityJSON using cityjson2xgf</a>
      </td>
    </tr>
    <tr>
      <td rowspan="3"><b style="font-size: 20px;">LAS/LAZ</b></td>
      <td rowspan="2" style="background-color:#90ee9073">Small / Medium</td>
      <td>Load Directly</td>
      <td>
        <a href="">Viewing LAS/LAZ using loadLAS</a>
      </td>
    </tr>
    <tr>
      <td>Preconvert</td>
      <td>
        <a href="@@base/articles/las2xgf/">Importing LAS using las2xgf</a>
      </td>
    </tr>
    <tr>
      <td rowspan="1" style="background-color:#ffa50047">Large</td>
      <td>Preconvert</td>
      <td>
        <a href="@@base/articles/las2xgf/">Importing LAS using las2xgf</a>
      </td>
    </tr>
    <tr>
      <td><b style="font-size: 20px;">XKT</b></td>
      <td style="background-color:#90ee9073">All Sizes</td>
      <td>Load Directly</td>
      <td>
        <a href="">Viewing XKT using loadXKT</a>
      </td>
    </tr>
    <tr>
      <td><b style="font-size: 20px;">XGF</b></td>
      <td style="background-color:#90ee9073">All Sizes</td>
      <td>Load Directly</td>
      <td>
        <a href="">Viewing XGF using loadXGF</a>
      </td>
    </tr>
  </tbody>
</table>

<!-- TOC --><a name="6-modules"></a>
## 6. Modules
The xeokit SDK follows modular design principles, ensuring flexibility and scalability across web and Node.js environments.
It adheres to [*Separation of Concerns*](https://en.wikipedia.org/wiki/Separation_of_concerns),
[*Single Responsibility*](https://en.wikipedia.org/wiki/Single-responsibility_principle), and
the [*Open-Closed Principle*](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle), providing a
structured toolkit that supports diverse AEC workflows.
The SDK modules fall into these categories, which we'll explore in the sections below:
- **Scene** – Manages 3D model objects, compatible with Node.js and browsers.
- **Data** – Provides a searchable entity-relationship data model.
- **Viewer** – Enables interactive model visualization in web applications.
- **Importers** – Loads supported AECO formats into the Scene and Data modules.
- **Exporters** – Saves Scene and Data in supported AECO formats.
- **Converters** – CLI tools for model format conversions.
- **BCF Support** – BCF interoperation with other BIM software.
- **Collision Detection** – Collision detection utilities.
- **Utilities** – Low-level 3D graphics functions, math operations, and additional tools.
  <br>

<!-- TOC --><a name="61-scene"></a>
### 6.1. Scene
The SDK represents models in a scene graph, implemented by the doc:Scene class, that contains the model's 3D objects,
geometries, and materials. This scene graph works on both the browser and NodeJS platforms and can be used to create models, convert between model formats, and provide content for the SDK's model viewer. Note that the scene is viewer-agnostic.
| Modules                                                                             | Description                                                           |
|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------|
| [`@xeokit/sdk/scene`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/scene.html) | Contains model geometric representations (geometries, materials etc.) |

[![](https://mermaid.ink/img/pako:eNqNVE1vozAQ_StoTrsVjSDNlpTrVuplo5WanlZcXHuaeAUY2aZKNsp_38FAYz5SlYvxm-c3n_YJuBIIKfCcGfMo2U6zIiuF1MitVGXw6zkrA_c5RrDlWOKpxxyukVnckEz-7fvAkCPTQ6hoWMZH1Otf8vQBnWe8OWnPpRSX_9HxxgWaPfrADlWBVssBaPFga41btDOoB7XJ_XZe_FS6pMnXFH1qHR6nlpdW_6qBwvFtr7XMhQ8INFYrT3iuXG2wgxb5FRtXaCTRpBRcKTZXudKXrVb1bl-i8cpFebN8CKmKcWmPHodRMw6Xfdcfj3FpzpUgu3LNxznPJbFP0-poo1RyyZ_7LCcMxXleG7okEwsW0hj5jiPDKLJ-Tq7FVWlZSEsyHqSMbK6leUSuiopG1WxG5azfPzF-nP_ZEVAMTs7Bkl4DPpmXfutGLsggzuDm9pbWxeImA-_iDogOucJu5_YrujPMFprym3HuiW60PQaZn0az5w3LQGpF3FEzZ9RevLntaf0KIRSoCyYFPbau4RnYPRaYQUq_At9YndsMsvJMVFZbtT2WHFKrawyhrgS9Et3zDOkbyw2hKKRVetM94M0SQsVKSE9wgDS-_7FIkiheP8SrVXJ3v74L4QhpdA7hn1KkEi-i9ltGyXL5ECVrd_yPM7Z-3RXv_J3_A-vIyXI?type=png)](https://mermaid.live/edit#pako:eNqNVE1vozAQ_StoTrsVjSDNlpTrVuplo5WanlZcXHuaeAUY2aZKNsp_38FAYz5SlYvxm-c3n_YJuBIIKfCcGfMo2U6zIiuF1MitVGXw6zkrA_c5RrDlWOKpxxyukVnckEz-7fvAkCPTQ6hoWMZH1Otf8vQBnWe8OWnPpRSX_9HxxgWaPfrADlWBVssBaPFga41btDOoB7XJ_XZe_FS6pMnXFH1qHR6nlpdW_6qBwvFtr7XMhQ8INFYrT3iuXG2wgxb5FRtXaCTRpBRcKTZXudKXrVb1bl-i8cpFebN8CKmKcWmPHodRMw6Xfdcfj3FpzpUgu3LNxznPJbFP0-poo1RyyZ_7LCcMxXleG7okEwsW0hj5jiPDKLJ-Tq7FVWlZSEsyHqSMbK6leUSuiopG1WxG5azfPzF-nP_ZEVAMTs7Bkl4DPpmXfutGLsggzuDm9pbWxeImA-_iDogOucJu5_YrujPMFprym3HuiW60PQaZn0az5w3LQGpF3FEzZ9RevLntaf0KIRSoCyYFPbau4RnYPRaYQUq_At9YndsMsvJMVFZbtT2WHFKrawyhrgS9Et3zDOkbyw2hKKRVetM94M0SQsVKSE9wgDS-_7FIkiheP8SrVXJ3v74L4QhpdA7hn1KkEi-i9ltGyXL5ECVrd_yPM7Z-3RXv_J3_A-vIyXI)

<br>

<!-- TOC --><a name="62-viewer"></a>
### 6.2. Viewer
The SDK features a high-performance 3D web viewer, implemented by the doc:Viewer class, for viewing scene models in the browser. With a pluggable renderer strategy, it can be adapted to any browser graphics API, including WebGL and WebGPU. The viewer enables simultaneous visualization of multiple models, and allows the creation of multiple separate canvases with customizable elements such as lights, section planes, and annotations, providing flexible multi-view model display.
| Modules                                                                                                            | Description                                          |
|--------------------------------------------------------------------------------------------------------------------|------------------------------------------------------|
| [`@xeokit/sdk/viewer`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/viewer.html)            | Browser-based model Viewer                           |
| [`@xeokit/sdk/cameracontrol`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/cameracontrol.html) | Interactive camera control for a Viewer              |
| [`@xeokit/sdk/cameraflight`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/cameraflight.html) | Animates a Viewer's camera to view specified targets |
| [`@xeokit/sdk/webglrenderer`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/webglrenderer.html) | WebGL rendering strategy for a Viewer                |
| [`@xeokit/sdk/treeview`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/treeview.html)        | HTML tree view widget for a Viewer                   |
| [`@xeokit/sdk/locale`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/locale.html)            | Localization service for a Viewer                    |

[![](https://mermaid.ink/img/pako:eNqNVUtv2kAQ_ivWntoKUEyMAQtxIVJ7ADWCPqTKl7U9CZssu-7apnEI_737dGweVX3xeuabb97rA0p5BihCKcVFcUfwo8C7mGVEQFoSzrzlOmZa5_0g8AeEd4iZZx4BLAMBwgiKFBiY414iC3NMBeASlOmHj0YSs2Ob0fGlmO2xNeLJk_TuGPAOBDZnSh63Tl6YAO8pZmBFFNcgOo6XSuI8G9GmZdfVLBW7EnUC1BQuSpJdiPB3hSkp67Uux4n1Vw08Nd-TgiQUXCJUQsCqtjIInaYTvAgZgD2nnHJBXq1hSkme44YnJ-nz-xfGSdKKZaGr6OKAGjxbMs6fzanKLY3gT6ZELfN20RxJzgvPsshxaff1jghdS4dUagfVKXSmYG3HSKNnM5wUpcBpOZ-3MD8h-bzsALWyCU_NnvO2kwNNL06S7vJKqZvGU8Ci03JNpTH_7LnhMt11ZElFaOY-MpBp8Pqc-3widCJmu2Lkx6jfn-v3utmvC8qNWTfzahSfrMI4uarW-VmtOV9lOHUt9UoU2R1X5zOlsY2agr3LNKSTgsXKKcgFFMDKwiPM-_JttWyuhIs-9FpGbuMbSYxuBoP_CKdTy4W9Ys4cuUGO3MVzhmgvhmpjM6Ozt37_ZGwjj-xyCjuV5CXk_fcr0PYKLziTc9UMp75r9Qh11J0y-KYMqIckYodJJq97bR6jcit9xCiSxwwecEVlhySbhOKq5JuapSgqRQU9VOWZHHj7g0DRA6aFlEJGSi5W9heiXj2UY4aiA3pB0TD0B74_HvnhcHI7DcPpqIdqKR4Oguk4HAVTfzwMJ7ejYw-9ci5ZbwaTYRgE4XAajCfBKBhNNd0vrVRxHP8CUYMzSw?type=png)](https://mermaid.live/edit#pako:eNqNVUtv2kAQ_ivWntoKUEyMAQtxIVJ7ADWCPqTKl7U9CZssu-7apnEI_737dGweVX3xeuabb97rA0p5BihCKcVFcUfwo8C7mGVEQFoSzrzlOmZa5_0g8AeEd4iZZx4BLAMBwgiKFBiY414iC3NMBeASlOmHj0YSs2Ob0fGlmO2xNeLJk_TuGPAOBDZnSh63Tl6YAO8pZmBFFNcgOo6XSuI8G9GmZdfVLBW7EnUC1BQuSpJdiPB3hSkp67Uux4n1Vw08Nd-TgiQUXCJUQsCqtjIInaYTvAgZgD2nnHJBXq1hSkme44YnJ-nz-xfGSdKKZaGr6OKAGjxbMs6fzanKLY3gT6ZELfN20RxJzgvPsshxaff1jghdS4dUagfVKXSmYG3HSKNnM5wUpcBpOZ-3MD8h-bzsALWyCU_NnvO2kwNNL06S7vJKqZvGU8Ci03JNpTH_7LnhMt11ZElFaOY-MpBp8Pqc-3widCJmu2Lkx6jfn-v3utmvC8qNWTfzahSfrMI4uarW-VmtOV9lOHUt9UoU2R1X5zOlsY2agr3LNKSTgsXKKcgFFMDKwiPM-_JttWyuhIs-9FpGbuMbSYxuBoP_CKdTy4W9Ys4cuUGO3MVzhmgvhmpjM6Ozt37_ZGwjj-xyCjuV5CXk_fcr0PYKLziTc9UMp75r9Qh11J0y-KYMqIckYodJJq97bR6jcit9xCiSxwwecEVlhySbhOKq5JuapSgqRQU9VOWZHHj7g0DRA6aFlEJGSi5W9heiXj2UY4aiA3pB0TD0B74_HvnhcHI7DcPpqIdqKR4Oguk4HAVTfzwMJ7ejYw-9ci5ZbwaTYRgE4XAajCfBKBhNNd0vrVRxHP8CUYMzSw)

<br>

<!-- TOC --><a name="63-data"></a>
### 6.3. Data
The SDK employs a generic entity-relationship data graph, implemented by the doc:Data class, to manage model semantics, which includes entities, properties, and relationships. This data graph is compatible with both the browser and NodeJS and facilitates model generation, format conversion, and content navigation within the SDK's model viewer. Note that the data graph is agnostic of both the viewer and the scene.
| Modules                                                                           | Description                                                                  |
|-----------------------------------------------------------------------------------|------------------------------------------------------------------------------|
| [`@xeokit/sdk/data`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/data.html) | Entity-relationship graph that contains model semantic data.                 |

[![](https://mermaid.ink/img/pako:eNqNVMFunDAU_BX0Tu1qgxaW9QLnHBOlSm4VFwc7WVeAkTFV6Wr_vcZmu89A0nIBzxvPmzdGPkMpGYccyop23b2g74rWRcOE4qUWsgkenosmsI9lBPdU0_MVcrjiVPNHI1N9-epVOk5VeXp6_WG0ulmtrExxhtWjRudB0m32sFbJlis9vHC_cP2-LB1bd9i2YGixbLLewk3q5sHWHf7MKzpG1p1Eu6x-uyni4msvKoYBxjut5HCDVqZxDrxT8OYJ9NByvF4bZ6aL_CFhLDuJCP4viQAJNLRGTn7SqkdLbHOmhcPEev5kyrKadxfIDOfMh_92GCMMCogK2NzdmXcYbgq4_SaYZoF1ri_-seaS5xDD3kzsnWOjI_hA9hPWwuk61cvVCl7JN2f5eqz_v3WePPKxzOhanMiwhZqrmgpmLiV78AXoEzd_EeTmk_E32le6gKK5GCrttXwZmhJyrXq-hb5lpv10jUH-RqvOoC1tID_DL8hjEoVRdDxEJE73GSHZYQuDgeMwyY7kkGTRMSbp_nDZwm8pjcIuTGOSJGS_yxKSpjvD50xoqR6na3N82Q7fLX-0cfkD0IeHkg?type=png)](https://mermaid.live/edit#pako:eNqNVMFunDAU_BX0Tu1qgxaW9QLnHBOlSm4VFwc7WVeAkTFV6Wr_vcZmu89A0nIBzxvPmzdGPkMpGYccyop23b2g74rWRcOE4qUWsgkenosmsI9lBPdU0_MVcrjiVPNHI1N9-epVOk5VeXp6_WG0ulmtrExxhtWjRudB0m32sFbJlis9vHC_cP2-LB1bd9i2YGixbLLewk3q5sHWHf7MKzpG1p1Eu6x-uyni4msvKoYBxjut5HCDVqZxDrxT8OYJ9NByvF4bZ6aL_CFhLDuJCP4viQAJNLRGTn7SqkdLbHOmhcPEev5kyrKadxfIDOfMh_92GCMMCogK2NzdmXcYbgq4_SaYZoF1ri_-seaS5xDD3kzsnWOjI_hA9hPWwuk61cvVCl7JN2f5eqz_v3WePPKxzOhanMiwhZqrmgpmLiV78AXoEzd_EeTmk_E32le6gKK5GCrttXwZmhJyrXq-hb5lpv10jUH-RqvOoC1tID_DL8hjEoVRdDxEJE73GSHZYQuDgeMwyY7kkGTRMSbp_nDZwm8pjcIuTGOSJGS_yxKSpjvD50xoqR6na3N82Q7fLX-0cfkD0IeHkg)

<br>

<!-- TOC --><a name="64-model-importers-and-exporters"></a>
### 6.4. Model Importers and Exporters
The SDK provides functions for importing and exporting its model representations and semantics as industry-standard AECO file formats. These functions can be used in NodeJS scripts for file format conversion or in the browser to load various file formats into the web viewer.
| Modules                                                                                   | Description                  |
|-------------------------------------------------------------------------------------------|------------------------------|
| [`@xeokit/sdk/xgf`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/xgf.html)           | Import and export XKT        |
| [`@xeokit/sdk/dotbim`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/dotbim.html)     | Import and export .BIM       |
| [`@xeokit/sdk/gltf`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/gltf.html)         | Import glTF                  |
| [`@xeokit/sdk/las`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/las.html)           | Import LAS/LAZ               |
| [`@xeokit/sdk/cityjson`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/cityjson.html) | Import CityJSON              |
| [`@xeokit/sdk/webifc`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/webifc.html)     | Import IFC                   |

<br>

<!-- TOC --><a name="65-model-converters"></a>
### 6.5. Model Converters
The SDK provides CLI tools to convert various model formats into the SDK's own optimized format, XGF, which can then be loaded efficiently into the web viewer.
| Modules                                                                                                          | Description                    |
|------------------------------------------------------------------------------------------------------------------|--------------------------------|
| [`@xeokit/sdk/cityjson2xgf`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/cityjson2xgf.html)  | Converts CityJSON to XGF       |
| [`@xeokit/sdk/dotbim2xgf`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/dotbim2xgf.html)      | Converts .BIM to XGF           |
| [`@xeokit/sdk/gltf2xgf`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/gltf2xgf.html)          | Converts glTF to XGF           |
| [`@xeokit/sdk/ifc2gltf2xgf`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/ifc2gltf2xgf.html)  | Converts IFC output to XGF      |
| [`@xeokit/sdk/las2xgf`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/las2xgf.html)            | Converts LAS/LAZ to XGF        |
| [`@xeokit/sdk/webifc2xgf`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/webifc2xgf.html)      | Converts IFC to XGF            |

<br>

<!-- TOC --><a name="66-bcf-support"></a>
### 6.6. BCF Support
The SDK offers functions for sharing bookmarks of web viewer state with other BIM software as industry-standard BCF Viewpoints. These functions can be used to develop applications that facilitate collaboration on construction projects.
| Modules                                                                         | Description                                          |
|---------------------------------------------------------------------------------|------------------------------------------------------|
| [`@xeokit/sdk/bcf`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/bcf.html) | Load and save BCF                                    |

<br>

<!-- TOC --><a name="67-collision-detection"></a>
### 6.7. Collision Detection
The SDK provides collision detection utilities that can be used to build various acceleration and selection mechanisms. Intended applications for our collision library include 3D frustum culling, ray-picking, marquee box selection and more.
| Modules                                                                                           | Description                                                    |
|---------------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| [`@xeokit/sdk/kdtree2`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/kdtree2.html) | Searches and collision tests with 2D k-d trees and boundaries    |
| [`@xeokit/sdk/kdtree3`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/kdtree3.html) | Searches and collision tests with 3D k-d trees and boundaries    |
| [`@xeokit/sdk/pick`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/pick.html)       | Select objects and primitives using rays and boundaries         |

<br>

<!-- TOC --><a name="68-utility-libraries"></a>
### 6.8. Utility Libraries
The SDK's internal and lower-level functionalities are mostly available as utility libraries with complete documentation.
| Modules                                                                                            | Description                                          |
|----------------------------------------------------------------------------------------------------|------------------------------------------------------|
| [`@xeokit/sdk/components`](./docs/modules/core.html)                                               | Basic component types used throughout the xeokit SDK |
| [`@xeokit/sdk/constants`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/constants.html) | Constants used throughout the xeokit SDK             |
| [`@xeokit/sdk/utils`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/utils.html)     | Core utilities used throughout the xeokit SDK        |
| [`@xeokit/sdk/basictypes`](https://xeokit.github.io/sdk/api-docs.html)                               | Basic semantic data type constants                   |
| [`@xeokit/sdk/ifctypes`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/ifcTypes.html) | IFC data type constants                              |
| [`@xeokit/sdk/math/math`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/math.html)  | General math definitions and constants               |
| [`@xeokit/sdk/boundaries`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/boundaries.html) | Boundaries math library                              |
| [`@xeokit/sdk/compression`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/compression.html) | Scene geometry de/compression utilities library      |
| [`@xeokit/sdk/curves`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/curves.html)   | Spline curves math library                           |
| [`@xeokit/sdk/procgen`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/procgen.html) | Geometry generation functions                        |
| [`@xeokit/sdk/matrix`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/matrix.html)   | Matrix and vector math utilities library             |
| [`@xeokit/sdk/rtc`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/rtc.html)         | Relative-to-center (RTC) coordinates math library    |
| [`@xeokit/sdk/webglutils`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/webglutils.html) | WebGL utilities library                              |
| [`@xeokit/sdk/ktx2`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/ktx2.html)       | Compressed texture support                           |

<!-- TOC --><a name="7-usage-examples"></a>
## 7. Usage Examples
---
<!-- TOC --><a name="71-view-a-bim-model-and-hide-all-ifcspaces"></a>
### 7.1. View a .BIM model and hide all IfcSpaces
example-run:Viewer_viewDotBIM
#### Steps
To build this example, first install the npm module:
````bash
npm install @xeokit/sdk
````
Then create an HTML page in `index.html` that contains a canvas element:
example-html:Viewer_viewDotBIM
Then create JavaScript in `index.js` to view a .BIM model in the canvas.
example-steps:Viewer_viewDotBIM
example-javascript:Viewer_viewDotBIM

<!-- TOC --><a name="72-build-and-view-a-scenemodel-and-a-datamodel"></a>
### 7.2. Build and view a SceneModel and a DataModel
example-run:SceneModel_DataModel_build_table
#### Steps
To build this example, first install the npm module:
````bash
npm install @xeokit/sdk
````
Then create an HTML page in `index.html` that contains a canvas element:
example-html:SceneModel_DataModel_build_table
Then create JavaScript in `index.js` to view the table model in the canvas.
example-steps:SceneModel_DataModel_build_table
example-javascript:SceneModel_DataModel_build_table

---

