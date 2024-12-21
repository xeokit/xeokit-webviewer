
/**
 * Parameters for creating a {@link data!Relationship | Relationship} with {@link data!DataModel.createRelationship | DataModel.createRelationship}.
 *
 * See {@link "@xeokit/data" | @xeokit/data}  for usage.
 */
export interface RelationshipParams {

    /**
     * The relationship type.
     */
    type: number,

    /**
     * The relating {@link data!DataObject | DataObject}.
     */
    relatingObjectId: string,

    /**
     * The related {@link data!DataObject | DataObject}.
     */
    relatedObjectId: string
}
