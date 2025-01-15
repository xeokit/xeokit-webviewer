import {FloatArrayParam} from "../math";

/**
 * Configures a {@link PointLight}.
 */
export interface PointLightParams {

    /** Optional ID, generated automatically when omitted.
     */
    id?: string;

    /** Intensity of the PointLight, as a factor in range ````[0..1]````.
     */
    intensity?: number;

    /** RGB color.
      */
    color?: FloatArrayParam;

    /** World-space position.
      */
    pos?: FloatArrayParam;

    /** Quadratic attenuation factor.
     */
    quadraticAttenuation?: number;

    /** Constant attenuation factor.
     */
    constantAttenuation?: number;

    /** The coordinate system the PointLight is defined in - "view" or "world".
      */
    space?: string;

    /** Linear attenuation factor.
     */
    linearAttenuation?: number;

}
