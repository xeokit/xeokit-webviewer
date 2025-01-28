/**
 * Parameters for {@link CameraControl}.
 */
export interface CameraControlParams {
    mouseWheelDollyRate?: number;
    keyboardDollyRate?: number;
    panInertia?: number;
    dollyMinSpeed?: number;
    dollyProximityThreshold?: number;
    dollyInertia?: number;
    touchDollyRate?: number;
    dragRotationRate?: number;
    keyboardRotationRate?: number;
    touchPanRate?: number;
    keyboardPanRate?: number;
    rotationInertia?: number;
    followPointer?: boolean;
    active?: boolean;
    panRightClick?: boolean;
    keyMap?: any;
    keyboardLayout?: any;
    constrainVertical?: boolean;
    planView?: boolean;
    navMode?: number;
    doublePickFlyTo?: boolean;
    keyboardEnabled?: boolean;
}
