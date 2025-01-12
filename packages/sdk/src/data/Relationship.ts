import type {DataObject} from "./DataObject";

/**
 * A relationship between two {@link DataObject | DataObjects}.
 *
 * See {@link data | @xeokit/sdk/data}   for usage.
 */
export class Relationship {

    /**
     * The type of this Relationship.
     *
     * This can be any value that identifies the Relationship type within your DataModel.
     */
    readonly type: number;

    /**
     * The relating {@link DataObject | DataObject} in this Relationship.
     *
     * This Relationship will be stored by {@link DataObject.type | DataObject.type}
     * in the DataObject's {@link DataObject.related | DataObject.related} attribute.
     */
    readonly relatingObject: DataObject;

    /**
     * The related {@link DataObject | DataObject} in this Relationship.
     *
     * This Relationship will be stored by {@link DataObject.type | DataObject.type} in
     * the DataObject's {@link DataObject.relating | DataObject.relating} attribute.
     */
    readonly relatedObject: DataObject;

    /**
     * @private
     * @ignore
     */
    constructor(type: number, relatingObject: DataObject, relatedObject: DataObject) {
        this.type = type;
        this.relatingObject = relatingObject;
        this.relatedObject = relatedObject;
    }
}
