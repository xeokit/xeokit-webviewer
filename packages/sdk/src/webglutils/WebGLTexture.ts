import type * as math from '../math';
import {
    NearestFilter,
    NearestMipmapLinearFilter, NearestMipmapNearestFilter,
    RepeatWrapping,
    RGBAFormat, sRGBEncoding,
    UnsignedByteType
} from "../constants";

import {isArray} from "../utils";

import {convertWebGLConstant} from "./convertWebGLConstant";
import {getWebGLExtension} from "./getWebGLExtension";
import type {WebGLAbstractTexture} from "./WebGLAbstractTexture";
import type {TextureCompressedParams} from "../core";

const color = new Uint8Array([0, 0, 0, 1]);

/**
 * Represents a WebGL2 texture.
 */
export class WebGLTexture implements WebGLAbstractTexture {

    private gl: WebGL2RenderingContext;
    private target: number;
    private format: number;
    private type: number;
    private internalFormat: number;
    private premultiplyAlpha: boolean;
    private flipY: boolean;
    private unpackAlignment: number;
    private wrapS: number;
    private wrapT: number;
    private wrapR: number;
    private texture: WebGLTexture;
    private allocated: boolean;
    private minFilter: number;
    private magFilter: number;
    private encoding: number;

    constructor(params: {
        gl: WebGL2RenderingContext,
        target?: number,
        format?: number,
        type?: number,
        wrapS?: number,
        wrapT?: number,
        wrapR?: number,
        preloadColor?: math.FloatArrayParam,
        premultiplyAlpha?: boolean,
        flipY?: boolean
    }) {

        this.gl = params.gl;

        this.target = params.target || params.gl.TEXTURE_2D;
        this.format = params.format || RGBAFormat;
        this.type = params.type || UnsignedByteType;
        this.internalFormat = -1;
        this.premultiplyAlpha = !!params.premultiplyAlpha;
        this.flipY = !!params.flipY;
        this.unpackAlignment = 4;
        this.wrapS = params.wrapS || RepeatWrapping;
        this.wrapT = params.wrapT || RepeatWrapping;
        this.wrapR = params.wrapR || RepeatWrapping;

        // @ts-ignore
        this.texture = params.gl.createTexture();

        if (params.preloadColor) {
            this.setPreloadColor(params.preloadColor); // Prevents "there is no texture bound to the unit 0" error
        }

        this.allocated = true;
    }

    setPreloadColor(value: math.FloatArrayParam) {
        if (!value) {
            color[0] = 0;
            color[1] = 0;
            color[2] = 0;
            color[3] = 255;
        } else {
            color[0] = Math.floor(value[0] * 255);
            color[1] = Math.floor(value[1] * 255);
            color[2] = Math.floor(value[2] * 255);
            color[3] = Math.floor((value[3] !== undefined ? value[3] : 1) * 255);
        }
        const gl = this.gl;
        gl.bindTexture(this.target, this.texture);
        if (this.target === gl.TEXTURE_CUBE_MAP) {
            const faces = [
                gl.TEXTURE_CUBE_MAP_POSITIVE_X,
                gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
                gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
                gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
                gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
                gl.TEXTURE_CUBE_MAP_NEGATIVE_Z
            ];
            for (let i = 0, len = faces.length; i < len; i++) {
                gl.texImage2D(faces[i], 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, color);
            }
        } else {
            gl.texImage2D(this.target, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, color);
        }
        gl.bindTexture(this.target, null);
    }

    setTarget(target: number) {
        this.target = target || this.gl.TEXTURE_2D;
    }

    setImage(image: HTMLImageElement, props: {
        format?: number,
        internalFormat?: number,
        encoding?: number,
        type?: number,
        flipY?: boolean,
        premultiplyAlpha?: boolean,
        unpackAlignment?: number,
        minFilter?: number,
        magFilter?: number,
        wrapS?: number,
        wrapT?: number,
        wrapR?: number
    }={}) {

        const gl = this.gl;

        if (props.format !== undefined) {
            this.format = props.format;
        }
        if (props.internalFormat !== undefined) {
            this.internalFormat = props.internalFormat;
        }
        if (props.encoding !== undefined) {
            this.encoding = props.encoding;
        }
        if (props.type !== undefined) {
            this.type = props.type;
        }
        if (props.flipY !== undefined) {
            this.flipY = props.flipY;
        }
        if (props.premultiplyAlpha !== undefined) {
            this.premultiplyAlpha = props.premultiplyAlpha;
        }
        if (props.unpackAlignment !== undefined) {
            this.unpackAlignment = props.unpackAlignment;
        }
        if (props.minFilter !== undefined) {
            this.minFilter = props.minFilter;
        }
        if (props.magFilter !== undefined) {
            this.magFilter = props.magFilter;
        }
        if (props.wrapS !== undefined) {
            this.wrapS = props.wrapS;
        }
        if (props.wrapT !== undefined) {
            this.wrapT = props.wrapT;
        }
        if (props.wrapR !== undefined) {
            this.wrapR = props.wrapR;
        }

        let generateMipMap = false;

        gl.bindTexture(this.target, this.texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this.flipY);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha);
        gl.pixelStorei(gl.UNPACK_ALIGNMENT, this.unpackAlignment);
        gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, gl.NONE);

        const minFilter = convertWebGLConstant(gl, this.minFilter);
        gl.texParameteri(this.target, gl.TEXTURE_MIN_FILTER, minFilter);

        if (minFilter === gl.NEAREST_MIPMAP_NEAREST
            || minFilter === gl.LINEAR_MIPMAP_NEAREST
            || minFilter === gl.NEAREST_MIPMAP_LINEAR
            || minFilter === gl.LINEAR_MIPMAP_LINEAR) {
            generateMipMap = true;
        }

        const magFilter = convertWebGLConstant(gl, this.magFilter);
        if (magFilter) {
            gl.texParameteri(this.target, gl.TEXTURE_MAG_FILTER, magFilter);
        }

        const wrapS = convertWebGLConstant(gl, this.wrapS);
        if (wrapS) {
            gl.texParameteri(this.target, gl.TEXTURE_WRAP_S, wrapS);
        }

        const wrapT = convertWebGLConstant(gl, this.wrapT);
        if (wrapT) {
            gl.texParameteri(this.target, gl.TEXTURE_WRAP_T, wrapT);
        }

        const glFormat = convertWebGLConstant(gl, this.format, this.encoding);
        const glType = convertWebGLConstant(gl, this.type);
        const glInternalFormat = getInternalFormat(gl, this.internalFormat, glFormat, glType, this.encoding, false);

        if (this.target === gl.TEXTURE_CUBE_MAP) {
            if (isArray(image)) {
                const images = image;
                const faces = [
                    gl.TEXTURE_CUBE_MAP_POSITIVE_X,
                    gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
                    gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
                    gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
                    gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
                    gl.TEXTURE_CUBE_MAP_NEGATIVE_Z
                ];
                for (let i = 0, len = faces.length; i < len; i++) {
                    // @ts-ignore
                    gl.texImage2D(faces[i], 0, glInternalFormat, glFormat, glType, images[i]);
                }
            }
        } else {
            gl.texImage2D(gl.TEXTURE_2D, 0, glInternalFormat, glFormat, glType, image);
        }

        // if (generateMipMap) {
        //     gl.generateMipmap(this.target);
        // }

        gl.bindTexture(this.target, null);
    }

    setCompressedData(params: TextureCompressedParams) {

        const gl = this.gl;
        const mipmaps = params.mipmaps || [];
        const levels = mipmaps.length;
        const props = params.props;

        // Cache props

        if (props.format !== undefined) {
            this.format = props.format;
        }
        if (props.internalFormat !== undefined) {
            this.internalFormat = props.internalFormat;
        }
        if (props.encoding !== undefined) {
            this.encoding = props.encoding;
        }
        if (props.type !== undefined) {
            this.type = props.type;
        }
        if (props.flipY !== undefined) {
            this.flipY = props.flipY;
        }
        if (props.premultiplyAlpha !== undefined) {
            this.premultiplyAlpha = props.premultiplyAlpha;
        }
        if (props.unpackAlignment !== undefined) {
            this.unpackAlignment = props.unpackAlignment;
        }
        if (props.minFilter !== undefined) {
            this.minFilter = props.minFilter;
        }
        if (props.magFilter !== undefined) {
            this.magFilter = props.magFilter;
        }
        if (props.wrapS !== undefined) {
            this.wrapS = props.wrapS;
        }
        if (props.wrapT !== undefined) {
            this.wrapT = props.wrapT;
        }
        if (props.wrapR !== undefined) {
            this.wrapR = props.wrapR;
        }

        gl.activeTexture(gl.TEXTURE0 + 0);
        gl.bindTexture(this.target, this.texture);

        let supportsMips = mipmaps.length > 1;

        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this.flipY);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha);
        gl.pixelStorei(gl.UNPACK_ALIGNMENT, this.unpackAlignment);
        gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, gl.NONE);

        const wrapS = convertWebGLConstant(gl, this.wrapS);
        if (wrapS) {
            gl.texParameteri(this.target, gl.TEXTURE_WRAP_S, wrapS);
        }

        const wrapT = convertWebGLConstant(gl, this.wrapT);
        if (wrapT) {
            gl.texParameteri(this.target, gl.TEXTURE_WRAP_T, wrapT);
        }

        // @ts-ignore
        if (this.type === gl.TEXTURE_3D || this.type === gl.TEXTURE_2D_ARRAY) {
            const wrapR = convertWebGLConstant(gl, this.wrapR);
            if (wrapR) {
                gl.texParameteri(this.target, gl.TEXTURE_WRAP_R, wrapR);
            }
            gl.texParameteri(this.type, gl.TEXTURE_WRAP_R, wrapR);
        }

        if (supportsMips) {
            gl.texParameteri(this.target, gl.TEXTURE_MIN_FILTER, filterFallback(gl, this.minFilter));
            gl.texParameteri(this.target, gl.TEXTURE_MAG_FILTER, filterFallback(gl, this.magFilter));

        } else {
            gl.texParameteri(this.target, gl.TEXTURE_MIN_FILTER, convertWebGLConstant(gl, this.minFilter));
            gl.texParameteri(this.target, gl.TEXTURE_MAG_FILTER, convertWebGLConstant(gl, this.magFilter));
        }

        const glFormat = convertWebGLConstant(gl, this.format, this.encoding);
        const glType = convertWebGLConstant(gl, this.type);
        const glInternalFormat = getInternalFormat(gl, this.internalFormat, glFormat, glType, this.encoding, false);

        gl.texStorage2D(gl.TEXTURE_2D, levels, glInternalFormat, mipmaps[0].width, mipmaps[0].height);

        for (let i = 0, len = mipmaps.length; i < len; i++) {

            const mipmap = mipmaps[i];

            if (this.format !== RGBAFormat) {
                if (glFormat !== null) {
                    gl.compressedTexSubImage2D(gl.TEXTURE_2D, i, 0, 0, mipmap.width, mipmap.height, glFormat, mipmap.data);
                } else {
                    console.warn('Attempt to load unsupported compressed texture format in .setCompressedData()');
                }
            } else {
                gl.texSubImage2D(gl.TEXTURE_2D, i, 0, 0, mipmap.width, mipmap.height, glFormat, glType, mipmap.data);
            }
        }

        gl.bindTexture(this.target, null);
    }

    setProps(props: {
        format?: number,
        internalFormat?: number,
        encoding?: number,
        type?: number,
        flipY?: boolean,
        premultiplyAlpha?: boolean,
        unpackAlignment: number,
        minFilter?: number,
        magFilter?: number,
        wrapS?: number,
        wrapT?: number,
        wrapR?: number
    }) {
        const gl = this.gl;
        gl.bindTexture(this.target, this.texture);
        this._uploadProps(props);
        gl.bindTexture(this.target, null);
    }

    _uploadProps(props: {
        format?: number,
        internalFormat?: number,
        encoding?: number,
        type?: number,
        flipY?: boolean,
        premultiplyAlpha?: boolean,
        unpackAlignment: number,
        minFilter?: number,
        magFilter?: number,
        wrapS?: number,
        wrapT?: number,
        wrapR?: number
    }) {
        const gl = this.gl;
        if (props.format !== undefined) {
            this.format = props.format;
        }
        if (props.internalFormat !== undefined) {
            this.internalFormat = props.internalFormat;
        }
        if (props.encoding !== undefined) {
            this.encoding = props.encoding;
        }
        if (props.type !== undefined) {
            this.type = props.type;
        }
        if (props.minFilter !== undefined) {
            const minFilter = convertWebGLConstant(gl, props.minFilter);
            if (minFilter) {
                this.minFilter = props.minFilter;
                gl.texParameteri(this.target, gl.TEXTURE_MIN_FILTER, minFilter);
                if (minFilter === gl.NEAREST_MIPMAP_NEAREST || minFilter === gl.LINEAR_MIPMAP_NEAREST || minFilter === gl.NEAREST_MIPMAP_LINEAR || minFilter === gl.LINEAR_MIPMAP_LINEAR) {
                    gl.generateMipmap(this.target);
                }
            }
        }
        if (props.magFilter !== undefined) {
            const magFilter = convertWebGLConstant(gl, props.magFilter);
            if (magFilter) {
                this.magFilter = props.magFilter;
                gl.texParameteri(this.target, gl.TEXTURE_MAG_FILTER, magFilter);
            }
        }
        if (props.wrapS !== undefined) {
            const wrapS = convertWebGLConstant(gl, props.wrapS);
            if (wrapS) {
                this.wrapS = props.wrapS;
                gl.texParameteri(this.target, gl.TEXTURE_WRAP_S, wrapS);
            }
        }
        if (props.wrapT !== undefined) {
            const wrapT = convertWebGLConstant(gl, props.wrapT);
            if (wrapT) {
                this.wrapT = props.wrapT;
                gl.texParameteri(this.target, gl.TEXTURE_WRAP_T, wrapT);
            }
        }
    }

    bind(unit: number) :boolean{
        if (!this.allocated) {
            return false;
        }
        if (this.texture) {
            const gl = this.gl;
            // @ts-ignore
            gl.activeTexture(gl[`TEXTURE${unit}`]);
            gl.bindTexture(this.target, this.texture);
            return true;
        }
        return false;
    }

    unbind(unit: number) {
        if (!this.allocated) {
            return;
        }
        if (this.texture) {
            const gl = this.gl;
            // @ts-ignore
            gl.activeTexture(gl[`TEXTURE${unit}`]);
            gl.bindTexture(this.target, null);
        }
    }

    destroy() {
        if (!this.allocated) {
            return;
        }
        if (this.texture) {
            this.gl.deleteTexture(this.texture);
            // @ts-ignore
            this.texture = null;
        }
    }
}

function getInternalFormat(
    gl: WebGL2RenderingContext,
    internalFormatName: string | number,
    glFormat: any,
    glType: any,
    encoding: number,
    isVideoTexture = false): number {
    if (internalFormatName !== null) {
        // @ts-ignore
        if (gl[internalFormatName] !== undefined) {
            // @ts-ignore
            return gl[internalFormatName];
        }
        console.warn('Attempt to use non-existing WebGL internal format \'' + internalFormatName + '\'');
    }
    let internalFormat = glFormat;
    if (glFormat === gl.RED) {
        if (glType === gl.FLOAT) internalFormat = gl.R32F;
        if (glType === gl.HALF_FLOAT) internalFormat = gl.R16F;
        if (glType === gl.UNSIGNED_BYTE) internalFormat = gl.R8;
    }
    if (glFormat === gl.RG) {
        if (glType === gl.FLOAT) internalFormat = gl.RG32F;
        if (glType === gl.HALF_FLOAT) internalFormat = gl.RG16F;
        if (glType === gl.UNSIGNED_BYTE) internalFormat = gl.RG8;
    }
    if (glFormat === gl.RGBA) {
        if (glType === gl.FLOAT) internalFormat = gl.RGBA32F;
        if (glType === gl.HALF_FLOAT) internalFormat = gl.RGBA16F;
        if (glType === gl.UNSIGNED_BYTE) internalFormat = (encoding === sRGBEncoding && isVideoTexture === false) ? gl.SRGB8_ALPHA8 : gl.RGBA8;
        if (glType === gl.UNSIGNED_SHORT_4_4_4_4) internalFormat = gl.RGBA4;
        if (glType === gl.UNSIGNED_SHORT_5_5_5_1) internalFormat = gl.RGB5_A1;
    }
    if (internalFormat === gl.R16F || internalFormat === gl.R32F ||
        internalFormat === gl.RG16F || internalFormat === gl.RG32F ||
        internalFormat === gl.RGBA16F || internalFormat === gl.RGBA32F) {
        getWebGLExtension(gl, 'EXT_color_buffer_float');
    }
    return internalFormat;
}

function filterFallback(gl: WebGL2RenderingContext, f: number): number {
    if (f === NearestFilter || f === NearestMipmapNearestFilter || f === NearestMipmapLinearFilter) {
        return gl.NEAREST;
    }
    return gl.LINEAR;

}
