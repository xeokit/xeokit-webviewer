
import type {PropertySetParams} from "./PropertySetParams";
import type {DataObjectParams} from "./DataObjectParams";
import type {RelationshipParams} from "./RelationshipParams";

/**
 * Parameters for creating content within a {@link data!DataModel | DataModel}.
 *
 * See {@link "@xeokit/data" | @xeokit/data}  for usage.
 */
export interface DataModelContentParams {

    /**
     * The{@link data!PropertySet | PropertySets} in the DataModel.
     */
    propertySets?: PropertySetParams[];

    /**
     * The {@link data!DataObject | DataObjects} in the DataModel.
     */
    objects?: DataObjectParams[];

    /**
     * The {@link data!Relationship | Relationshipships} in the DataModel.
     */
    relationships?: RelationshipParams[];
}
