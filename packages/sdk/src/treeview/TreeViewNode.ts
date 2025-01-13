/**
 * A node in a TreeView.
 *
 * See {@link treeview | @xeokit/sdk/treeview} for usage.
 */
export interface TreeViewNode {
    nodeId: string;
    objectId: string;
    title: string;
    type: number;
    parentNode: TreeViewNode | null;
    numViewObjects: number;
    numVisibleViewObjects: number;
    checked: boolean;
    xrayed: boolean;
    childNodes: TreeViewNode[];
}
