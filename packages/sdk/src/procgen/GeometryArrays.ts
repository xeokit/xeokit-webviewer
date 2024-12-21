import {FloatArrayParam, IntArrayParam} from "../math";

/**
 * TrianglesLayerGeometryBucket data arrays.
 */
export type GeometryArrays = {
    primitive: number,
    positions: FloatArrayParam,
    normals?: FloatArrayParam,
    uv?: FloatArrayParam,
    indices?: IntArrayParam
};
