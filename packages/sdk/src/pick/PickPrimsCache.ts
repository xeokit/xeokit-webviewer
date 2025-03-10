import type {KdTree3, PrimsKdTree3} from "../kdtree3";
import type {FloatArrayParam} from "../math";

/**
 * Caches reusable resources for {@link rayPick} and {@link marqueePick}.
 *
 * These resources are lazy-generated by these methods. When provided
 * again to the methods, we can avoid the method needing to re-generate them.
 *
 * > Internally, the resources consist of lazy-generated {@link PrimsKdTree3 | PrimsKdTree3s}, cached for
 * {@link scene!SceneGeometryBucket | GeometryBuckets} of
 * candidate {@link scene!SceneObject | SceneObjects} while picking.
 */
export class PickPrimsCache {

    /**
     * TODO
     */
    primitivesKdTrees: {
        [key: string]: {
            primitivesKdTree: PrimsKdTree3,
            positions: FloatArrayParam
        }
    };

    /**
     * TODO
     */
    constructor() {
        this.primitivesKdTrees = {};
    }

    /**
     * TODO
     */
    clear() {
        this.primitivesKdTrees = {};
    }
}
