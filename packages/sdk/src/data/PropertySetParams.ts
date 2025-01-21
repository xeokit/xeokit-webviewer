import type {PropertyParams} from "./PropertyParams";

/**
 * Parameters for a {@link PropertySet}.
 *
 * * Passed to  {@link DataModel.createPropertySet | DataModel.createPropertySet}
 * * Located at {@link DataModelParams.propertySets | DataModelParams.propertySets}
 *
 * See {@link data | @xeokit/sdk/data}   for usage.
 */
export interface PropertySetParams {

    /**
     * Unique ID of the PropertySet.
     *
     * PropertySets are stored by ID in {@link Data.propertySets | Data.propertySets} and {@link DataModel.propertySets | DataModel.propertySets}.
     */
    id: string;

    /**
     * Human-readable name of the PropertySet.
     */
    name: string;

    /**
     * Type of each PropertySet.
     */
    type: string;

    /**
     * The {@link Property | Properties} within the PropertySet.
     */
    properties: PropertyParams[];
}
