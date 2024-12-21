import type {FloatArrayParam} from "../math";
import {IntArrayParam} from "../math";


/**
 * Pre-compressed geometry creation parameters for {@link scene!SceneModel.createGeometryCompressed | SceneModel.createGeometryCompressed}.
 *
 * ## Summary
 *
 * * Created from {@link scene!SceneGeometryParams | SceneGeometryParams} using {@link scene!compressGeometryParams | compressGeometryParams}
 * * Used with {@link scene!SceneModel.createGeometryCompressed | SceneModel.createGeometryCompressed}
 * * Generates edge indices for triangle meshes
 * * Ignores normals (our shaders auto-generate them)
 * * Quantizes positions and UVs as 16-bit unsigned integers
 */
export interface SceneGeometryCompressedParams {

    /**
     * ID for the geometry.
     */
    id: string;

    /**
     * Primitive type.
     *
     * Possible values are {@link constants!SolidPrimitive}, {@link constants!SurfacePrimitive}, {@link constants!LinesPrimitive}, {@link constants!PointsPrimitive}
     * and {@link constants!TrianglesPrimitive}.
     */
    primitive: number;

    /**
     * Axis-aligned, non-quantized 3D boundary of the geometry's vertex positions.
     */
    aabb?: FloatArrayParam;

    /**
     * 4x4 matrix to de-quantize the geometry's UV coordinates, when UVs are provided.
     */
    uvsDecompressMatrix?: FloatArrayParam;

    /**
     * 3D vertex positions, quantized as 16-bit integers.
     *
     * Internally, the Viewer decompresses thses
     * with {@link scene!SceneGeometryCompressedParams.positionsDecompressMatrix | SceneGeometryCompressedParams.positionsDecompressMatrix}.
     *
     * Vertex positions are required for all primitive types.
     */
    positionsCompressed: IntArrayParam,

    /**
     * UV coordinates, quantized as 16-bit integers.
     *
     * Internally, the Viewer de-quantizes these
     * with {@link scene!SceneGeometryCompressedParams.uvsDecompressMatrix | SceneGeometryCompressedParams.uvsDecompressMatrix}.
     */
    uvsCompressed?: IntArrayParam,

    /**
     * vertex RGB colors, quantized as 8-bit integers.
     */
    colorsCompressed?: IntArrayParam;

    /**
     * primitive indices.
     *
     * This is either an array of 8-bit, 16-bit or 32-bit values.
     */
    indices?: IntArrayParam,

    /**
     * edge indices.
     *
     * This is either an array of 8-bit, 16-bit or 32-bit values.
     */
    edgeIndices?: IntArrayParam;

    /**
     * TODO
     */
    origin?: FloatArrayParam;
}
