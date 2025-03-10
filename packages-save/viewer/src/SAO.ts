import type {View} from "./View";
import {Component, SDKError} from "@xeokit/core";
import {CustomProjectionType, FastRender, FrustumProjectionType, QualityRender} from "@xeokit/constants";

/**
 * Configures Scalable Ambient Obscurance (SAO) for a {@link @xeokit/viewer!View}.
 */
export class SAO extends Component {

    /**
     * The View to which this SAO belongs.
     */
    public readonly view: View;

    #state: {
        renderModes: number[];
        intensity: number;
        minResolution: number;
        blendFactor: number;
        numSamples: number;
        bias: number;
        scale: number;
        blur: boolean;
        blendCutoff: number;
        enabled: boolean;
        kernelRadius: number;
    }

    /** @private */
    constructor(view: View, params: any) {

        super(view, params);

        this.view = view;

        this.#state = {
            renderModes: [QualityRender],
            enabled: params.enabled !== false,
            kernelRadius: params.kernelRadius || 100.0,
            intensity: (params.intensity !== undefined) ? params.intensity : 0.15,
            bias: (params.bias !== undefined) ? params.bias : 0.5,
            scale: (params.scale !== undefined) ? params.scale : 1.0,
            minResolution: (params.minResolution !== undefined) ? params.minResolution : 0.0,
            numSamples: (params.numSamples !== undefined) ? params.numSamples : 10,
            blur: !!(params.blur),
            blendCutoff: (params.blendCutff !== undefined) ? params.blendCutoff : 0.3,
            blendFactor: (params.blendFactor !== undefined) ? params.blendFactor : 1.0
        };
    }

    /**
     * Sets which rendering modes in which to render edges.
     *
     * Accepted modes are {@link @xeokit/constants!QualityRender | QualityRender} and {@link @xeokit/constants!FastRender | FastRender}.
     *
     * Default value is [{@link @xeokit/constants!QualityRender | QualityRender}].
     */
    set renderModes(value: number[]) {
        this.#state.renderModes = value;
        this.view.redraw();
    }

    /**
     * Gets which rendering modes in which to render SAO.
     *
     * Supported rendering modes are:
     *
     * * {@link @xeokit/constants!FastRender | FastRender} - Fast rendering mode for smooth interactivity.
     * * {@link @xeokit/constants!QualityRender | QualityRender} - Quality rendering mode for maximum image fidelity.
     *
     * Default value is [{@link @xeokit/constants!QualityRender | QualityRender}].
     */
    get renderModes(): number[] {
        return this.#state.renderModes;
    }

    /**
     * Gets whether SAO is supported by this browser and GPU.
     *
     * Even when enabled, SAO will only work if supported.
     */
    get supported(): boolean {
        return this.view.viewer.renderer.getSAOSupported();
    }

    /**
     * Gets whether SAO is enabled for the {@link @xeokit/viewer!View}.
     *
     * Even when enabled, SAO will only apply if supported.
     *
     * Default value is ````false````.
     */
    get enabled(): boolean {
        return this.#state.enabled;
    }

    /**
     * Sets whether SAO is enabled for the {@link @xeokit/viewer!View}.
     *
     * Even when enabled, SAO will only work if supported.
     *
     * Default value is ````false````.
     */
    set enabled(value: boolean) {
        value = !!value;
        if (this.#state.enabled === value) {
            return;
        }
        this.#state.enabled = value;
        this.view.redraw();
    }

    /**
     * Returns true if SAO is currently possible, where it is supported, enabled, and the current view state is compatible.
     * Called internally by renderers logic.
     * @private
     */
    get possible(): boolean {
        if (!this.supported) {
            return false;
        }
        if (!this.#state.enabled) {
            return false;
        }
        const projectionType = this.view.camera.projectionType;
        if (projectionType === CustomProjectionType) {
            return false;
        }
        if (projectionType === FrustumProjectionType) {
            return false;
        }
        return true;
    }

    /**
     * Gets the maximum area that SAO takes into account when checking for possible occlusion for each fragment.
     *
     * Default value is ````100.0````.
     */
    get kernelRadius(): number {
        return this.#state.kernelRadius;
    }

    /**
     * Sets the maximum area that SAO takes into account when checking for possible occlusion for each fragment.
     *
     * Default value is ````100.0````.
     */
    set kernelRadius(value: number) {
        if (value === undefined || value === null) {
            value = 100.0;
        }
        if (this.#state.kernelRadius === value) {
            return;
        }
        this.#state.kernelRadius = value;
        this.view.redraw();
    }

    /**
     * Gets the degree of darkening (ambient obscurance) produced by the SAO effect.
     *
     * Default value is ````0.15````.
     */
    get intensity(): number {
        return this.#state.intensity;
    }

    /**
     * Sets the degree of darkening (ambient obscurance) produced by the SAO effect.
     *
     * Default value is ````0.15````.
     */
    set intensity(value: number) {
        if (value === undefined || value === null) {
            value = 0.15;
        }
        if (this.#state.intensity === value) {
            return;
        }
        this.#state.intensity = value;
        this.view.redraw();
    }

    /**
     * Gets the SAO bias.
     *
     * Default value is ````0.5````.
     */
    get bias(): number {
        return this.#state.bias;
    }

    /**
     * Sets the SAO bias.
     *
     * Default value is ````0.5````.
     */
    set bias(value: number) {
        if (value === undefined || value === null) {
            value = 0.5;
        }
        if (this.#state.bias === value) {
            return;
        }
        this.#state.bias = value;
        this.view.redraw();
    }

    /**
     * Gets the SAO occlusion scale.
     *
     * Default value is ````1.0````.
     */
    get scale(): number {
        return this.#state.scale;
    }

    /**
     * Sets the SAO occlusion scale.
     *
     * Default value is ````1.0````.
     */
    set scale(value: number) {
        if (value === undefined || value === null) {
            value = 1.0;
        }
        if (this.#state.scale === value) {
            return;
        }
        this.#state.scale = value;
        this.view.redraw();
    }

    /**
     * Gets the SAO minimum resolution.
     *
     * Default value is ````0.0````.
     */
    get minResolution(): number {
        return this.#state.minResolution;
    }

    /**
     * Sets the SAO minimum resolution.
     *
     * Default value is ````0.0````.
     */
    set minResolution(value: number) {
        if (value === undefined || value === null) {
            value = 0.0;
        }
        if (this.#state.minResolution === value) {
            return;
        }
        this.#state.minResolution = value;
        this.view.redraw();
    }

    /**
     * Gets the number of SAO samples.
     *
     * Default value is ````10````.
     */
    get numSamples(): number {
        return this.#state.numSamples;
    }

    /**
     * Sets the number of SAO samples.
     *
     * Default value is ````10````.
     *
     * Update this sparingly, since it causes a shader recompile.
     */
    set numSamples(value: number) {
        if (value === undefined || value === null) {
            value = 10;
        }
        if (this.#state.numSamples === value) {
            return;
        }
        this.#state.numSamples = value;
        this.view.redraw();
    }

    /**
     * Gets whether Guassian blur is enabled.
     *
     * Default value is ````true````.
     */
    get blur(): boolean {
        return this.#state.blur;
    }

    /**
     * Sets whether Guassian blur is enabled.
     *
     * Default value is ````true````.
     */
    set blur(value: boolean) {
        value = (value !== false);
        if (this.#state.blur === value) {
            return;
        }
        this.#state.blur = value;
        this.view.redraw();
    }

    /**
     * Gets the SAO blend cutoff.
     *
     * Default value is ````0.3````.
     *
     * Normally you don't need to alter this.
     */
    get blendCutoff(): number {
        return this.#state.blendCutoff;
    }

    /**
     * Sets the SAO blend cutoff.
     *
     * Default value is ````0.3````.
     *
     * Normally you don't need to alter this.
     */
    set blendCutoff(value: number) {
        if (value === undefined || value === null) {
            value = 0.3;
        }
        if (this.#state.blendCutoff === value) {
            return;
        }
        this.#state.blendCutoff = value;
        this.view.redraw();
    }

    /**
     * Gets the SAO blend scale.
     *
     * Default value is ````1.0````.
     *
     * Normally you don't need to alter this.
     */
    get blendFactor(): number {
        return this.#state.blendFactor;
    }

    /**
     * Sets the SAO blend factor.
     *
     * Default value is ````1.0````.
     *
     * Normally you don't need to alter this.
     */
    set blendFactor(value: number) {
        if (value === undefined || value === null) {
            value = 1.0;
        }
        if (this.#state.blendFactor === value) {
            return;
        }
        this.#state.blendFactor = value;
        this.view.redraw();
    }

    /**
     * Gets if SAO is currently applied.
     *
     * This is `true` when {@link SAO.enabled | SAO.enabled} is `true`
     * and {@link View.renderMode | View.renderMode} is
     * in {@link SAO.renderModes | SAO.renderModes}.
     */
    get applied(): boolean {
        if (!this.#state.enabled) {
            return false;
        }
        for (let i = 0, len = this.#state.renderModes.length; i < len; i++) {
            if (this.view.renderMode === this.#state.renderModes[i]) {
                return true;
            }
        }
        return false;
    }

    /**
     * @private
     */
    destroy() {
        super.destroy();
    }
}
