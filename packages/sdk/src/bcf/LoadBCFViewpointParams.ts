import type {View} from "../viewer";
import type {BCFViewpoint} from "./BCFViewpoint";
import {Data} from "../data";

/**
 * Options for {@link bcf!loadBCFViewpoint | loadBCFViewpoint}.
 *
 * See {@link "@xeokit/bcf" | @xeokit/bcf} for usage.
 */
export interface LoadBCFViewpointParams {

    duration?: number;
    originatingSystem?: string;
    updateCompositeObjects?: boolean;
    reverseClippingPlanes?: boolean;
    reset?: boolean;
    immediate?: boolean;

    rayCast?: boolean;

    /**
     * A BIM Collaboration Format (BCF) viewpoint to load.
     */
    bcfViewpoint: BCFViewpoint;

    /**
     * A {@link viewer!View | View} to load the BCF viewpoint's component states into.
     *
     * This will load the viewpoint's component states (see {@link bcf!BCFComponents}) into their corresponding
     * {@link viewer!ViewObject | ViewObjects} within the given target View, ignoring any
     * {@link viewer!ViewLayer | ViewLayers} that those ViewObjects may have been partitioned into.
     *
     * The {@link bcf!loadBCFViewpoint | loadBCFViewpoint} function will silently ignore each component state that has no corresponding
     * ViewObject in the target View.
     */
    view: View;

    /**
     * A {@link data!Data | Data} to classify the objects in the {@link viewer!View | View} we're loading the BCF viewpoint's component states into
     */
    data?: Data;

    /**
     * Only load BCF viewpoint components if their corresponding {@link viewer!ViewObject | ViewObjects}
     * are in {@link viewer!ViewLayer |ViewLayers} that have the given IDs.
     *
     * The {@link bcf!loadBCFViewpoint | loadBCFViewpoint} function will silently ignore each component state that has no corresponding
     * ViewObject in any of these ViewLayers.
     *
     * Each ViewLayer's occurrence in {@link bcf!LoadBCFViewpointParams.excludeLayerIds | LoadBCFViewpointParams.excludeLayerIds} will override
     * its appearance in this list.
     */
    includeLayerIds?: string[]

    /**
     * Never load BCF viewpoint components if their corresponding {@link viewer!ViewObject | ViewObjects}
     * are in {@link viewer!ViewLayer | ViewLayers} that have the given IDs.
     *
     * The {@link bcf!loadBCFViewpoint | loadBCFViewpoint} function will silently ignore each component state that has a corresponding
     * ViewObject in any of these ViewLayers.
     *
     * Each ViewLayer's occurrence in this list will override its occurrance
     * in {@link bcf!LoadBCFViewpointParams.includeLayerIds | LoadBCFViewpointParams.includeLayerIds}.
     */
    excludeLayerIds?: string[]
}
