
import type {PropertySetParams} from "./PropertySetParams";
import type {DataObjectParams} from "./DataObjectParams";
import type {RelationshipParams} from "./RelationshipParams";

/**
 * Parameters for populating a {@link DataModel} with {@link data!DataModel.fromJSON | DataModel.fromJSON}.
 *
 * See {@link data | @xeokit/sdk/data} for usage.
 */
export interface DataModelContentParams {

    /**
     * The{@link PropertySet | PropertySets} in the DataModel.
     */
    propertySets?: PropertySetParams[];

    /**
     * The {@link DataObject | DataObjects} in the DataModel.
     */
    objects?: DataObjectParams[];

    /**
     * The {@link Relationship | Relationshipships} in the DataModel.
     */
    relationships?: RelationshipParams[];
}
