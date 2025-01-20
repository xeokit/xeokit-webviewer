import {FloatArrayParam} from "../math";

/**
 * Configures a {@link CustomProjection}.
 *
 * * Returned by {@link CustomProjection.getJSON | CustomProjection.getJSON}
 * * Passed to {@link CustomProjection.fromJSON | CustomProjection.fromJSON}
 * * Located at {@link CameraParams.customProjection | CameraParams.customProjection}
 */
export interface CustomProjectionParams {

    /**
     * The {@link CustomProjection | CustomProjection's} projection transform matrix.
     *
     * Default value is ````[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]````.
     */
    projMatrix?: FloatArrayParam;
}
