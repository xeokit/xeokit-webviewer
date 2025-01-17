/**
 * Configures a {@link PointsMaterial}.
 *
 * * Returned by {@link PointsMaterial.getJSON | PointsMaterial.getJSON}
 * * Located at {@link ViewerParams.pointsMaterial | ViewerParams.pointsMaterial}
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
