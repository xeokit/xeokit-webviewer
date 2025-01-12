
import type {FloatArrayParam, IntArrayParam} from "../math";

/**
 * Non-compressed geometry parameters for {@link SceneModel.createGeometry | SceneModel.createGeometry}.
 *
 * * Contains uncompressed, human-readable geometry parameters for {@link SceneModel.createGeometry | SceneModel.createGeometry}
 * * Use {@link compressGeometryParams | compressGeometryParams} to compress {@link SceneGeometryCompressedParams | SceneGeometryCompressedParams}
 * for {@link SceneModel.createGeometryCompressed | SceneModel.createGeometryCompressed}
 *
 * See {@link scene | @xeokit/sdk/scene} for usage.
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
