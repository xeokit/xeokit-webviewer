import type {PropertySet} from "./PropertySet";
import type {DataModel} from "./DataModel";
import type {Relationship} from "./Relationship";
import type {Data} from "./Data";

/**
 * An object within a {@link data!DataModel | DataModel}.
 *
 * * Created with {@link data!DataModel.createObject | DataModel.createObject}
 * * Stored in {@link data!Data.objects | Data.objects}, {@link data!Data.rootObjects | Data.rootObjects}, {@link data!Data.objectsByType | Data.objectsByType}, {@link data!DataModel.objects | Data.objects}, {@link data!DataModel.rootObjects | Data.rootObjects}
 *
 * See {@link "@xeokit/data" | @xeokit/data}  for usage.
 */
export class DataObject {

    /**
     *  {@link data!Data | Data} that contains this DataObject.
     */
    public data: Data;

    /**
     * {@link data!DataModel | DataModels} that share this DataObject.
     */
    public models: DataModel[];

    /**
     * Globally-unique ID.
     *
     * DataObjects are stored by ID in {@link data!Data.objects | Data.objects}, {@link data!Data.rootObjects | Data.rootObjects}, {@link data!Data.objectsByType | Data.objectsByType} and {@link data!DataModel.rootObjects | Data.rootObjects}.
     */
    public readonly id: string;

    /**
     * ID of this DataObject within the originating system, is any. Defaults to the value of
     * {@link data!DataObject.id | DataObject.id}.
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
     *{@link data!PropertySet | PropertySets} referenced by this DataObject.
     */
    public readonly propertySets?: PropertySet[];

    /**
     * The {@link data!Relationship | Relations} in which this DataObject is the {@link data!Relationship.relatingObject | Relationship.relatingObject} participant.
     *
     * Each DataObject is mapped here by {@link data!Relationship.type | Relationship.type} and sub-mapped by {@link data!Relationship.relatingObject | Relationship.relatingObject}.
     */
    public readonly relating: {
        [key: number]: Relationship[]
    };

    /**
     * The {@link data!Relationship | Relationships} in which this DataObject is the {@link data!Relationship.relatedObject | Relationship.relatedObject} participant.
     *
     * Each DataObject is mapped here by {@link data!Relationship.type | Relationship.type} and sub-mapped by {@link data!Relationship.relatedObject | Relationship.relatedObject}.
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
