import {FloatArrayParam} from "../math";

/**
 * Configures a {@link DirLight}.
 */
export interface DirLightParams {
    dir?: FloatArrayParam;
    color?: FloatArrayParam;
    intensity?: number;
    space?: string;

}
