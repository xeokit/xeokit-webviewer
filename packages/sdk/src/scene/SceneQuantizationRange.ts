import type {FloatArrayParam} from "../math";
import {createAABB3} from "../boundaries";
import {SceneQuantizationRangeParams} from "./SceneQuantizationRangeParams";


/**
 * A geometry in a {@link SceneModel | SceneModel}.
 *
 * * Stored in {@link SceneModel.quantizationRanges | SceneModel.quantizationRanges}
 * * Created with {@link SceneModel.createQuantizationRange | SceneModel.createQuantizationRange}
 * * Referenced by {@link SceneGeometry.geometry | SceneGeometry.geometry}
 *
 * See {@link scene | @xeokit/sdk/scene}   for usage.
 */
export class SceneQuantizationRange {

    /**
     * ID for the geometry.
     */
    id: string;

    /**
     * Axis-aligned 3D boundary to dequantize the positions.
     */
    aabb: FloatArrayParam;

    constructor(params: SceneQuantizationRangeParams) {
        this.aabb = params.aabb ? params.aabb.slice() : createAABB3();
    }

    /**
     * Gets this SceneQuantizationRange as JSON.
     */
    toParams(): SceneQuantizationRangeParams {
        const quantizationRangeParams = <SceneQuantizationRangeParams>{
            id: this.id,
            aabb: [
                this.aabb[0],
                this.aabb[1],
                this.aabb[2],
                this.aabb[3],
                this.aabb[4],
                this.aabb[5]
            ]
        };

        return quantizationRangeParams;
    }
}
