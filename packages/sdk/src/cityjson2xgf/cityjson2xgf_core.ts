#!/usr/bin/env node

import {Data, DataModel} from "../data";
import {Scene, SceneModel} from "../scene";
import {SDKError} from "../core";
import {loadCityJSON} from "../cityjson";
import {saveXGF, SAVED_XGF_VERSIONS, DEFAULT_SAVED_XGF_VERSION} from "../xgf";

/**
 * @private
 */
function cityjson2xgf_core(params: {
    fileData: any,
    xgfVersion?: number,
    createDataModel?: boolean
}): Promise<{
    xgfArrayBuffer: ArrayBuffer,
    sceneModel: SceneModel,
    dataModel?: DataModel,
    dataModelParams: any
}> {
    const {fileData, xgfVersion, createDataModel} = params;
    return new Promise(function (resolve, reject) {
        const scene = new Scene();
        const sceneModel = scene.createModel({
            id: "foo"
        });
        if (sceneModel instanceof SDKError) {
            return reject(sceneModel.message);
        } else {
            const data = new Data();
            const dataModel = data.createModel({
                id: "foo"
            });
            if (dataModel instanceof SDKError) {
                return reject(dataModel.message);
            } else {
                loadCityJSON({
                    fileData,
                    dataModel,
                    sceneModel
                }).then(() => {
                    sceneModel.build().then(() => {
                        dataModel.build().then(() => {
                            const xgfArrayBuffer = saveXGF({
                                sceneModel,
                                xgfVersion
                            });
                            if (xgfArrayBuffer instanceof SDKError) {
                                return reject(xgfArrayBuffer.message);
                            } else {
                                const dataModelParams = dataModel.toParams();
                                return resolve({
                                    xgfArrayBuffer,
                                    sceneModel,
                                    dataModel,
                                    dataModelParams
                                });
                            }
                        }).catch(reason => {
                            return reject(reason);
                        });
                    }).catch((reason) => {
                        return reject(reason);
                    });
                }).catch((reason) => {
                    return reject(reason);
                });
            }

        }
    });
}

/**
 *
 */
export {cityjson2xgf_core};

/**
 * @private
 */
export const _SAVED_XGF_VERSIONS = SAVED_XGF_VERSIONS; // Make these private for our CLI tool's use only

/**
 * @private
 */
export const _DEFAULT_SAVED_XGF_VERSION = DEFAULT_SAVED_XGF_VERSION;
