import type {FloatArrayParam} from "../math";

import type {SceneGeometryCompressedParams} from "./SceneGeometryCompressedParams";
import type {SceneTextureParams} from "./SceneTextureParams";
import type {SceneTextureSetParams} from "./SceneTextureSetParams";

import type {SceneMeshParams} from "./SceneMeshParams";
import type {SceneGeometryParams} from "./SceneGeometryParams";
import type {SceneObjectParams} from "./SceneObjectParams";
import {SceneModelStreamParams} from "./SceneModelStreamParams";


/**
 * {@link SceneModel | SceneModel} creation parameters for {@link Scene.createModel | Scene.createModel}.
 *
 * See {@link scene | @xeokit/sdk/scene}   for usage.
 */
export interface SceneModelParams {

    /**
     * Indicates what renderer resources will need to be allocated in a {@link viewer!Viewer | Viewer's}
     * {@link viewer!Renderer | Renderer} to support progressive loading for a {@link SceneModel | SceneModel}.
     */
    streamParams?: SceneModelStreamParams;

    /**
     * Unique ID for the SceneModel.
     *
     * The SceneModel is stored with this ID in {@link Scene.models | Scene.models}
     */
    id: string;

    /**
     * Whether IDs of the {@link SceneObject | SceneObjects} are globalized.
     *
     * When globalized, the IDs are prefixed with the value of {@link SceneModel.id | SceneModel.id}
     *
     * Default is ````false````.
     */
    globalizedIds?: boolean

    /**
     * 4x4 transform matrix.
     */
    matrix?: FloatArrayParam;

    /**
     * Scale of the SceneModel.
     *
     * Default is ````[1,1,1]````.
     */
    scale?: FloatArrayParam;

    /**
     * Quaternion defining the orientation of the SceneModel.
     */
    quaternion?: FloatArrayParam;

    /**
     * Orientation of the SceneModel, given as Euler angles in degrees for X, Y and Z axis.
     */
    rotation?: FloatArrayParam;

    /**
     * World-space position of the SceneModel.
     */
    position?: FloatArrayParam;

    /**
     * {@link SceneGeometryParams} in the SceneModel.
     */
    geometries?: SceneGeometryParams[];

    /**
     * {@link SceneGeometryCompressedParams | SceneGeometryCompressedParams} in the SceneModel.
     */
    geometriesCompressed?: SceneGeometryCompressedParams[];

    /**
     * {@link SceneTexture | Textures} in the SceneModel.
     */
    textures?: SceneTextureParams[];

    /**
     * {@link SceneTextureSet | TextureSets} in the SceneModel.
     */
    textureSets?: SceneTextureSetParams[];

    /**
     * {@link SceneMesh | Meshes} in the SceneModel.
     */
    meshes?: SceneMeshParams[];

    /**
     * {@link SceneObject | SceneObjects} in the SceneModel.
     */
    objects?: SceneObjectParams[];

    /**
     * If we want to view the SceneModel with a {@link viewer!Viewer | Viewer}, an
     * optional ID of the {@link viewer!ViewLayer | ViewLayer} to view the SceneModel in.
     *
     * Will be "default" by default.
     *
     * Overrides {@link SceneObjectParams.layerId | SceneObjectParams.layerId}.
     */
    layerId?: string;

    /**
     * TODO
     */
    retained?: boolean;
}
