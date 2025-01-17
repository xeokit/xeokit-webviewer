import {FloatArrayParam} from "../math";

/**
 * Configures the View's {@link DirLight}.
 *
 * * Returned by {@link DirLight.getJSON | DirLight.getJSON}
 * * Located at {@link ViewParams.lights | ViewParams.lights}
 */
export interface DirLightParams {
    dir?: FloatArrayParam;
    color?: FloatArrayParam;
    intensity?: number;
    space?: string;

}
