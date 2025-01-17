/**
 * Configuration for a {@link FrustumProjection}.
 *
 * * Returned by {@link FrustumProjection.getJSON | FrustumProjection.getJSON}
 * * Located at {@link CameraParams.frustumProjection | CameraParams.frustumProjection}
 */
export interface FrustumProjectionParams {
    far: number;
    near: number;
    left: number;
    right: number;
    bottom: number;
    top: number;
}
