import {FloatArrayParam} from "../math";

/**
 * Configures a View's edge enhancement effect, {@link Edges}.
 */
export interface EdgesParams {
    edgeColor?: FloatArrayParam;
    edgeWidth?: number;
    edgeAlpha?: number;
    enabled?: boolean;
    renderModes?: number[];

}
