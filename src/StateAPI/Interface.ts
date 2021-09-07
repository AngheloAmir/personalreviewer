/*
    This file is not accessed outside the StateAPI folder.
*/
export interface ActionInterface {
    type        :number;
    payload?    :any;
    index?      :number;
}

export enum actionType {
    setListOfShelf,
    addShelfItem,
    deleteShelfItem,
}
