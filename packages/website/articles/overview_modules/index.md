# Table of Contents

- [Introduction](#introduction)
- [Scene](#61-scene)
- [Viewer](#62-viewer)
- [Data](#63-data)
- [Model Importers and Exporters](#64-model-importers-and-exporters)
- [Model Converters](#65-model-converters)
- [BCF Support](#66-bcf-support)
- [Collision Detection](#67-collision-detection)
- [Utility Libraries](#68-utility-libraries)

### Introduction

The xeokit SDK is built with a modular design for maximum flexibility and scalability in both browser and Node.js
environments. It follows best practices such as:

- [Separation of Concerns](https://en.wikipedia.org/wiki/Separation_of_concerns)
- [Single Responsibility Principle](https://en.wikipedia.org/wiki/Single-responsibility_principle)
- [Open-Closed Principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle)

Main modules include:

- **Scene** – Manages 3D model objects.
- **Data** – Provides a searchable entity-relationship data model.
- **Viewer** – Enables interactive 3D model visualization.
- **Importers/Exporters** – Load and save various AECO formats.
- **Converters** – CLI tools to convert models to an optimized format.
- **BCF Support** – Tools for BIM collaboration.
- **Collision Detection** – Utilities for frustum culling, ray-picking, etc.
- **Utilities** – Core functionalities like math operations and 3D graphics.

<!-- 6.1. Scene -->
<a name="61-scene"></a>

### Scene

The Scene module (doc:Scene) represents the model using a scene graph that holds 3D objects, geometries, and materials.
This scene graph is agnostic of the viewer and the scene. It works on both the browser and NodeJS platforms and can be
used to create models, convert between model formats, and provide content for the SDK's model viewer.

| Module | Description |
|--------|-------------|
| [`@xeokit/sdk/scene`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/scene.html)
| Handles model geometries, materials, and more. |

[![](https://mermaid.ink/img/pako:eNqNVE1vozAQ_StoTrsVjSDNlpTrVuplo5WanlZcXHuaeAUY2aZKNsp_38FAYz5SlYvxm-c3n_YJuBIIKfCcGfMo2U6zIiuF1MitVGXw6zkrA_c5RrDlWOKpxxyukVnckEz-7fvAkCPTQ6hoWMZH1Otf8vQBnWe8OWnPpRSX_9HxxgWaPfrADlWBVssBaPFga41btDOoB7XJ_XZe_FS6pMnXFH1qHR6nlpdW_6qBwvFtr7XMhQ8INFYrT3iuXG2wgxb5FRtXaCTRpBRcKTZXudKXrVb1bl-i8cpFebN8CKmKcWmPHodRMw6Xfdcfj3FpzpUgu3LNxznPJbFP0-poo1RyyZ_7LCcMxXleG7okEwsW0hj5jiPDKLJ-Tq7FVWlZSEsyHqSMbK6leUSuiopG1WxG5azfPzF-nP_ZEVAMTs7Bkl4DPpmXfutGLsggzuDm9pbWxeImA-_iDogOucJu5_YrujPMFprym3HuiW60PQaZn0az5w3LQGpF3FEzZ9RevLntaf0KIRSoCyYFPbau4RnYPRaYQUq_At9YndsMsvJMVFZbtT2WHFKrawyhrgS9Et3zDOkbyw2hKKRVetM94M0SQsVKSE9wgDS-_7FIkiheP8SrVXJ3v74L4QhpdA7hn1KkEi-i9ltGyXL5ECVrd_yPM7Z-3RXv_J3_A-vIyXI?type=png)](https://mermaid.live/edit#pako:eNqNVE1vozAQ_StoTrsVjSDNlpTrVuplo5WanlZcXHuaeAUY2aZKNsp_38FAYz5SlYvxm-c3n_YJuBIIKfCcGfMo2U6zIiuF1MitVGXw6zkrA_c5RrDlWOKpxxyukVnckEz-7fvAkCPTQ6hoWMZH1Otf8vQBnWe8OWnPpRSX_9HxxgWaPfrADlWBVssBaPFga41btDOoB7XJ_XZe_FS6pMnXFH1qHR6nlpdW_6qBwvFtr7XMhQ8INFYrT3iuXG2wgxb5FRtXaCTRpBRcKTZXudKXrVb1bl-i8cpFebN8CKmKcWmPHodRMw6Xfdcfj3FpzpUgu3LNxznPJbFP0-poo1RyyZ_7LCcMxXleG7okEwsW0hj5jiPDKLJ-Tq7FVWlZSEsyHqSMbK6leUSuiopG1WxG5azfPzF-nP_ZEVAMTs7Bkl4DPpmXfutGLsggzuDm9pbWxeImA-_iDogOucJu5_YrujPMFprym3HuiW60PQaZn0az5w3LQGpF3FEzZ9RevLntaf0KIRSoCyYFPbau4RnYPRaYQUq_At9YndsMsvJMVFZbtT2WHFKrawyhrgS9Et3zDOkbyw2hKKRVetM94M0SQsVKSE9wgDS-_7FIkiheP8SrVXJ3v74L4QhpdA7hn1KkEi-i9ltGyXL5ECVrd_yPM7Z-3RXv_J3_A-vIyXI)

<!-- 6.2. Viewer -->
<a name="62-viewer"></a>

### Viewer

The Viewer module (doc:Viewer) offers a high-performance 3D viewer for browsers with a pluggable rendering strategy (
WebGL/WebGPU). It allows for:

- Simultaneous visualization of multiple models.
- Creation of multiple canvases with customizable elements (lights, section planes, annotations).

| Module | Description |
|--------|-------------|
| [`@xeokit/sdk/viewer`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/viewer.html)
| Main browser-based model Viewer |
| [`@xeokit/sdk/cameracontrol`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/cameracontrol.html)
| Interactive camera control |
| [`@xeokit/sdk/cameraflight`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/cameraflight.html)
| Animates camera transitions |
| [`@xeokit/sdk/webglrenderer`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/webglrenderer.html)
| WebGL rendering implementation |
| [`@xeokit/sdk/treeview`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/treeview.html)
| HTML tree widget for model hierarchy |
| [`@xeokit/sdk/locale`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/locale.html)
| Localization service for Viewer |

- [![](https://mermaid.ink/img/pako:eNqNVUtv2kAQ_ivWntoKUEyMAQtxIVJ7ADWCPqTKl7U9CZssu-7apnEI_737dGweVX3xeuabb97rA0p5BihCKcVFcUfwo8C7mGVEQFoSzrzlOmZa5_0g8AeEd4iZZx4BLAMBwgiKFBiY414iC3NMBeASlOmHj0YSs2Ob0fGlmO2xNeLJk_TuGPAOBDZnSh63Tl6YAO8pZmBFFNcgOo6XSuI8G9GmZdfVLBW7EnUC1BQuSpJdiPB3hSkp67Uux4n1Vw08Nd-TgiQUXCJUQsCqtjIInaYTvAgZgD2nnHJBXq1hSkme44YnJ-nz-xfGSdKKZaGr6OKAGjxbMs6fzanKLY3gT6ZELfN20RxJzgvPsshxaff1jghdS4dUagfVKXSmYG3HSKNnM5wUpcBpOZ-3MD8h-bzsALWyCU_NnvO2kwNNL06S7vJKqZvGU8Ci03JNpTH_7LnhMt11ZElFaOY-MpBp8Pqc-3widCJmu2Lkx6jfn-v3utmvC8qNWTfzahSfrMI4uarW-VmtOV9lOHUt9UoU2R1X5zOlsY2agr3LNKSTgsXKKcgFFMDKwiPM-_JttWyuhIs-9FpGbuMbSYxuBoP_CKdTy4W9Ys4cuUGO3MVzhmgvhmpjM6Ozt37_ZGwjj-xyCjuV5CXk_fcr0PYKLziTc9UMp75r9Qh11J0y-KYMqIckYodJJq97bR6jcit9xCiSxwwecEVlhySbhOKq5JuapSgqRQU9VOWZHHj7g0DRA6aFlEJGSi5W9heiXj2UY4aiA3pB0TD0B74_HvnhcHI7DcPpqIdqKR4Oguk4HAVTfzwMJ7ejYw-9ci5ZbwaTYRgE4XAajCfBKBhNNd0vrVRxHP8CUYMzSw?type=png)](https://mermaid.live/edit#pako:eNqNVUtv2kAQ_ivWntoKUEyMAQtxIVJ7ADWCPqTKl7U9CZssu-7apnEI_737dGweVX3xeuabb97rA0p5BihCKcVFcUfwo8C7mGVEQFoSzrzlOmZa5_0g8AeEd4iZZx4BLAMBwgiKFBiY414iC3NMBeASlOmHj0YSs2Ob0fGlmO2xNeLJk_TuGPAOBDZnSh63Tl6YAO8pZmBFFNcgOo6XSuI8G9GmZdfVLBW7EnUC1BQuSpJdiPB3hSkp67Uux4n1Vw08Nd-TgiQUXCJUQsCqtjIInaYTvAgZgD2nnHJBXq1hSkme44YnJ-nz-xfGSdKKZaGr6OKAGjxbMs6fzanKLY3gT6ZELfN20RxJzgvPsshxaff1jghdS4dUagfVKXSmYG3HSKNnM5wUpcBpOZ-3MD8h-bzsALWyCU_NnvO2kwNNL06S7vJKqZvGU8Ci03JNpTH_7LnhMt11ZElFaOY-MpBp8Pqc-3widCJmu2Lkx6jfn-v3utmvC8qNWTfzahSfrMI4uarW-VmtOV9lOHUt9UoU2R1X5zOlsY2agr3LNKSTgsXKKcgFFMDKwiPM-_JttWyuhIs-9FpGbuMbSYxuBoP_CKdTy4W9Ys4cuUGO3MVzhmgvhmpjM6Ozt37_ZGwjj-xyCjuV5CXk_fcr0PYKLziTc9UMp75r9Qh11J0y-KYMqIckYodJJq97bR6jcit9xCiSxwwecEVlhySbhOKq5JuapSgqRQU9VOWZHHj7g0DRA6aFlEJGSi5W9heiXj2UY4aiA3pB0TD0B74_HvnhcHI7DcPpqIdqKR4Oguk4HAVTfzwMJ7ejYw-9ci5ZbwaTYRgE4XAajCfBKBhNNd0vrVRxHP8CUYMzSw)

<!-- 6.3. Data -->
<a name="63-data"></a>

### Data

The Data module (doc:Data) implements an entity-relationship graph to manage model semantics (entities, properties,
relationships). It is agnostic of the viewer and scene.

| Module | Description |
|--------|-------------|
| [`@xeokit/sdk/data`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/data.html)
| Manages model semantic data |

[![](https://mermaid.ink/img/pako:eNqNVMFunDAU_BX0Tu1qgxaW9QLnHBOlSm4VFwc7WVeAkTFV6Wr_vcZmu89A0nIBzxvPmzdGPkMpGYccyop23b2g74rWRcOE4qUWsgkenosmsI9lBPdU0_MVcrjiVPNHI1N9-epVOk5VeXp6_WG0ulmtrExxhtWjRudB0m32sFbJlis9vHC_cP2-LB1bd9i2YGixbLLewk3q5sHWHf7MKzpG1p1Eu6x-uyni4msvKoYBxjut5HCDVqZxDrxT8OYJ9NByvF4bZ6aL_CFhLDuJCP4viQAJNLRGTn7SqkdLbHOmhcPEev5kyrKadxfIDOfMh_92GCMMCogK2NzdmXcYbgq4_SaYZoF1ri_-seaS5xDD3kzsnWOjI_hA9hPWwuk61cvVCl7JN2f5eqz_v3WePPKxzOhanMiwhZqrmgpmLiV78AXoEzd_EeTmk_E32le6gKK5GCrttXwZmhJyrXq-hb5lpv10jUH-RqvOoC1tID_DL8hjEoVRdDxEJE73GSHZYQuDgeMwyY7kkGTRMSbp_nDZwm8pjcIuTGOSJGS_yxKSpjvD50xoqR6na3N82Q7fLX-0cfkD0IeHkg?type=png)](https://mermaid.live/edit#pako:eNqNVMFunDAU_BX0Tu1qgxaW9QLnHBOlSm4VFwc7WVeAkTFV6Wr_vcZmu89A0nIBzxvPmzdGPkMpGYccyop23b2g74rWRcOE4qUWsgkenosmsI9lBPdU0_MVcrjiVPNHI1N9-epVOk5VeXp6_WG0ulmtrExxhtWjRudB0m32sFbJlis9vHC_cP2-LB1bd9i2YGixbLLewk3q5sHWHf7MKzpG1p1Eu6x-uyni4msvKoYBxjut5HCDVqZxDrxT8OYJ9NByvF4bZ6aL_CFhLDuJCP4viQAJNLRGTn7SqkdLbHOmhcPEev5kyrKadxfIDOfMh_92GCMMCogK2NzdmXcYbgq4_SaYZoF1ri_-seaS5xDD3kzsnWOjI_hA9hPWwuk61cvVCl7JN2f5eqz_v3WePPKxzOhanMiwhZqrmgpmLiV78AXoEzd_EeTmk_E32le6gKK5GCrttXwZmhJyrXq-hb5lpv10jUH-RqvOoC1tID_DL8hjEoVRdDxEJE73GSHZYQuDgeMwyY7kkGTRMSbp_nDZwm8pjcIuTGOSJGS_yxKSpjvD50xoqR6na3N82Q7fLX-0cfkD0IeHkg)

<!-- 6.4. Model Importers and Exporters -->
<a name="64-model-importers-and-exporters"></a>

### Model Importers and Exporters

These functions allow you to import and export model representations and semantic data in various AECO formats, either
in Node.js (for file conversion) or in the browser.

| Module | Description |
|--------|-------------|
| [`@xeokit/sdk/xgf`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/xgf.html)
| Handles import/export of XKT |
| [`@xeokit/sdk/dotbim`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/dotbim.html)
| Handles import/export of .BIM |
| [`@xeokit/sdk/gltf`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/gltf.html)
| Imports glTF |
| [`@xeokit/sdk/las`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/las.html)
| Imports LAS/LAZ |
| [`@xeokit/sdk/cityjson`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/cityjson.html)
| Imports CityJSON |
| [`@xeokit/sdk/webifc`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/webifc.html)
| Imports IFC |

<!-- 6.5. Model Converters -->
<a name="65-model-converters"></a>

### Model Converters

Command-line tools to convert various model formats into the SDK’s optimized XGF format.

| Module | Description |
|--------|-------------|
| [`@xeokit/sdk/cityjson2xgf`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/cityjson2xgf.html)
| Converts CityJSON to XGF |
| [`@xeokit/sdk/dotbim2xgf`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/dotbim2xgf.html)
| Converts .BIM to XGF |
| [`@xeokit/sdk/gltf2xgf`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/gltf2xgf.html)
| Converts glTF to XGF |
| [`@xeokit/sdk/ifc2gltf2xgf`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/ifc2gltf2xgf.html)
| Converts IFC output to XGF |
| [`@xeokit/sdk/las2xgf`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/las2xgf.html)
| Converts LAS/LAZ to XGF |
| [`@xeokit/sdk/webifc2xgf`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/webifc2xgf.html)
| Converts IFC to XGF |

<!-- 6.6. BCF Support -->
<a name="66-bcf-support"></a>

### BCF Support

These functions allow sharing viewer state as industry-standard BCF Viewpoints for collaboration.

| Module | Description |
|--------|-------------|
| [`@xeokit/sdk/bcf`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/bcf.html)
| Load and save BCF |

<!-- 6.7. Collision Detection -->
<a name="67-collision-detection"></a>

### Collision Detection

Collision detection utilities support functions like frustum culling, ray-picking, and marquee selection.

| Module | Description |
|--------|-------------|
| [`@xeokit/sdk/kdtree2`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/kdtree2.html)
| 2D k-d tree search and collision tests |
| [`@xeokit/sdk/kdtree3`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/kdtree3.html)
| 3D k-d tree search and collision tests |
| [`@xeokit/sdk/pick`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/pick.html)
| Object selection using rays and boundaries |

<!-- 6.8. Utility Libraries -->
<a name="68-utility-libraries"></a>

### Utility Libraries

A collection of low-level utility libraries used throughout the SDK.

| Module | Description |
|--------|-------------|
| [`@xeokit/sdk/components`](./docs/modules/core.html) | Core component types |
| [`@xeokit/sdk/constants`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/constants.html)
| Constants used throughout the SDK |
| [`@xeokit/sdk/utils`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/utils.html)
| Core utility functions |
| [`@xeokit/sdk/basictypes`](https://xeokit.github.io/sdk/api-docs.html) | Basic semantic data type constants |
| [`@xeokit/sdk/ifctypes`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/ifcTypes.html)
| IFC data type constants |
| [`@xeokit/sdk/math/math`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/math.html)
| Math definitions and constants |
| [`@xeokit/sdk/boundaries`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/boundaries.html)
| Boundary math functions |
| [`@xeokit/sdk/compression`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/compression.html)
| Geometry compression utilities |
| [`@xeokit/sdk/curves`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/curves.html)
| Spline curves math library |
| [`@xeokit/sdk/procgen`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/procgen.html)
| Procedural geometry generation |
| [`@xeokit/sdk/matrix`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/matrix.html)
| Matrix and vector math utilities |
| [`@xeokit/sdk/rtc`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/rtc.html)
| Relative-to-center (RTC) coordinate math |
| [`@xeokit/sdk/webglutils`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/webglutils.html)
| WebGL utility functions |
| [`@xeokit/sdk/ktx2`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/ktx2.html)
| Compressed texture support |
