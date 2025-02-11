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
- [5. Modules](#5-modules)
    * [5.1. Scene](#51-scene)
    * [5.3. Data](#53-data)
    * [5.2 Viewer](#52-viewer)
    * [5.3. Model Importers and Exporters](#53-model-importers-and-exporters)
    * [5.4. Model Converters](#54-model-converters)
    * [5.5. BCF Support](#55-bcf-support)
    * [5.6. Collision Detection](#56-collision-detection)
    * [5.7. Utility Libraries](#57-utility-libraries)
- [6. Usage Examples](#6-usage-examples)
    * [6.1. Visualize a glTF Model](#61-visualize-a-gltf-model)

<!-- TOC end -->


<!-- TOC --><a name="1-introduction"></a>

## 1. Introduction

The **xeokit SDK** is an open-source toolkit designed for real-time 3D visualization in web-based **Architecture,
Engineering, and Construction (AEC)**
applications. It enables smooth interaction with large 3D models using **double-precision coordinates**, preventing
floating-point errors.

The SDK features a powerful rendering engine through the **Viewer module**, which supports multiple views, object
interaction, and customizable
lighting. The **Scene module** manages 3D geometry, materials, and model structures, while the **Data module**
integrates semantic metadata for
querying and analysis.

This document introduces the SDK’s architecture, rendering techniques, and its applications in web-based 3D
visualization.

<!-- TOC --><a name="2-resource-links"></a>

## 2. Resource Links

Below are essential resources to help you get started with xeokit SDK:

- [**Live Examples**](../../examples/index.html) – Interactive demos showcasing SDK features.
- [**Model Viewer**](../../models/index.html) – Explore test models imported from various AEC formats.
- [**Source Code**](https://github.com/xeokit/sdk) – Open-source repository under the AGPL3 license.
- [**API Documentation**](../../api-docs.html) – Comprehensive API reference generated with TypeDoc.
- [**Articles & Tutorials**](../../articles/index.html) – Guides on using the SDK effectively.
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

- **Advanced AEC Graphics Toolkit** – Tools for building, loading, converting, saving, viewing, and interacting with 3D
  models.
- **Multi-Model Viewing** – Display multiple federated models simultaneously.
- **Support for Multiple Formats** – IFC, glTF, LAS/LAZ, CityJSON, XKT, XGF, .BIM, and more.
- **Multi-Canvas Support** – Display models in multiple canvases with independent settings.
- **Double-Precision Coordinates** – Accurately position and align geospatial models.
- **Optimized Loading** – Pre-convert large models to doc:XGF format for faster performance.
- **High-Performance Rendering** – Built specifically for complex AEC models.
- **Interactive Effects** – Slice, x-ray, highlight, and select objects.
- **BCF Collaboration** - Iteroperate with other BIM software through exchange of BCF viewpoints.
- **Natively TypeScript** – Strongly-typed components with clear API contracts.

<!-- TOC --><a name="5-modules"></a>

## 5. Modules

The xeokit SDK follows modular design principles, ensuring flexibility and scalability across web and Node.js
environments.
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

<!-- TOC --><a name="51-scene"></a>

### 5.1. Scene

The SDK represents models in a scene graph, implemented by the doc:Scene class, that contains the model's 3D objects,
geometries, and materials. This scene
graph works on
both the browser and NodeJS platforms and can be used to create models, convert between model formats, and provide
content for the
SDK's model viewer. Note that the scene is viewer-agnostic.

| Modules                                                                             | Description                                                           |
|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------|
| [`@xeokit/sdk/scene`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/scene.html) | Contains model geometric representations (geometries, materials etc.) |

[![](https://mermaid.ink/img/pako:eNqNVE1vozAQ_StoTrsVjSDNlpTrVuplo5WanlZcXHuaeAUY2aZKNsp_38FAYz5SlYvxm-c3n_YJuBIIKfCcGfMo2U6zIiuF1MitVGXw6zkrA_c5RrDlWOKpxxyukVnckEz-7fvAkCPTQ6hoWMZH1Otf8vQBnWe8OWnPpRSX_9HxxgWaPfrADlWBVssBaPFga41btDOoB7XJ_XZe_FS6pMnXFH1qHR6nlpdW_6qBwvFtr7XMhQ8INFYrT3iuXG2wgxb5FRtXaCTRpBRcKTZXudKXrVb1bl-i8cpFebN8CKmKcWmPHodRMw6Xfdcfj3FpzpUgu3LNxznPJbFP0-poo1RyyZ_7LCcMxXleG7okEwsW0hj5jiPDKLJ-Tq7FVWlZSEsyHqSMbK6leUSuiopG1WxG5azfPzF-nP_ZEVAMTs7Bkl4DPpmXfutGLsggzuDm9pbWxeImA-_iDogOucJu5_YrujPMFprym3HuiW60PQaZn0az5w3LQGpF3FEzZ9RevLntaf0KIRSoCyYFPbau4RnYPRaYQUq_At9YndsMsvJMVFZbtT2WHFKrawyhrgS9Et3zDOkbyw2hKKRVetM94M0SQsVKSE9wgDS-_7FIkiheP8SrVXJ3v74L4QhpdA7hn1KkEi-i9ltGyXL5ECVrd_yPM7Z-3RXv_J3_A-vIyXI?type=png)](https://mermaid.live/edit#pako:eNqNVE1vozAQ_StoTrsVjSDNlpTrVuplo5WanlZcXHuaeAUY2aZKNsp_38FAYz5SlYvxm-c3n_YJuBIIKfCcGfMo2U6zIiuF1MitVGXw6zkrA_c5RrDlWOKpxxyukVnckEz-7fvAkCPTQ6hoWMZH1Otf8vQBnWe8OWnPpRSX_9HxxgWaPfrADlWBVssBaPFga41btDOoB7XJ_XZe_FS6pMnXFH1qHR6nlpdW_6qBwvFtr7XMhQ8INFYrT3iuXG2wgxb5FRtXaCTRpBRcKTZXudKXrVb1bl-i8cpFebN8CKmKcWmPHodRMw6Xfdcfj3FpzpUgu3LNxznPJbFP0-poo1RyyZ_7LCcMxXleG7okEwsW0hj5jiPDKLJ-Tq7FVWlZSEsyHqSMbK6leUSuiopG1WxG5azfPzF-nP_ZEVAMTs7Bkl4DPpmXfutGLsggzuDm9pbWxeImA-_iDogOucJu5_YrujPMFprym3HuiW60PQaZn0az5w3LQGpF3FEzZ9RevLntaf0KIRSoCyYFPbau4RnYPRaYQUq_At9YndsMsvJMVFZbtT2WHFKrawyhrgS9Et3zDOkbyw2hKKRVetM94M0SQsVKSE9wgDS-_7FIkiheP8SrVXJ3v74L4QhpdA7hn1KkEi-i9ltGyXL5ECVrd_yPM7Z-3RXv_J3_A-vIyXI)

<br>

<!-- TOC --><a name="53-data"></a>

### 5.3. Data

The SDK employs a generic entity-relationship data graph, implemented by the doc:Data class, to manage model semantics,
which includes entities, properties,
and
relationships. This data graph is compatible with both the browser and NodeJS and facilitates model generation, format
conversion,
and content navigation within the SDK's model viewer. Note that the data graph is agnostic of both the viewer and
the scene.

| Modules                                                                           | Description                                                                  |
|-----------------------------------------------------------------------------------|------------------------------------------------------------------------------|
| [`@xeokit/sdk/data`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/data.html) | Entity-relationship graph that contains model semantic data.                 |

[![](https://mermaid.ink/img/pako:eNqNVMFunDAU_BX0Tu1qgxaW9QLnHBOlSm4VFwc7WVeAkTFV6Wr_vcZmu89A0nIBzxvPmzdGPkMpGYccyop23b2g74rWRcOE4qUWsgkenosmsI9lBPdU0_MVcrjiVPNHI1N9-epVOk5VeXp6_WG0ulmtrExxhtWjRudB0m32sFbJlis9vHC_cP2-LB1bd9i2YGixbLLewk3q5sHWHf7MKzpG1p1Eu6x-uyni4msvKoYBxjut5HCDVqZxDrxT8OYJ9NByvF4bZ6aL_CFhLDuJCP4viQAJNLRGTn7SqkdLbHOmhcPEev5kyrKadxfIDOfMh_92GCMMCogK2NzdmXcYbgq4_SaYZoF1ri_-seaS5xDD3kzsnWOjI_hA9hPWwuk61cvVCl7JN2f5eqz_v3WePPKxzOhanMiwhZqrmgpmLiV78AXoEzd_EeTmk_E32le6gKK5GCrttXwZmhJyrXq-hb5lpv10jUH-RqvOoC1tID_DL8hjEoVRdDxEJE73GSHZYQuDgeMwyY7kkGTRMSbp_nDZwm8pjcIuTGOSJGS_yxKSpjvD50xoqR6na3N82Q7fLX-0cfkD0IeHkg?type=png)](https://mermaid.live/edit#pako:eNqNVMFunDAU_BX0Tu1qgxaW9QLnHBOlSm4VFwc7WVeAkTFV6Wr_vcZmu89A0nIBzxvPmzdGPkMpGYccyop23b2g74rWRcOE4qUWsgkenosmsI9lBPdU0_MVcrjiVPNHI1N9-epVOk5VeXp6_WG0ulmtrExxhtWjRudB0m32sFbJlis9vHC_cP2-LB1bd9i2YGixbLLewk3q5sHWHf7MKzpG1p1Eu6x-uyni4msvKoYBxjut5HCDVqZxDrxT8OYJ9NByvF4bZ6aL_CFhLDuJCP4viQAJNLRGTn7SqkdLbHOmhcPEev5kyrKadxfIDOfMh_92GCMMCogK2NzdmXcYbgq4_SaYZoF1ri_-seaS5xDD3kzsnWOjI_hA9hPWwuk61cvVCl7JN2f5eqz_v3WePPKxzOhanMiwhZqrmgpmLiV78AXoEzd_EeTmk_E32le6gKK5GCrttXwZmhJyrXq-hb5lpv10jUH-RqvOoC1tID_DL8hjEoVRdDxEJE73GSHZYQuDgeMwyY7kkGTRMSbp_nDZwm8pjcIuTGOSJGS_yxKSpjvD50xoqR6na3N82Q7fLX-0cfkD0IeHkg)

<br>

<!-- TOC --><a name="52-viewer"></a>

### 5.2 Viewer

The SDK features a high-performance 3D web viewer, implemented by the doc:Viewer class, for viewing scene models in the
browser. With
a pluggable renderer strategy, it can be adapted to any browser graphics API, including WebGL and WebGPU. The viewer
enables
simultaneous visualization of multiple models, and allows the creation of multiple separate canvases with customizable
elements
such as lights, section planes, and annotations, providing flexible multi-view model display.

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

<!-- TOC --><a name="53-model-importers-and-exporters"></a>

### 5.3. Model Importers and Exporters

The SDK provides functions for importing and exporting its model representations and semantics as industry-standard
AECO file formats. These functions can be used in NodeJS scripts for file format conversion or in the browser to load
various file formats into the web viewer.

| Modules                                                                                   | Description                  |
|-------------------------------------------------------------------------------------------|------------------------------|
| [`@xeokit/sdk/xgf`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/xgf.html)           | Import and export XKT        |
| [`@xeokit/sdk/dotbim`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/dotbim.html)     | Import and export .BIM |
| [`@xeokit/sdk/gltf`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/gltf.html)         | Import glTF                  |
| [`@xeokit/sdk/las`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/las.html)           | Import LAS/LAZ               |
| [`@xeokit/sdk/cityjson`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/cityjson.html) | Import CityJSON        |
| [`@xeokit/sdk/webifc`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/webifc.html)     | Import IFC             |

<br>

<!-- TOC --><a name="54-model-converters"></a>

### 5.4. Model Converters

The SDK provides CLI tools to convert various model formats into the SDK's own optimized format, XGF, which can then
be loaded efficiently into the web viewer.

| Modules                                                                                                          | Description                    |
|------------------------------------------------------------------------------------------------------------------|--------------------------------|
| [`@xeokit/sdk/cityjson2xgf`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/cityjson2xgf.html)  | Converts CityJSON to XGF       |
| [`@xeokit/sdk/dotbim2xgf`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/dotbim2xgf.html)      | Converts .BIM to XGF           |
| [`@xeokit/sdk/gltf2xgf`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/gltf2xgf.html)          | Converts glTF to XGF           |
| [`@xeokit/sdk/ifc2gltf2xgf`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/ifc2gltf2xgf.html)  | Converts ifc2glf output to XGF |
| [`@xeokit/sdk/las2xgf`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/las2xgf.html)            | Converts LAS/LAZ to XGF        |
| [`@xeokit/sdk/webifc2xgf`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/webifc2xgf.html)      | Converts IFC to XGF            |

<br>

<!-- TOC --><a name="55-bcf-support"></a>

### 5.5. BCF Support

The SDK offers functions for sharing bookmarks of web viewer state with other BIM software as industry-standard BCF
Viewpoints. These functions can be used to develop applications that facilitate collaboration on construction projects.

| Modules                                                                         | Description                                          |
|---------------------------------------------------------------------------------|------------------------------------------------------|
| [`@xeokit/sdk/bcf`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/bcf.html) | Load and save BCF                    |

<br>

<!-- TOC --><a name="56-collision-detection"></a>

### 5.6. Collision Detection

The SDK provides collision detection utilities that can be used to build various acceleration and selection mechanisms.
Intended
applications for our collision library include 3D frustum culling, ray-picking, marquee box selection and more.

| Modules                                                                                           | Description                                                    |
|---------------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| [`@xeokit/sdk/kdtree2`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/kdtree2.html) | Searches and collision tests with 2D k-d trees and boundaries  |
| [`@xeokit/sdk/kdtree3`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/kdtree3.html) | Ssearches and collision tests with 3D k-d trees and boundaries |
| [`@xeokit/sdk/pick`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/pick.html)       | Select objects and primitives using rays and boundaries        |

<br>

<!-- TOC --><a name="57-utility-libraries"></a>

### 5.7. Utility Libraries

The SDK's internal and lower-level functionalities are mostly available as utility libraries with complete
documentation.

| Modules                                                                                            | Description                                          |
|----------------------------------------------------------------------------------------------------|------------------------------------------------------|
| [`@xeokit/sdk/components`](./docs/modules/core.html)                            | Basic component types used throughout the xeokit SDK |
| [`@xeokit/sdk/constants`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/constants.html) | Constants used throughout the xeokit SDK             |
| [`@xeokit/sdk/utils`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/utils.html)     | Core utilities used throughout the xeokit SDK        |
| [`@xeokit/sdk/basictypes`](/docs/api/modules/basictypes.html)                                      | Basic semantic data type constants                   |
| [`@xeokit/sdk/ifctypes`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/ifcTypes.html) | IFC data type constants                              |
| [`@xeokit/sdk/math/math`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/math.html)  | General math definitions and constants               |
| [`@xeokit/sdk/boundaries`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/boundaries.html) | Boundaries math library                              |
| [`@xeokit/sdk/compression`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/compression.html) | SceneGeometry de/compression utilities library       |
| [`@xeokit/sdk/curves`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/curves.html)   | Spline curves math library                           |
| [`@xeokit/sdk/procgen`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/procgen.html) | Geometry generation functions                        |
| [`@xeokit/sdk/matrix`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/matrix.html)   | Matrix and vector math utilities library             |
| [`@xeokit/sdk/rtc`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/rtc.html)         | Relative-to-center (RTC) coordinates math library    |
| [`@xeokit/sdk/webglutils`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/webglutils.html) | WebGL utilities library                              |
| [`@xeokit/sdk/ktx2`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/ktx2.html)       | Compressed texture support                           |

<!-- TOC --><a name="6-usage-examples"></a>

## 6. Usage Examples

---

<!-- TOC --><a name="61-visualize-a-gltf-model"></a>

### 6.1. View a .BIM model and hide all IfcSpaces

example-run:SceneModel_build_table

---

example-html:SceneModel_build_box_compressedGeometry

example-javascript:SceneModel_build_box_compressedGeometry

First install the npm module:

````bash
npm install @xeokit/sdk
````

Then create an HTML page in `index.html` that contains a canvas element:

````html
<!DOCTYPE html>
<html>
<head>
    <title>xeokit .BIM Model Viewer</title>
</head>
<body>
<canvas id="myView1"></canvas>
</body>
<script type="module" src="./index.js"></script>
</html>
````

Then create JavaScript in `index.js` to view a .BIM model in the canvas.

1. Import the modules we need.
2. Create a doc:Viewer with a doc:WebGLRenderer and a doc:Scene.
3. Create a doc:Data to hold model semantics.
4. In the Viewer, create a doc:View that draws to the canvas.
5. Position the View's doc:Camera to look at the center of the 3D coordinate system (default).
6. Create a doc:SceneModel in the Scene.
7. Create a doc:DataModel in the Data.
8. Use doc:loadDotBIM to load a .BIM building model into the SceneModel and DataModel.
9. Build the SceneModel and the DataModel. The SceneModel's objects will then appear in the View's canvas.
10. Get all the doc:DataObject instances in Data that represent doc:IfcSpace elements in the model.
11. For each of those DataObjects, get the corresponding doc:SceneObject and doc:ViewObject.
11. Set those ViewObjects invisible, to ensure that we can see the model objects that are within each IfcSpace.

````javascript
// 1.
import {Scene} from "@xeokit/sdk/scene";
import {Viewer} from "@xeokit/sdk/viewer";
import {WebGLRenderer} from "@xeokit/sdk/webglrenderer";
import {loadDotBIM} from "@xeokit/sdk/dotbim";
import {IfcSpace} from "@xeokit/sdk/ifctypes";

// 2.
const scene = new Scene();
const renderer = new WebGLRenderer({});
const viewer = new Viewer({scene, renderer});

// 3.
const data = new Data();

// 4.
const view = myViewer.createView({id: "myView", canvasId: "myView1"});

// 5.
view.camera.eye = [0, 0, 10]; // Looking down the -Z axis
view.camera.look = [0, 0, 0];
view.camera.up = [0, 1, 0];

// 6.
const sceneModel = scene.createModel({id: "myModel"});

// 7.
const dataModel = data.createModel({id: "myModel"});

// 8.
fetch("myModel.bim").then(response => {
    response.json().then(fileData => {

        loadDotBIM({fileData, sceneModel, dataModel}).then(() => {

            // 9.
            sceneModel.build().then(() => {
                dataModel.build().then(() => {

                    // 10.
                    const dataObjects = data.objectsByType[IfcSpace];
                    if (dataObjects) {
                        dataObjects.forEach(([objectId, dataObject]) => {

                            const sceneObject = scene.objects[objectId]; // SceneObject
                            const viewObject = view.objects[objectId]; // ViewObject

                            // Note: 
                            // dataObject.id === sceneObject.id === viewObject.id
                            // dataObject.type === IfcSpace

                            // 11.
                            viewObject.visible = false;
                        });
                    }
                });
            });
        });
    });
});
````


