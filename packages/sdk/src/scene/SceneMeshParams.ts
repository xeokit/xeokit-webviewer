import type {FloatArrayParam} from "../math";

/**
 * {@link scene!SceneMesh} creation parameters for {@link scene!SceneModel.createMesh | SceneModel.createMesh}.
 */
export interface SceneMeshParams {

    /**
     * TODO
     */
    streamLayerIndex?: number;

    /**
     * ID for the new {@link scene!SceneMesh}, unique within the {@link scene!SceneModel | SceneModel}.
     */
    id: string;

    /**
     * ID of a {@link scene!SceneTextureSet} that was created previously with {@link scene!SceneModel.createTextureSet | SceneModel.createTextureSet}.
     */
    textureSetId?: string;

    /**
     * ID of a {@link scene!SceneGeometry} that was created previously with {@link scene!SceneModel.createGeometry | SceneModel.createGeometry} or {@link scene!SceneModel.createGeometryCompressed | SceneModel.createGeometryCompressed}.
     */
    geometryId: string;

    /**
     * RGB base color of the new {@link scene!SceneMesh}.
     *
     * * Default is ````[1,1,1]````.
     */
    color?: FloatArrayParam;

    /**
     * RGB pick color of the new {@link scene!SceneMesh}.
     *
     * This is used internally within {@link scene!SceneModel | SceneModel}.
     */
    pickColor?: FloatArrayParam;

    /**
     * Opacity of the new {@link scene!SceneMesh}.
     *
     * Default is 1.
     */
    opacity?: number;

    /**
     * Optional local 3D translation vector.
     */
    position?: FloatArrayParam;

    /**
     * Optional local 3D scale vector.
     */
    scale?: FloatArrayParam;

    /**
     * Optional local 3D rotation quaternion.
     */
    quaternion?: FloatArrayParam;

    /**
     * Optional local 3D rotation as Euler angles given in degrees, for each of the X, Y and Z axis.
     */
    rotation?: FloatArrayParam;

    /**
     * Optional local 3D transform matrix.
     *
     * Overrides {@link scene!SceneMeshParams.position}, {@link scene!SceneMeshParams.scale | SceneMeshParams.scale},
     * {@link scene!SceneMeshParams.quaternion | SceneMeshParams.quaternion}
     * and {@link scene!SceneMeshParams.rotation | SceneMeshParams.rotation}.
     */
    matrix?: FloatArrayParam;

    /**
     * Relative-to-center (RTC) origin.
     *
     * When this is given, then {@link scene!SceneMeshParams.matrix | SceneMeshParams.matrix} will be relative to this origin.
     *
     * Overrides {@link scene!SceneMeshParams.rtcMatrix | SceneMeshParams.rtcMatrix}
     */
    origin?:FloatArrayParam;
}
