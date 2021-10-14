/*
    Define the common interface in the BookScreen
*/

export interface ActionInterface {
    type        :number;
    payload?    :any;
    index?      :number;
}

export enum actionType {
    showDialogAdd,
    showDialogOption,
    showDialogRename,
    showDialogDelete,
    showDialogInfo,
}
