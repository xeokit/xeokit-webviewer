import type {FloatArrayParam} from "../math";

/**
 * Interface through which a {@link scene!SceneMesh | SceneMesh} loads attribute updates
 * into a {@link viewer!Viewer | Viewer's} {@link viewer!Renderer | Renderer}.
 *
 *  This exists at each {@link scene!SceneMesh.rendererMesh | SceneMesh.rendererMesh} when the
 *  containing {@link scene!SceneModel | SceneModel} has been added
 *  to a {@link viewer!Viewer | Viewer}.
 *
 * @internal
 */
export interface RendererMesh {

    /**
     * Loads the {@link scene!SceneMesh | SceneMesh's} modeling matrix into the {@link viewer!Renderer}.
     *
     * {@link scene!SceneMesh} calls this when we update {@link scene!SceneMesh | SceneMesh.matrix}.
     *
     * @internal
     */
    setMatrix(matrix: FloatArrayParam): void;

    /**
     * Loads a material color value into the {@link viewer!Renderer}.
     *
     * {@link scene!SceneMesh} calls this when we update {@link scene!SceneMesh | SceneMesh.color}.
     *
     * @internal
     */
    setColor(color: FloatArrayParam): void;

    /**
     * Sends an opacity factor update to the renderers.
     */
  //  setOpacity(opacity: number): void;
}
