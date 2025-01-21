import {FloatArrayParam} from "../math";

/**
 * Configures an {@link AmbientLight}.
 *
 * * Returned by {@link AmbientLight.getJSON | AmbientLight.getJSON}
 * * Passed to {@link AmbientLight.fromJSON | AmbientLight.fromJSON}
 * * Located at {@link ViewParams.lights | ViewParams.lights}
 */
export interface AmbientLightParams {

    /** Optional ID, generated automatically when omitted.
     */
    id?: string;

    /**
     * RGB color of the {@link AmbientLight}.
     *
     * Range is `[0..1, 0..1, 0..1]`.
     *
     * Default value is `[1.0, 1.0, 1.0]`.
     */
    color?: FloatArrayParam;

    /**
     * Intensity of the {@link AmbientLight}.
     *
     * Default value is `0.5`.
     */
    intensity?: number;
}
