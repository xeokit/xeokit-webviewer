import {ViewParams} from "./ViewParams";

/**
 * {@link Viewer} creation parameters.
 *
 * * Returned by {@link Viewer.getJSON | Viewer.getJSON}
 */
export interface ViewerParams {

    /**
     * Optional ID for the new Viewer.
     */
    id?: string;

    /**
     * {@link View} creation parameters.
     */
    views?: ViewParams[];
}
