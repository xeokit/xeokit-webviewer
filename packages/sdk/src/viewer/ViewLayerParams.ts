/**
 * {@link ViewLayer} creation parameters for {@link View.createLayer}.
 *
 * * Returned by {@link View.createLayer | View.createLayer}
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
