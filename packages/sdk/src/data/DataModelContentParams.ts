
import type {PropertySetParams} from "./PropertySetParams";
import type {DataObjectParams} from "./DataObjectParams";
import type {RelationshipParams} from "./RelationshipParams";

/**
 * Parameters for populating a {@link DataModel} with {@link data!DataModel.fromParams | DataModel.fromParams}.
 *
 * See {@link data | @xeokit/sdk/data} for usage.
 */
export interface DataModelContentParams {

    /**
     * Parameters fpr {@link PropertySet | PropertySets} in the {@link DataModel | DataModel}.
     */
    propertySets?: PropertySetParams[];

    /**
     * Parameters fpr {@link DataObject | DataObjects} in the {@link DataModel | DataModel}.
     */
    objects?: DataObjectParams[];

    /**
     * Parameters fpr {@link Relationship | Relationships} in the {@link DataModel | DataModel}.
     */
    relationships?: RelationshipParams[];
}
