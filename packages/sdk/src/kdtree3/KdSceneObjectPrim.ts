import type {SceneGeometry, SceneObject} from "../scene";
import type {KdTrianglePrim} from "./KdTrianglePrim";
import type {KdPointPrim} from "./KdPointPrim";
import type {KdLinePrim} from "./KdLinePrim";

/**
 *
 * See {@link "@xeokit/kdtree3"} for usage.
 */
export interface KdSceneObjectPrim {
    sceneObject: SceneObject;
    sceneGeometry: SceneGeometry;
    prim: KdTrianglePrim | KdPointPrim | KdLinePrim;
}
