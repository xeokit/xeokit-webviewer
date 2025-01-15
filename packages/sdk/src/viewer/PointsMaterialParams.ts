/**
 * Configures a {@link PointsMaterial}.
 */
export interface PointsMaterialParams {
    pointSize?: number,
    roundPoints?: boolean,
    perspectivePoints?: boolean,
    minPerspectivePointSize?: number,
    maxPerspectivePointSize?: number,
    filterIntensity?: boolean,
    minIntensity?: number,
    maxIntensity?: number
}
