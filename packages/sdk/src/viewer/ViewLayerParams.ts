/**
 * Configuration for a {@link ViewLayer}.
 *
 * * Returned by {@link ViewLayer.getJSON | ViewLayer.getJSON}
 * * Passed to {@link ViewLayer.fromJSON | ViewLayer.fromJSON} and {@link View.createLayer | View.createLayer}
 * * Located at {@link ViewParams.viewLayers | ViewParams.viewLayers}
 */
export interface ViewLayerParams {

    /**
     * ID for the new ViewLayer.
     *
     * The ViewLayer is registered by this ID in {@link View.layers}.
     */
    id: string;

    /**
     * Default initial visibility of the {@link ViewObject | ViewObjects} in the new ViewLayer.
     */
    visible?: boolean;

    /**
     * When true, View destroys the ViewLayer as soon as there are no ViewObjects that need it. When false, the View will retain it.
     */
    autoDestroy?: boolean;
}
