import {FloatArrayParam} from "../math";

/**
 * Configuration for a View's selected, highlighted and x-ray effects.
 *
 * * Returned by {@link EmphasisMaterial.getJSON | EmphasisMaterial.getJSON}
 * * Located at {@link ViewParams.highlightMaterial | ViewParams.highlightMaterial}, {@link ViewParams.selectedMaterial | ViewParams.selectedMaterial} and {@link ViewParams.xrayMaterial | ViewParams.xrayMaterial}
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
