import {DataModelContentParams} from "./DataModelContentParams";

/**
 * Parameters for a {@link DataModel}.
 *
 * * Returned by {@link DataModel.toParams | DataModel.toParams}
 * * Passed to {@link DataModel.fromParams | DataModel.fromParams} and {@link Data.createModel | Data.createModel}
 *
 * See {@link data | @xeokit/sdk/data} for usage.
 */
export interface DataModelParams extends DataModelContentParams {

    /**
     * Unique ID of the data model.
     *
     * The DataModel is stored in {@link Data.models | Data.models} under this ID.
     */
    id: string;

    /**
     * The project ID, if available.
     */
    projectId?: string | number;

    /**
     * The data model model ID, if available.
     */
    revisionId?: string | number;

    /**
     * The data model author, if available.
     */
    author?: string;

    /**
     * The date that the data model was created on, if available.
     */
    createdAt?: string;

    /**
     * The application that created the data model, if known.
     */
    creatingApplication?: string;

    /**
     * The data model schema version, if available.
     */
    schema?: string;
}
