import type {RendererTexture, SceneTexture} from "../scene";
import type {WebGLTexture} from "../webglutils";

/**
 * @private
 */
export class WebGLRendererTexture implements RendererTexture {

    texture: SceneTexture | null;
    texture2D: WebGLTexture;

    constructor(texture: SceneTexture | null, texture2D: WebGLTexture) {
        this.texture = texture
        this.texture2D = texture2D;
    }

    destroy() {
        if (this.texture2D) {
            this.texture2D.destroy();
        }
    }
}
