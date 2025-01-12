import type {PropertySet} from "./PropertySet";
import type {DataModel} from "./DataModel";
import type {Relationship} from "./Relationship";
import type {Data} from "./Data";

/**
 * An object within a {@link DataModel | DataModel}.
 *
 * * Created with {@link DataModel.createObject | DataModel.createObject}
 * * Stored in {@link Data.objects | Data.objects}, {@link Data.rootObjects | Data.rootObjects}, {@link Data.objectsByType | Data.objectsByType}, {@link DataModel.objects | Data.objects}, {@link DataModel.rootObjects | Data.rootObjects}
 *
 * See {@link data | @xeokit/sdk/data}   for usage.
 */
export class DataObject {

    /**
     *  {@link Data | Data} that contains this DataObject.
     */
    public data: Data;

    /**
     * {@link DataModel | DataModels} that share this DataObject.
     */
    public models: DataModel[];

    /**
     * Globally-unique ID.
     *
     * DataObjects are stored by ID in {@link Data.objects | Data.objects}, {@link Data.rootObjects | Data.rootObjects}, {@link Data.objectsByType | Data.objectsByType} and {@link DataModel.rootObjects | Data.rootObjects}.
     */
    public readonly id: string;

    /**
     * ID of this DataObject within the originating system, is any. Defaults to the value of
     * {@link DataObject.id | DataObject.id}.
     */
    originalSystemId?: string;

    /**
     * Human-readable name.
     */
    public readonly name?: string;

    /**
     * Human-readable description.
     */
    public readonly description?: string;

    /**
     * DataObject's type.
     */
    public readonly type: number;

    /**
     *{@link PropertySet | PropertySets} referenced by this DataObject.
     */
    public readonly propertySets?: PropertySet[];

    /**
     * The {@link Relationship | Relations} in which this DataObject is the {@link Relationship.relatingObject | Relationship.relatingObject} participant.
     *
     * Each DataObject is mapped here by {@link Relationship.type | Relationship.type} and sub-mapped by {@link Relationship.relatingObject | Relationship.relatingObject}.
     */
    public readonly relating: {
        [key: number]: Relationship[]
    };

    /**
     * The {@link Relationship | Relationships} in which this DataObject is the {@link Relationship.relatedObject | Relationship.relatedObject} participant.
     *
     * Each DataObject is mapped here by {@link Relationship.type | Relationship.type} and sub-mapped by {@link Relationship.relatedObject | Relationship.relatedObject}.
     */
    public readonly related: {
        [key: number]: Relationship[]
    };

    /**
     * @private
     */
    constructor(
        data: Data,
        model: DataModel,
        id: string,
        originalSystemId: string,
        name: string,
        description: string | undefined,
        type: number,
        propertySets?: PropertySet[]) {

        this.data = data;
        this.models = [model];
        this.id = id;
        this.originalSystemId = originalSystemId;
        this.name = name;
        this.description = description;
        this.type = type;
        this.propertySets = propertySets || [];
        this.related = {};
        this.relating = {};
    }
}
