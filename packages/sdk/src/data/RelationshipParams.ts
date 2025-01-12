
/**
 * Parameters for creating a {@link Relationship | Relationship} with {@link DataModel.createRelationship | DataModel.createRelationship}.
 *
 * See {@link data | @xeokit/sdk/data}   for usage.
 */
export interface RelationshipParams {

    /**
     * The relationship type.
     */
    type: number,

    /**
     * The relating {@link DataObject | DataObject}.
     */
    relatingObjectId: string,

    /**
     * The related {@link DataObject | DataObject}.
     */
    relatedObjectId: string
}
