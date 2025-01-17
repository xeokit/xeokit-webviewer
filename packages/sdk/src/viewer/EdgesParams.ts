import {FloatArrayParam} from "../math";

/**
 * Configures a View's edge enhancement effect, {@link Edges}.
 *
 * * Returned by {@link Edges.getJSON | Edges.getJSON}
 * * Located at {@link ViewParams.edges | ViewParams.edges}
 */
export interface EdgesParams {
    edgeColor?: FloatArrayParam;
    edgeWidth?: number;
    edgeAlpha?: number;
    enabled?: boolean;
    renderModes?: number[];

}
