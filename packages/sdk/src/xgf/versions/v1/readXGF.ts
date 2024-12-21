import {unpackXGF} from "./unpackXGF";
import {SceneModel} from "../../../scene";
import {xgfToModel} from "./xgfToModel";
import {DataModel} from "../../../data";

/**
 * @private
 */
export function readXGF(params: {
    fileData: ArrayBuffer;
    sceneModel?: SceneModel;
    dataModel?: DataModel;
}): void {
    const {fileData, sceneModel, dataModel} = params;
    xgfToModel({
        xgfData: unpackXGF(fileData),
        sceneModel,
        dataModel
    });
}
