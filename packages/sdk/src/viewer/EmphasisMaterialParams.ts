import {FloatArrayParam} from "../math";

/**
 * Configuration for a View's selected, highlighted and x-ray effects.
 */
export interface EmphasisMaterialParams {
    edgeColor?: FloatArrayParam;
    edgeWidth?: number;
    edgeAlpha?: number;
    edges?: boolean;
    fillColor?: FloatArrayParam;
    backfaces?: boolean;
    fillAlpha?: number;
    fill?: boolean;
    enabled?: boolean;
    renderModes?: number[];
    glowThrough?: boolean;
}
