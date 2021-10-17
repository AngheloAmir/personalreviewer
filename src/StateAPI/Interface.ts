/*
    This file is not accessed outside the StateAPI folder.
*/
export interface ActionInterface {
    type        :number;
    payload?    :any;
    index?      :number;
}

export enum actionType {
    doneLoading,
    setIsOnBooks,

    setListOfShelf,
    saveCurrentShelf,
    addShelfItem,
    renameShelf,
    deleteShelfItem,
    setSelectedShelfKey,

    setBooks,
    setSelectedBook,
    setSelectedPage,

    setCurrentPageContent,
    sortBooks,
    sortPages,
    addBook,
    addPage,
    deleteBook,
    deletePage,
    renameBook,
    renamePage,
    moveBookUp,
    moveBookDown,
    movePageUp,
    movePageDown,
}
