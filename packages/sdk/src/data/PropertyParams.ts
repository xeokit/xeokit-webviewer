/**
 * Parameters for a {@link Property}.
 *
 * Located at {@link PropertySetParams.properties | PropertySetParams.properties}
 *
 * See {@link data | @xeokit/sdk/data}   for usage.
 */
export interface PropertyParams {

    /**
     * Name of the {@link Property}.
     */
    name: string;

    /**
     * Value of the {@link Property}.
     */
    value: any;

    /**
     * Type of the {@link Property}.
     */
    type?: string;

    /**
     * Value type of the {@link Property}.
     */
    valueType?: string | number;

    /**
     * Description of the {@link Property}.
     */
    description?: string;
}
