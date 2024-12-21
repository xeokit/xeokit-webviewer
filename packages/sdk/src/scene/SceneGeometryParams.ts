
import type {FloatArrayParam, IntArrayParam} from "../math";

/**
 * Non-compressed geometry parameters for {@link scene!SceneModel.createGeometry | SceneModel.createGeometry}.
 *
 * ## Summary
 *
 * * Contains uncompressed, human-readable geometry parameters for {@link scene!SceneModel.createGeometry | SceneModel.createGeometry}
 * * Use {@link scene!compressGeometryParams | compressGeometryParams} to compress {@link scene!SceneGeometryCompressedParams | SceneGeometryCompressedParams}
 * for {@link scene!SceneModel.createGeometryCompressed | SceneModel.createGeometryCompressed}
 *
 * See usage in:
 *
 * * [@xeokit/scene](/docs/modules/_xeokit_scene.html)
 * * [@xeokit/viewer](/docs/modules/_xeokit_viewer.html)
 *
 * @typeparam
 */
export interface SceneGeometryParams {

    /**
     * ID for the geometry.
     */
    id: string;

    /**
     * Primitive type.
     *
     * Accepted values are {@link constants!SolidPrimitive}, {@link constants!SurfacePrimitive},
     * {@link constants!LinesPrimitive}, {@link constants!PointsPrimitive}
     * and {@link constants!TrianglesPrimitive}.
     */
    primitive: number;

    /**
     * Flat array of uncompressed floating point 3D vertex positions.
     */
    positions: FloatArrayParam;

    /*
    * Flat array of uncompressed floating-point vertex UV coordinates.
    */
    uvs?: FloatArrayParam;

    /**
     * Flat array of uncompressed floating-point vertex colors.
     */
    colors?: FloatArrayParam;

    /**
     * Flat array of primitive connectivity indices.
     *
     * Ignored for primitive type {@link constants!PointsPrimitive}, which does not need indices.
     */
    indices?: IntArrayParam;
}
