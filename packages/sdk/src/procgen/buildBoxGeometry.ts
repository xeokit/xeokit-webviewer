import * as utils from "../utils";
import type { GeometryArrays } from "./GeometryArrays";
import { TrianglesPrimitive } from "../constants";
import { SDKError } from "../core";

/**
 * Creates box-shaped geometry arrays.
 *
 * This function generates the geometry arrays required for a box mesh with configurable sizes along each axis.
 * It provides vertex positions, UV coordinates, and indices to define the box's geometry. You can adjust the box's
 * size along the X, Y, and Z axes and also specify its center position in 3D space.
 *
 * ## Usage
 *
 * ````javascript
 * const boxGeometry = buildBoxGeometry({
 *     center: [0, 0, 0],   // Center of the box
 *     xSize: 2,            // Half-size along the X-axis
 *     ySize: 1,            // Half-size along the Y-axis
 *     zSize: 1.5           // Half-size along the Z-axis
 * });
 * ````
 *
 * @param cfg Configurations for the box geometry.
 * @param [cfg.id] Optional ID, unique among all components in the parent {@link scene!Scene | Scene}, generated automatically when omitted.
 * @param [cfg.center=[0,0,0]] The center of the box in 3D space, default is the origin `[0, 0, 0]`.
 * @param [cfg.xSize=1.0] Half-size of the box along the X-axis. The default value is `1.0`.
 * @param [cfg.ySize=1.0] Half-size of the box along the Y-axis. The default value is `1.0`.
 * @param [cfg.zSize=1.0] Half-size of the box along the Z-axis. The default value is `1.0`.
 * @returns {GeometryArrays | SDKError} Returns the geometry arrays for the box or an {@link SDKError} if the input sizes are invalid.
 *
 * @throws {SDKError} If any of the sizes (`xSize`, `ySize`, or `zSize`) are negative, an error is thrown.
 */
export function buildBoxGeometry(cfg: {
    center?: number[],
    ySize?: number,
    xSize?: number,
    zSize?: number
} = {
    center: [0, 0, 0],
    xSize: 1,
    ySize: 1,
    zSize: 1
}): GeometryArrays | SDKError {

    let xSize = cfg.xSize || 1;
    if (xSize < 0) {
        return new SDKError("Negative xSize not allowed");
    }

    let ySize = cfg.ySize || 1;
    if (ySize < 0) {
        return new SDKError("Negative ySize not allowed");
    }

    let zSize = cfg.zSize || 1;
    if (zSize < 0) {
        return new SDKError("Negative zSize not allowed");
    }

    const center = cfg.center;
    const centerX = center ? center[0] : 0;
    const centerY = center ? center[1] : 0;
    const centerZ = center ? center[2] : 0;

    const xmin = -xSize + centerX;
    const ymin = -ySize + centerY;
    const zmin = -zSize + centerZ;
    const xmax = xSize + centerX;
    const ymax = ySize + centerY;
    const zmax = zSize + centerZ;

    return utils.apply(cfg, {

        primitive: TrianglesPrimitive,

        // The vertices - eight for our cube, each
        // one spanning three array elements for X, Y, and Z
        positions: [

            // v0-v1-v2-v3 front
            xmax, ymax, zmax,
            xmin, ymax, zmax,
            xmin, ymin, zmax,
            xmax, ymin, zmax,

            // v0-v3-v4-v1 right
            xmax, ymax, zmax,
            xmax, ymin, zmax,
            xmax, ymin, zmin,
            xmax, ymax, zmin,

            // v0-v1-v6-v1 top
            xmax, ymax, zmax,
            xmax, ymax, zmin,
            xmin, ymax, zmin,
            xmin, ymax, zmax,

            // v1-v6-v7-v2 left
            xmin, ymax, zmax,
            xmin, ymax, zmin,
            xmin, ymin, zmin,
            xmin, ymin, zmax,

            // v7-v4-v3-v2 bottom
            xmin, ymin, zmin,
            xmax, ymin, zmin,
            xmax, ymin, zmax,
            xmin, ymin, zmax,

            // v4-v7-v6-v1 back
            xmax, ymin, zmin,
            xmin, ymin, zmin,
            xmin, ymax, zmin,
            xmax, ymax, zmin
        ],

        // UV coordinates for each vertex
        uv: [

            // v0-v1-v2-v3 front
            1, 0,
            0, 0,
            0, 1,
            1, 1,

            // v0-v3-v4-v1 right
            0, 0,
            0, 1,
            1, 1,
            1, 0,

            // v0-v1-v6-v1 top
            1, 1,
            1, 0,
            0, 0,
            0, 1,

            // v1-v6-v7-v2 left
            1, 0,
            0, 0,
            0, 1,
            1, 1,

            // v7-v4-v3-v2 bottom
            0, 1,
            1, 1,
            1, 0,
            0, 0,

            // v4-v7-v6-v1 back
            0, 1,
            1, 1,
            1, 0,
            0, 0
        ],

        // Indices that organize vertices into geometric primitives (triangles)
        // The triangles are specified in counter-clockwise winding order
        indices: [
            0, 1, 2,
            0, 2, 3, // front
            4, 5, 6,
            4, 6, 7, // right
            8, 9, 10,
            8, 10, 11, // top
            12, 13, 14,
            12, 14, 15, // left
            16, 17, 18,
            16, 18, 19, // bottom
            20, 21, 22,
            20, 22, 23 // back
        ]
    });
}
