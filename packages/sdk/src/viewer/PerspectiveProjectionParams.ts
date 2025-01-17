
/**
 * Configuration for a {@link PerspectiveProjection}.
 *
 * * Returned by {@link PerspectiveProjection.getJSON | PerspectiveProjection.getJSON}
 * * Located at {@link CameraParams.perspectiveProjection | CameraParams.perspectiveProjection}
 */
export interface PerspectiveProjectionParams {

    far?: number;

    near?: number;

    fov?: number;

    fovAxis?: string;
}
