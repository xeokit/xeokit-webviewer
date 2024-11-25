xeokit SDK V3 is built on the insights gained from V2 and previous WebGL-based libraries developed by xeolabs.

## Model-View Separation

In xeokit V2, the renderer and the scene are intertwined within the same classes, lacking a clear separation between
model and view.

In xeokit V3, this separation is established, making the scene model independent of the viewer that renders it. This
allows the scene model to be used for purposes other than rendering, such as serving as an intermediate document model
in tools that convert between file formats.

Additionally, this separation enables various rendering implementations. The viewer is further modularized, with its use
of the underlying graphics API (e.g., WebGL) implemented as a pluggable strategy. This strategy can be adapted for
WebGL, WebGPU, or other technologies.

## Less Convenience Logic

### Single responsibility hueristic 

In xeokit V3, we avoid adding convenience logic to classes. For instance, while a Mesh in V2 had a matrix property along
with rotation, translation, and scale properties, in V3, a Mesh has only a matrix property. In V2, the scale,
translation, and Euler rotation properties were combined in a specific order to construct the matrix. Although this
approach is less convenient for the application developer, it offers greater flexibility by allowing the developer to
define the matrix in various ways, such as using a quaternion instead of Euler angles.

## TypeScript


