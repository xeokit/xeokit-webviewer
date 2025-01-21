/**
 * Parameters for a {@link DataObject}.
 *
 * * Passed to  {@link DataModel.createObject | DataModel.createObject}
 * * Located at {@link DataModelParams.objects | DataModelParams.objects}
 *
 * See {@link data | @xeokit/sdk/data}   for usage.
 */
export interface DataObjectParams {

    /**
     * Globally-unique ID for the {@link DataObject | DataObject}.
     *
     * DataObjects are stored by ID in {@link Data.objects | Data.objects}, {@link Data.rootObjects | Data.rootObjects}, {@link Data.objectsByType | Data.objectsByType}, {@link DataModel.objects | Data.objects}, {@link DataModel.rootObjects | Data.rootObjects}.
     *
     * See {@link scene | @xeokit/sdk/scene}   for usage.
     */
    id: string;

    /**
     * ID of this DataObject within the originating system, is any. Defaults to the value of
     * {@link DataObject.id | DataObject.id}.
     */
    originalSystemId?: string;

    /**
     * The {@link DataObject | DataObject} type.
     */
    type: number;

    /**
     * Human-readable name for the DataObject.
     */
    name: string;

    /**
     * Human-readable description for the DataObject.
     */
    description?: string;

    /**
     * IDs of associated{@link PropertySet | PropertySets}, if any.
     */
    propertySetIds?: string[];
}
