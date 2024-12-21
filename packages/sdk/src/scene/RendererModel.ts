import type {RendererObject} from "./RendererObject";

/**
 *  Internal interface through which a {@link scene!Scene | Scene} can load content updates into a renderers.
 *
 *  An instance of this class is set on {@link scene!SceneModel.rendererModel | SceneModel.rendererModel} when
 *  the {@link scene!SceneModel | SceneModel} has been added to a {@link viewer!Viewer | Viewer}.
 *
 * @internal
 */
export interface RendererModel {

    /**
     * Interface through which each of the SceneModel's {@link scene!SceneObject | SceneObjects} loads attribute
     * updates (geometry, colors etc) into a {@link viewer!Viewer | Viewer's} {@link viewer!Renderer | Renderer}.
     *
     *  This is defined when the owner {@link scene!SceneModel | SceneModel} has been added to a {@link viewer!Viewer | Viewer}.
     *
     * @internal
     */
    rendererObjects: { [key:string]: RendererObject};
}
