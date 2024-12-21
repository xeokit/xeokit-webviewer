/**
 * {@link scene!SceneObject} creation parameters for {@link scene!SceneModel.createObject | SceneModel.createObject}.
 */
export interface SceneObjectParams {

    /**
     * Unique ID for the SceneObject.
     */
    id: string;

    /**
     * ID of this SceneObject within the originating system, is any. Defaults to the value of
     * {@link scene!SceneObjectParams.id | SceneObjectParams.id}.
     */
    originalSystemId?: string;

    /**
     * IDs of meshes previously created with {@link scene!SceneModel.createMesh | SceneModel.createMesh}.
     */
    meshIds: string[];

    /**
     * Causes each {@link viewer!View} to put the corresponding {@link viewer!ViewObject} into
     * a {@link viewer!ViewLayer} with this ID.
     *
     * When you create an object in a model, each {@link viewer!View} will automatically create
     * a {@link viewer!ViewObject} to
     * represent it. When the object has a {@link scene!SceneObjectParams.layerId} property, then each View will first
     * ensure that it has a {@link viewer!ViewLayer} with this ID, and will register the ViewObject in that ViewLayer.
     *
     * Overridden by {@link scene!SceneObjectParams.layerId | SceneObjectParams.layerId}.
     */
    layerId?: string;
}
