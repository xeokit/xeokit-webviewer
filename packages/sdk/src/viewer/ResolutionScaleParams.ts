/**
 * Configuration for a {@link ResolutionScale}.
 *
 * * Returned by {@link ResolutionScale.getJSON | ResolutionScale.getJSON}
 * * Passed to {@link ResolutionScale.fromJSON | ResolutionScale.fromJSON}
 * * Located at {@link ViewParams.resolutionScale | ViewParams.resolutionScale}
 */
export interface ResolutionScaleParams {

    /**
     * Whether the {@link ResolutionScale} is enabled.
     *
     * Default is ````true````.
     */
    enabled?: boolean;

    /**
     * Which rendering modes in which to apply the {@link ResolutionScale}.
     *
     * Default value is [{@link constants!FastRender | FastRender}].
     */
    renderModes?: number[];

    /**
     *The scale when {@link ResolutionScale} is applied.
     *
     * Default is ````1.0```` for no scaling.
     */
    resolutionScale?: number;
}
