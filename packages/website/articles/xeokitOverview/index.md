## 1. Overview

---

The **xeokit SDK** offers a comprehensive set of modules for managing, visualizing, and 
converting 3D AECO models in both web and Node.js environments. Designed with **Separation of Concerns**, 
**Single Responsibility**, and the **Open-Closed Principle**, the SDK provides a flexible toolkit of 
components that applications can leverage to support a wide range of use cases.

The SDK is organized into the following module categories:

- **Scene** – A container for 3D model objects, compatible with both Node.js and browsers.
- **Data** – A searchable entity-relationship data model.
- **Viewer** – Attaches to a Scene for interactive viewing in the browser.
- **Importers** – Load supported AECO model formats into Scene and Data.
- **Exporters** – Save Scene and Data in supported AECO formats.
- **Converters** – CLI tools for converting between AECO model formats.
- **Utilities** – Low-level functions and classes for 3D graphics, math, and more.

TODO:

- Notes about repository organization
-   SDK and Website
- turbrepo
etc

## 2. xeokit SDK Modules

---

<br>

### 2.1. xeokit Scene

The SDK represents models in a scene graph, implemented by the doc:Scene class, that contains the model's 3D objects, geometries, and materials. This scene
graph works on
both the browser and NodeJS platforms and can be used to create models, convert between model formats, and provide
content for the
SDK's model viewer. Note that the scene is viewer-agnostic.

| Modules                                                                             | Description                                                           |
|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------|
| [`@xeokit/sdk/scene`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/scene.html) | Contains model geometric representations (geometries, materials etc.) |

[![](https://mermaid.ink/img/pako:eNqNVE1vozAQ_StoTrsVjSDNlpTrVuplo5WanlZcXHuaeAUY2aZKNsp_38FAYz5SlYvxm-c3n_YJuBIIKfCcGfMo2U6zIiuF1MitVGXw6zkrA_c5RrDlWOKpxxyukVnckEz-7fvAkCPTQ6hoWMZH1Otf8vQBnWe8OWnPpRSX_9HxxgWaPfrADlWBVssBaPFga41btDOoB7XJ_XZe_FS6pMnXFH1qHR6nlpdW_6qBwvFtr7XMhQ8INFYrT3iuXG2wgxb5FRtXaCTRpBRcKTZXudKXrVb1bl-i8cpFebN8CKmKcWmPHodRMw6Xfdcfj3FpzpUgu3LNxznPJbFP0-poo1RyyZ_7LCcMxXleG7okEwsW0hj5jiPDKLJ-Tq7FVWlZSEsyHqSMbK6leUSuiopG1WxG5azfPzF-nP_ZEVAMTs7Bkl4DPpmXfutGLsggzuDm9pbWxeImA-_iDogOucJu5_YrujPMFprym3HuiW60PQaZn0az5w3LQGpF3FEzZ9RevLntaf0KIRSoCyYFPbau4RnYPRaYQUq_At9YndsMsvJMVFZbtT2WHFKrawyhrgS9Et3zDOkbyw2hKKRVetM94M0SQsVKSE9wgDS-_7FIkiheP8SrVXJ3v74L4QhpdA7hn1KkEi-i9ltGyXL5ECVrd_yPM7Z-3RXv_J3_A-vIyXI?type=png)](https://mermaid.live/edit#pako:eNqNVE1vozAQ_StoTrsVjSDNlpTrVuplo5WanlZcXHuaeAUY2aZKNsp_38FAYz5SlYvxm-c3n_YJuBIIKfCcGfMo2U6zIiuF1MitVGXw6zkrA_c5RrDlWOKpxxyukVnckEz-7fvAkCPTQ6hoWMZH1Otf8vQBnWe8OWnPpRSX_9HxxgWaPfrADlWBVssBaPFga41btDOoB7XJ_XZe_FS6pMnXFH1qHR6nlpdW_6qBwvFtr7XMhQ8INFYrT3iuXG2wgxb5FRtXaCTRpBRcKTZXudKXrVb1bl-i8cpFebN8CKmKcWmPHodRMw6Xfdcfj3FpzpUgu3LNxznPJbFP0-poo1RyyZ_7LCcMxXleG7okEwsW0hj5jiPDKLJ-Tq7FVWlZSEsyHqSMbK6leUSuiopG1WxG5azfPzF-nP_ZEVAMTs7Bkl4DPpmXfutGLsggzuDm9pbWxeImA-_iDogOucJu5_YrujPMFprym3HuiW60PQaZn0az5w3LQGpF3FEzZ9RevLntaf0KIRSoCyYFPbau4RnYPRaYQUq_At9YndsMsvJMVFZbtT2WHFKrawyhrgS9Et3zDOkbyw2hKKRVetM94M0SQsVKSE9wgDS-_7FIkiheP8SrVXJ3v74L4QhpdA7hn1KkEi-i9ltGyXL5ECVrd_yPM7Z-3RXv_J3_A-vIyXI)

<br>

### 2.2 xeokit Viewer

The SDK features a high-performance 3D web viewer, implemented by the doc:Viewer class, for viewing scene models in the browser. With 
a pluggable renderer strategy, it can be adapted to any browser graphics API, including WebGL and WebGPU. The viewer enables 
simultaneous visualization of multiple models, and allows the creation of multiple separate canvases with customizable elements 
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

### 2.3. xeokit Data

The SDK employs a generic entity-relationship data graph, implemented by the doc:Data class, to manage model semantics, which includes entities, properties,
and
relationships. This data graph is compatible with both the browser and NodeJS and facilitates model generation, format
conversion,
and content navigation within the SDK's model viewer.

| Modules                                                                           | Description                                                                  |
|-----------------------------------------------------------------------------------|------------------------------------------------------------------------------|
| [`@xeokit/sdk/data`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/data.html) | Entity-relationship graph that contains model semantic data.                 |

[![](https://mermaid.ink/img/pako:eNqNVMFunDAU_BX0Tu1qgxaW9QLnHBOlSm4VFwc7WVeAkTFV6Wr_vcZmu89A0nIBzxvPmzdGPkMpGYccyop23b2g74rWRcOE4qUWsgkenosmsI9lBPdU0_MVcrjiVPNHI1N9-epVOk5VeXp6_WG0ulmtrExxhtWjRudB0m32sFbJlis9vHC_cP2-LB1bd9i2YGixbLLewk3q5sHWHf7MKzpG1p1Eu6x-uyni4msvKoYBxjut5HCDVqZxDrxT8OYJ9NByvF4bZ6aL_CFhLDuJCP4viQAJNLRGTn7SqkdLbHOmhcPEev5kyrKadxfIDOfMh_92GCMMCogK2NzdmXcYbgq4_SaYZoF1ri_-seaS5xDD3kzsnWOjI_hA9hPWwuk61cvVCl7JN2f5eqz_v3WePPKxzOhanMiwhZqrmgpmLiV78AXoEzd_EeTmk_E32le6gKK5GCrttXwZmhJyrXq-hb5lpv10jUH-RqvOoC1tID_DL8hjEoVRdDxEJE73GSHZYQuDgeMwyY7kkGTRMSbp_nDZwm8pjcIuTGOSJGS_yxKSpjvD50xoqR6na3N82Q7fLX-0cfkD0IeHkg?type=png)](https://mermaid.live/edit#pako:eNqNVMFunDAU_BX0Tu1qgxaW9QLnHBOlSm4VFwc7WVeAkTFV6Wr_vcZmu89A0nIBzxvPmzdGPkMpGYccyop23b2g74rWRcOE4qUWsgkenosmsI9lBPdU0_MVcrjiVPNHI1N9-epVOk5VeXp6_WG0ulmtrExxhtWjRudB0m32sFbJlis9vHC_cP2-LB1bd9i2YGixbLLewk3q5sHWHf7MKzpG1p1Eu6x-uyni4msvKoYBxjut5HCDVqZxDrxT8OYJ9NByvF4bZ6aL_CFhLDuJCP4viQAJNLRGTn7SqkdLbHOmhcPEev5kyrKadxfIDOfMh_92GCMMCogK2NzdmXcYbgq4_SaYZoF1ri_-seaS5xDD3kzsnWOjI_hA9hPWwuk61cvVCl7JN2f5eqz_v3WePPKxzOhanMiwhZqrmgpmLiV78AXoEzd_EeTmk_E32le6gKK5GCrttXwZmhJyrXq-hb5lpv10jUH-RqvOoC1tID_DL8hjEoVRdDxEJE73GSHZYQuDgeMwyY7kkGTRMSbp_nDZwm8pjcIuTGOSJGS_yxKSpjvD50xoqR6na3N82Q7fLX-0cfkD0IeHkg)

<br>

### 2.4. xeokit Model Importers and Exporters

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

### 2.5. xeokit Model Converters

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

### 2.6. xeokit BCF Support

The SDK offers functions for sharing bookmarks of web viewer state with other BIM software as industry-standard BCF
Viewpoints. These functions can be used to develop applications that facilitate collaboration on construction projects.

| Modules                                                                         | Description                                          |
|---------------------------------------------------------------------------------|------------------------------------------------------|
| [`@xeokit/sdk/bcf`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/bcf.html) | Load and save BCF                    |

<br>

### 2.7. xeokit Collision Detection

The SDK provides collision detection utilities that can be used to build various acceleration and selection mechanisms. Intended 
applications for our collision library include 3D frustum culling, ray-picking, marquee box selection and more.

| Modules                                                                                           | Description                                                    |
|---------------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| [`@xeokit/sdk/kdtree2`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/kdtree2.html) | Searches and collision tests with 2D k-d trees and boundaries  |
| [`@xeokit/sdk/kdtree3`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/kdtree3.html) | Ssearches and collision tests with 3D k-d trees and boundaries |
| [`@xeokit/sdk/pick`](https://xeokit.github.io/sdk/api-docs.html#https://xeokit.github.io/sdk/docs/api/modules/pick.html)       | Select objects and primitives using rays and boundaries        |

<br>

### 2.8. xeokit Utility Libraries

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
