
[![](screenshot.png)](./../../examples/#SceneModel_build_table/index.html)

* *[Run this example](./../../examples/#SceneModel_build_table/index.html)*
# Technical White Paper: xeokit SDK for 3D BIM and AEC Visualization

## 1. Introduction

The **xeokit SDK** is a high-performance, web-based toolkit specifically designed for visualizing and interacting with large-scale 3D Building Information Models (BIM) in the Architecture, Engineering, and Construction (AEC) industry. It enables real-time, client-side rendering of complex models in modern web browsers, facilitating seamless workflows and efficient BIM data exploration. This technical white paper delves into the core architecture, features, performance optimizations, and integration capabilities of the xeokit SDK.

## 2. Key Challenges in Web-Based 3D BIM Visualization

### 2.1 Performance 

BIM models, especially those adhering to the Industry Foundation Classes (IFC) standard, often contain millions of 
geometry elements. Rendering such large models can lead to performance degradation, including slow loading times, 
laggy interactions, and high memory consumption.

### 2.2 Precision 

### 2.2 Web-Based Deployment

Many traditional BIM tools are desktop-based and rely on proprietary plugins. Delivering BIM data via web-based applications requires lightweight, efficient visualization engines that function without relying on server-side processing.

### 2.3 File Format Compatibility

Interoperability is essential for handling various BIM file formats like IFC, glTF, and OBJ. Visualization tools must accurately parse, load, and render these formats while preserving metadata and spatial relationships.

### 2.4 Scalability

As BIM models grow in complexity and size, the ability to visualize and manage these models efficiently without performance trade-offs becomes increasingly critical.

## 3. xeokit SDK Overview

The **xeokit SDK** provides a suite of tools designed to tackle these challenges. It enables real-time, client-side visualization of large BIM and CAD models directly in the browser using WebGL.

### 3.1 Core Components

1. **xeokit Viewer**:
    - The central 3D engine for rendering and displaying models.
    - Supports advanced interactions, including picking, highlighting, sectioning, and transparency.
    - Configurable rendering strategies for WebGL, WebGPU, and other technologies.
    - Capable of managing multiple interactive canvases for different views or perspectives.

2. **xeokit WebGLRenderer**:
    - A rendering strategy attached to a xeokit Viewer.
    - Uses WebGL to efficiently draw and render the 3D objects in the Viewer's Scene.

3. **xeokit Scene**:
    - A container of 3D objects, meshes, geometries and materials (a scene graph).
    - Can be built programmatically.
    - Supports importing and exporting AEC formats.
    - Can be attached to the Viewer for visualization purposes.
    - Can be used independently in scripts for creating, analyzing, and transforming 3D models.

4. **xeokit Data**:
    - A container of data objects and relationships (an ER graph).
    - Facilitates efficient traversal and search of model components.
    - Can be built programmatically.
    - Supports importing and exporting AEC formats.
    - Can be used alongside a Viewer, to help classify and navigate Scene objects.
    - Can be used independently in scripts for creating, analyzing, and transforming models.

5. **xeokit Importers, Exporters and Converters**:
    - Tools for importing and exporting various AEC formats, including IFC, .BIM, glTF, XKT, LAS and LAZ.
    - Efficiently parse and convert data into formats optimized for use with the xeokit Viewer.

6. **xeokit Plugins**:
    - Extensible set of plugins that add features like annotations, measurements, clipping planes, and model exploration.

7. **xeokit BCF Support**:
    - TODO

For detailed documentation and additional resources, visit the [xeokit SDK website](https://xeokit.io/).


### 3.2 Supported Formats

- **IFC** (Industry Foundation Classes) for BIM data.
- **glTF** (GL Transmission Format) for 3D models and assets.
- **OBJ** for general 3D models.
- **XKT** for general 3D models.
- **LAS/LAZ** for general 3D models.
- **.BIM** for general 3D models.
- **CityJSON** for general 3D models.

## 4. Architecture and Workflow

The xeokit SDK architecture consists of several modular components designed for high efficiency and flexibility.

### 4.1 Client-Side Rendering

The xeokit Viewer leverages WebGL to render models entirely on the client side, minimizing the need for server-side processing. This approach reduces latency, enhances interactivity, and lowers server infrastructure costs.

### 4.2 Model Loading Process

1. **Parsing**: BIM files (e.g., IFC) are parsed into a lightweight internal format.
2. **Transformation**: Data is transformed into a spatially optimized structure suitable for rendering.
3. **Rendering**: The xeokit Viewer displays the model using WebGL, ensuring real-time interactions.

### 4.3 Scene Graph Management

The xeokit SDK employs a hierarchical scene graph to manage 3D entities, materials, and metadata. This structure enables efficient traversal, selection, and manipulation of elements within large models.

### 4.4 Plugins and Extensibility

xeokit offers a range of plugins that extend core functionality. Examples include:

- **Annotations**: Add textual notes or markers to specific model components.
- **Clipping Planes**: Create sectional views to inspect interior details.
- **Measurements**: Measure distances, angles, and areas within the model.

## 5. Performance Optimization Techniques

### 5.1 Level-of-Detail (LOD) Management

The xeokit Viewer supports Level-of-Detail (LOD) techniques to dynamically adjust rendering complexity based on the user's viewpoint, improving performance for large models.

### 5.2 Binary Format Loading

The xeokit SDK offers binary loaders that convert models into efficient binary representations, reducing load times and memory footprint.

### 5.3 GPU Acceleration

By leveraging WebGL, xeokit utilizes the GPU for rendering tasks, offloading computations from the CPU and ensuring smooth interactions even with complex models.



## 9. Conclusion

The **xeokit SDK** provides a powerful, extensible solution for web-based 3D BIM visualization. Its high-performance rendering engine, support for open standards, and client-side architecture make it an ideal tool for modern AEC workflows. By addressing the challenges of performance, scalability, and web deployment, xeokit empowers developers to build efficient, interactive BIM applications for a wide range of use cases.

For detailed documentation and resources, visit the [xeokit SDK website](https://xeokit.io/).

