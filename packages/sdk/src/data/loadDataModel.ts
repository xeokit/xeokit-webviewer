import { DataModelParams } from "./DataModelParams";
import { DataModel } from "./DataModel";

/**
 * Loads {@link DataModelParams | DataModelParams} into a {@link DataModel | DataModel}.
 *
 * This function expects the {@link DataModel.built | DataModel.built} and
 * {@link DataModel.destroyed | DataModel.destroyed} flags to be `false` before loading.
 *
 * For detailed usage, refer to {@link data | @xeokit/sdk/data}.
 *
 * @param params - The parameters for loading the DataModel.
 * @param params.fileData - The {@link DataModelParams | DataModelParams} to load into the DataModel.
 * @param params.dataModel - The {@link DataModel | DataModel} instance to load the data into.
 *
 * @returns {Promise<void>} A promise that resolves when the DataModel has been successfully loaded.
 *
 * @throws *{@link core!SDKError | SDKError}*
 * - If the DataModel has already been destroyed.
 * - If the DataModel has already been built.
 */
export function loadDataModel(params: {
    fileData: DataModelParams;
    dataModel: DataModel;
}): Promise<void> {
    return new Promise<void>(function (resolve, reject) {
        if (!params) {
            return reject("Argument expected: params");
        }
        const { fileData, dataModel } = params;
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
