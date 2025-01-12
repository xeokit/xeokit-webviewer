/**
 * <img style="padding:10px; width:300px" src="/docs/assets/xeokit_components_icon.png"/>
 *
 * # xeokit Basic Semantic Data Types
 *
 * * Defines numeric constants for a basic set of entity and relationship types.
 * * Use with {@link data | data}  to assign basic types to {@link data!DataObject | DataObjects}
 * and {@link data!Relationship | Relationships} and treat them as elements of a basic entity-relationship graph.
 * * Use with {@link treeview | treeview} , to configure the appearance and behaviour of
 * {@link treeview!TreeView | TreeViews} for navigating basic element hierachies.
 *
 *  # Installation
 *
 * ````bash
 * npm install @xeokit/sdk
 * ````
 *
 * # Usage
 *
 * ````javascript
 * import {BasicEntity, BasicAggregation} from "@xeokit/sdk/basctypes";
 *
 * //...
 * ````
 *
 * @module basictypes
 */

/**
 * A generic entity.
 */
export const BasicEntity = 1000;

/**
 * A generic aggregation relationship between two generic entities.
 */
export const BasicAggregation = 1001;


/**
 * Map of names for all basic entity types.
 */
export const typeNames: { [key: number]: string } = {
    [BasicEntity]: "BasicEntity",
    [BasicAggregation]: "BasicAggregation"
};

/**
 * Map of type codes for all basic entity type names.
 */
export const typeCodes: { [key: string]: number } = {
    "BasicEntity": BasicEntity,
    "BasicAggregation": BasicAggregation
};
