/**
 * Configures a {@link ResolutionScale}.
 *
 * * Returned by {@link ResolutionScale.getJSON | ResolutionScale.getJSON}
 * * Located at {@link ViewerParams.resolutionScale | ViewerParams.resolutionScale}
 */
export interface ResolutionScaleParams {
    enabled?: boolean;
    renderModes?: number[];
    resolutionScale?: number;

}
