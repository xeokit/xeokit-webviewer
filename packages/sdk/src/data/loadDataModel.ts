import {DataModelParams} from "./DataModelParams";
import {DataModel} from "./DataModel";


/**
 * Loads {@link DataModelParams | DataModelParams} into a {@link DataModel | DataModel}.
 *
 * Expects {@link DataModel.built | DataModel.built} and
 * {@link DataModel.destroyed | DataModel.destroyed} to be ````false````
 *
 * See {@link data | @xeokit/sdk/data}  for usage.
 *
 * @param params - Loading parameters.
 * @param params.fileData - DataModelParams to load.
 * @param params.dataModel - DataModel to load into.
 * @returns {Promise} Resolves when DataModel has been loaded.
 * @throws *{@link core!SDKError | SDKError}*
 * * If the DataModel has already been destroyed.
 * * If the DataModel has already been built.
 */
export function loadDataModel(params: {
    fileData: DataModelParams;
    dataModel: DataModel;
}): Promise<void> {
    return new Promise<void>(function (resolve, reject) {
        if (!params) {
            return reject("Argument expected: params");
        }
        const {fileData, dataModel} = params;
        if (!fileData) {
            return reject("Argument expected: fileData");
        }
        if (!dataModel) {
            return reject("Parameter expected: params.dataModel");
        }
        if (dataModel.destroyed) {
            return reject("DataModel already destroyed");
        }
        if (dataModel.built) {
            return reject("DataModel already built");
        }
        dataModel.fromParams(fileData);
        return resolve();
    });
}
