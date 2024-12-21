import {Scene} from "./Scene";
import {FloatArrayParam} from "../math";
import {SceneModel} from "./SceneModel";
import {SceneObject} from "./SceneObject";

/**
 * A tile in a {@link scene!SceneModel | SceneModel}.
 *
 *
 * * {@link scene!SceneMeshParams.origin | SceneMeshParams.origin}
 * * Stored in {@link scene!SceneModel.tiles | SceneModel.tiles}
 * * Created automatically for each distinct value of {@link scene!SceneMeshParams.origin | SceneMeshParams.origin} given to {@link scene!SceneMeshParams.createMesh | SceneMeshParams.createMesh}
 * * Each SceneTile is destroyed as soon all {@link scene!SceneTile | SceneTiles} with that origin heve been destroyed
 *
 * See {@link "@xeokit/scene" | @xeokit/scene}  for usage.
 */
export class SceneTile {

    /**
     * Unique ID of this SceneTile.
     */
    public readonly id: string;

    /**
     * The Scene that owns this SceneTile.
     */
    public readonly scene: Scene;

    /**
     * The 3D World-space origin of this SceneTile.
     */
    public readonly origin: FloatArrayParam;

    /**
     * The number of {@link scene!SceneMesh | SceneMeshes} associated with this SceneTile.
     */
    public numObjects: number;

    /**
     * The {@link scene!SceneModel | SceneModels} belonging to this SceneTile, each keyed to
     * its {@link scene!SceneModel.id | SceneModel.id}.
     *
     * A SceneModel can belong to more than one SceneTile.
     */
    public readonly models: { [key: string]: SceneModel };

    /**
     * The {@link scene!SceneObject | SceneObjects} in this SceneTile,
     * mapped to {@link scene!SceneObject.id | SceneObject.id}.
     *
     * A SceneObject can belong to more than one SceneTile.
     */
    public readonly objects: { [key: string]: SceneObject };

    /**
     * @private
     * @param scene
     * @param id
     * @param origin
     */
    constructor(scene: Scene, id: string, origin: FloatArrayParam) {
        this.scene = scene;
        this.id = id;
        this.origin = origin;
        this.numObjects = 0;
        this.models = {};
        this.objects = {};
    }
}
