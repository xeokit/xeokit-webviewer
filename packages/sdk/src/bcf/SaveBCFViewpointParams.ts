import type {View} from "../viewer";

/**
 * Options for {@link bcf!saveBCFViewpoint | saveBCFViewpoint}.
 *
 * See {@link "@xeokit/bcf" | @xeokit/bcf} for usage.
 */
export interface SaveBCFViewpointParams {

    defaultInvisible?: boolean;

    /**
     * Whether to capture a snapshot image in the BCF viewpoint.
     *
     * The snapshot would be saved in {@link bcf!BCFViewpoint.snapshot | BCFViewpoint.snapshot}.
     */
    snapshot?: boolean;

    /**
     * Identifies the system that authors this BCF viewpoint.
     */
    originatingSystem?: string;

    /**
     * Whether to flip the direction of the {@link viewer!SectionPlane | SectionPlanes} captured in the BCF viewpoint.
     */
    reverseClippingPlanes?: boolean;

    /**
     * Value to set on {@link bcf!BCFSetupHints.openings_translucent | BCFSetupHints.openings_translucent} within the BCF viewpoint.
     */
    openings_translucent?: boolean;

    /**
     * Value to set on {@link bcf!BCFSetupHints.space_boundaries_translucent | BCFSetupHints.space_boundaries_translucent} within the BCF viewpoint.
     */
    space_boundaries_translucent?: boolean;

    /**
     * Value to set on {@link bcf!BCFSetupHints.spaces_translucent | BCFSetupHints.spaces_translucent} within the BCF viewpoint.
     */
    spaces_translucent?: boolean;

    /**
     * Value to set on {@link bcf!BCFSetupHints.openingsVisible | BCFSetupHints.openingsVisible} within the BCF viewpoint.
     */
    openingsVisible?: boolean;

    /**
     * Value to set on {@link bcf!BCFSetupHints.spaceBoundariesVisible | BCFSetupHints.spaceBoundariesVisible} within the BCF viewpoint.
     */
    spaceBoundariesVisible?: boolean;

    /**
     * Value to set on {@link bcf!BCFSetupHints.spacesVisible | BCFSetupHints.spacesVisible} within the BCF viewpoint.
     */
    spacesVisible?: boolean;

    /**
     * The {@link viewer!View | View} to save as a BCF viewpoint.
     *
     * This will save component states in the BCF (see {@link bcf!BCFComponents}) for all
     * {@link viewer!ViewObject | ViewObjects} in this View.
     */
    view: View;

    /**
     * Only save BCF viewpoint components if their corresponding {@link viewer!ViewObject | ViewObjects}
     * are in {@link viewer!ViewLayer | ViewLayers} that match these IDs.
     *
     * The {@link bcf!saveBCFViewpoint | saveBCFViewpoint} function will silently ignore each component state that has no corresponding
     * ViewObject in any of these ViewLayers.
     *
     * Each ViewLayer's occurrence in {@link bcf!SaveBCFViewpointParams.excludeLayerIds | SaveBCFViewpointParams.excludeLayerIds} will override
     * its appearance in this list.
     */
    includeLayerIds?: string[]

    /**
     * Never save BCF viewpoint components if their corresponding {@link viewer!ViewObject | ViewObjects}
     * are in {@link viewer!ViewLayer |ViewLayers} that have the given IDs.
     *
     * The {@link bcf!saveBCFViewpoint | saveBCFViewpoint} function will silently ignore each component state that has a corresponding
     * ViewObject in any of these ViewLayers.
     *
     * Each ViewLayer's occurrence in this list will override its occurrance
     * in {@link bcf!SaveBCFViewpointParams.includeLayerIds}.
     */
    excludeLayerIds?: string[]
}
