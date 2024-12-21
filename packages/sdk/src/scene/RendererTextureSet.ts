import type {RendererTexture} from "./RendererTexture";

/**
 * Interface through which a {@link scene!SceneTextureSet | SceneTextureSet} loads updated texture data
 * into a {@link viewer!Viewer | Viewer's} {@link viewer!Renderer | Renderer}.
 *
 * This loads the updated texture data into all the {@link viewer!View | View} belonging to the Viewer.
 *
 * This exists at {@link scene!SceneTextureSet.rendererTextureSet} when the {@link scene!SceneModel | SceneModel} has been added
 *  to a {@link viewer!Viewer | Viewer}.
 *
 * @internal
 */
export interface RendererTextureSet {


    /**
     * Interface through which the color {@link scene!SceneTexture | SceneTexture} in this set loads content updates
     * into a {@link viewer!Viewer | Viewer's} {@link viewer!Renderer | Renderer}.
     */
    readonly colorRendererTexture: RendererTexture;

    /**
     * Interface through which the metallic-roughness {@link scene!SceneTexture | SceneTexture} in this set loads content updates
     * into a {@link viewer!Viewer | Viewer's} {@link viewer!Renderer | Renderer}.
     */
    readonly metallicRoughnessRendererTexture: RendererTexture;

    /**
     * Interface through which the emissive {@link scene!SceneTexture | SceneTexture} in this set loads content updates
     * into a {@link viewer!Viewer | Viewer's} {@link viewer!Renderer | Renderer}.
     */
    readonly emissiveRendererTexture: RendererTexture;

    /**
     * Interface through which the ambient occlusion {@link scene!SceneTexture | SceneTexture} in this set loads content updates
     * into a {@link viewer!Viewer | Viewer's} {@link viewer!Renderer | Renderer}.
     */
    readonly occlusionRendererTexture: RendererTexture;
}
