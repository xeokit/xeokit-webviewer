/**
 * Parameters to create a {@link data!DataObject | DataObject} with {@link data!DataModel.createObject | DataModel.createObject}.
 *
 * See {@link "@xeokit/data" | @xeokit/data}  for usage.
 */
export interface DataObjectParams {

    /**
     * Globally-unique ID for the {@link data!DataObject | DataObject}.
     *
     * DataObjects are stored by ID in {@link data!Data.objects | Data.objects}, {@link data!Data.rootObjects | Data.rootObjects}, {@link data!Data.objectsByType | Data.objectsByType}, {@link data!DataModel.objects | Data.objects}, {@link data!DataModel.rootObjects | Data.rootObjects}.
     *
     * See {@link data!Data | Data} for usage examples.
     */
    id: string;

    /**
     * ID of this DataObject within the originating system, is any. Defaults to the value of
     * {@link data!DataObject.id | DataObject.id}.
     */
    originalSystemId?: string;

    /**
     * The {@link data!DataObject | DataObject} type.
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
     * IDs of associated{@link data!PropertySet | PropertySets}, if any.
     */
    propertySetIds?: string[];
}
