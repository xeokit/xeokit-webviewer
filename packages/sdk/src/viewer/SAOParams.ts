import {FloatArrayParam} from "../math";

/**
 * Configures the View's scalable ambient obscurance effect, {@link SAO}, which enhances 3D model visualization by darkening
 * areas with limited ambient light exposure.
 */
export interface SAOParams {
    kernelRadius?: number;
    enabled?: boolean;
    blendCutoff?: number;
    blur?: boolean;
    scale?: number;
    bias?: number;
    numSamples?: number;
    blendFactor?: number;
    minResolution?: number;
    intensity?: number;
    renderModes?: number[];
}
