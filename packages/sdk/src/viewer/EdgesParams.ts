import {FloatArrayParam} from "../math";

/**
 * Configures a View's edge enhancement effect, {@link Edges}.
 *
 * * Returned by {@link Edges.getJSON | Edges.getJSON}
 * * Passed to {@link Edges.fromJSON | Edges.fromJSON}
 * * Located at {@link ViewParams.edges | ViewParams.edges}
 */
export interface EdgesParams {

    /**
     * RGB edge color for {@link Edges | Edges}.
     *
     * Default value is ````[0.2, 0.2, 0.2]````.
     */
    edgeColor?: FloatArrayParam;

    /**
     * Line width for {@link Edges | Edges}.
     *
     * Default value is ````1.0```` pixels.
     */
    edgeWidth?: number;

    /**
     * Edge transparency for {@link Edges | Edges}.
     *
     * A value of ````0.0```` indicates fully transparent, ````1.0```` is fully opaque.
     *
     * Default value is ````1.0````.
     */
    edgeAlpha?: number;

    /**
     * Whether the edges rendered by the {@link Edges} effect are currently visible.
     *
     * Default is ````true````.
     */
    enabled?: boolean;

    /**
     * Which rendering modes in which to render edges.
     *
     * Default value is [{@link constants!QualityRender | QualityRender}].
     */
    renderModes?: number[];
}
