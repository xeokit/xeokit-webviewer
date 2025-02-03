import  {DataModel} from "../data";
import  {SceneModel} from "../scene";
import {SDKError} from "../core";
import {decompressPoint3WithAABB3} from "../compression";
import {createVec3, createVec4, decomposeMat4} from "../matrix";
import {ifcTypeNames} from "../ifctypes";

const tempVec3a = createVec3();
const tempVec3b = createVec3();

/**
 * Exports a {@link scene!SceneModel | SceneModel} and/or a {@link data!DataModel | DataModel} to a JSON object
 * containing the corresponding .BIM file data.
 *
 * This function allows you to export the data from both a SceneModel and a DataModel into a unified .BIM file format,
 * represented as a JSON object, for further usage or storage.
 *
 * For further usage, refer to {@link dotbim | @xeokit/sdk/dotbim}.
 *
 * @param params - The parameters required for exporting the models to .BIM format.
 * @param params.model - The {@link scene!SceneModel | SceneModel} to export to .BIM format.
 * @param params.dataModel - The {@link data!DataModel | DataModel} to export to .BIM format.
 *
 * @returns A JSON object representing the exported .BIM file data.
 *
 * @throws {@link core!SDKError | SDKError}
 * - If the {@link scene!SceneModel | SceneModel} has already been destroyed.
 * - If the {@link scene!SceneModel | SceneModel} has not yet been built.
 * - If the {@link data!DataModel | DataModel} has already been destroyed.
 * - If the {@link data!DataModel | DataModel} has not yet been built.
 */
export function saveDotBIM(params: {
    sceneModel: SceneModel,
    dataModel?: DataModel
}): Object {
    const {
        sceneModel,
        dataModel
    } = params;
    if (!sceneModel) {
        throw new SDKError("Argument expected: params.sceneModel");
    }
    if (!(sceneModel instanceof SceneModel)) {
        throw new SDKError("Argument type mismatch: params.sceneModel should be a SceneModel");
    }
    if (sceneModel.destroyed) {
        throw new SDKError("SceneModel already destroyed");
    }
    if (!sceneModel.built) {
        throw new SDKError("SceneModel not yet built");
    }
    if (dataModel) {
        if (!(dataModel instanceof DataModel)) {
            throw new SDKError("Argument type mismatch: params.dataModel should be a DataModel");
        }
        if (dataModel.destroyed) {
            throw new SDKError("DataModel already destroyed");
        }
        if (!dataModel.built) {
            throw new SDKError("DataModel not yet built");
        }
    }
    return modelToDotBIM({
        sceneModel,
        dataModel
    });
}

function modelToDotBIM(params: {
    sceneModel: SceneModel,
    dataModel?: DataModel;
}): Object {

    const {
        sceneModel,
        dataModel
    } = params;

    const dotBim = {
        meshes: [],
        elements: []
    };

    const geometries = Object.values(sceneModel.geometries);

    const meshLookup = {};

    for (let i = 0, len = geometries.length; i < len; i++) {
        const geometry = geometries[i];
        const aabb = geometry.aabb;
        const coordinates = [];
        const positionsCompressed = geometry.positionsCompressed;
        for (let k = 0, lenk = positionsCompressed.length; k < lenk; k += 3) {
            tempVec3a[0] = positionsCompressed[k];
            tempVec3a[1] = positionsCompressed[k + 1];
            tempVec3a[2] = positionsCompressed[k + 2];
            decompressPoint3WithAABB3(tempVec3a, aabb, tempVec3b);
            coordinates.push(tempVec3b[0]);
            coordinates.push(tempVec3b[1]);
            coordinates.push(tempVec3b[2]);
        }
        meshLookup[geometry.id] = {
            mesh_id: geometry.id,
            coordinates,
            indices: geometry.indices || []
        };
    }

    const sceneObjects = Object.values(sceneModel.objects);

    for (let i = 0, len = sceneObjects.length; i < len; i++) {
        const sceneObject = sceneObjects[i];
        const meshes = sceneObject.meshes;
        let meshId;
        let dbMesh;
        if (meshes.length === 1) {
            const mesh = meshes[0];
            const geometry = mesh.geometry;
            dbMesh = meshLookup[geometry.id];
            dotBim.meshes.push(dbMesh);
            meshId = geometry.id;
        } else {
            dbMesh = {
                mesh_id: sceneObject.id,
                coordinates: [],
                indices: []
            };
            let indicesOffset = 0;
            for (let j = 0, lenj = meshes.length; j < lenj; j++) {
                const sceneMesh = meshes[j];
                const geometry = sceneMesh.geometry;
                const lookupGeometry = meshLookup[geometry.id];
                const coordinates = lookupGeometry.coordinates;
                for (let k = 0, lenk = coordinates.length; k < lenk; k++) {
                    dbMesh.coordinates.push(coordinates[k]);
                }
                const indices = lookupGeometry.indices;
                for (let k = 0, lenk = indices.length; k < lenk; k++) {
                    dbMesh.indices.push(indices[k] + indicesOffset);
                }
                indicesOffset += coordinates.length / 3;
            }
            dotBim.meshes.push(dbMesh);
            meshId = sceneObject.id;
        }
        const firstMesh = meshes[0];
        const color = firstMesh.color;
        const position = createVec3();
        const quaternion = createVec4();
        const scale = createVec3();
        decomposeMat4(firstMesh.matrix, position, quaternion, scale);
        const info: any = {
            id: sceneObject.id,
            Tag: "None"
        };
        let dataObject;
        if (dataModel) {
            dataObject = dataModel.objects[sceneObject.id];
            if (dataObject) {
                info.type = ifcTypeNames[dataObject.type];
                info.Name = dataObject.name;
                info.Description = dataObject.description;
            }
        }
        if (!dataObject) {
            info.type = "None";
            info.Name = "None";
            info.Description = "None";
        }
        dotBim.elements.push({
            info,
            mesh_id: dbMesh.mesh_id,
            type: info.type,
            color: {
                r: color[0],
                g: color[1],
                b: color[2],
                a: firstMesh.opacity
            },
            vector: {
                x: position[0],
                y: position[1],
                z: position[2]
            },
            rotation: {
                qx: quaternion[0],
                qy: quaternion[0],
                qz: quaternion[0],
                qw: quaternion[0]
            },
            qy: quaternion[1],
            qz: quaternion[2],
            qw: quaternion[3]
        });
    }

    return dotBim;
}
