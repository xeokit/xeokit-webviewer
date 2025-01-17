/**
 * Configuration for an {@link OrthoProjection}.
 *
 * * Returned by {@link OrthoProjection.getJSON | OrthoProjection.getJSON}
 * * Located at {@link CameraParams.orthoProjection | CameraParams.orthoProjection}
 */
export interface OrthoProjectionParams {

    far?: number;

    near?: number;

    scale?: number;
}
