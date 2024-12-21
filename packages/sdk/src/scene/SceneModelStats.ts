
/**
 * Statistics for a {@link scene!SceneModel | SceneModel}.
 *
 */
export interface SceneModelStats {

    /**
     * The number of {@link scene!SceneObject | SceneObjects} in the {@link scene!SceneModel | SceneModel}.
     */
    numObjects: number;

    /**
     * The number of {@link scene!SceneMesh | Meshes} in the {@link scene!SceneModel | SceneModel}.
     */
    numMeshes: number;

    /**
     * The number of {@link scene!SceneGeometry | Geometries} in the {@link scene!SceneModel | SceneModel}.
     */
    numGeometries: number;

    /**
     * The number of {@link scene!SceneTexture | Textures} in the {@link scene!SceneModel | SceneModel}.
     */
    numTextures: number;

    /**
     * The number of {@link scene!SceneTextureSet | TextureSets} in the {@link scene!SceneModel | SceneModel}.
     */
    numTextureSets: number;

    /**
     * The number of triangles in the {@link scene!SceneModel | SceneModel}.
     */
    numTriangles: number;

    /**
     * The number of lines in the {@link scene!SceneModel | SceneModel}.
     */
    numLines: number;

    /**
     * The number of points primitives in the {@link scene!SceneModel | SceneModel}.
     */
    numPoints: number;

    /**
     * The number of vertices in the {@link scene!SceneModel | SceneModel}.
     */
    numVertices: number;

    /**
     * The number of bytes used for texture storage in the {@link scene!SceneModel | SceneModel}.
     */
    textureBytes: number;
}
