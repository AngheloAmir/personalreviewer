/*
    This file is not accessed outside the StateAPI folder.

    The list of actions that will be used by the dispatch function
*/
import { ActionInterface, actionType } from "./Interface";
import { AShelf, Book } from "./index";

const Action = {
    shelf: {
        setList: (newstate :Array<AShelf>) :ActionInterface => {
            return {
                type: actionType.setListOfShelf,
                payload: newstate
            }
        },

        saveCurrentShelf: () :ActionInterface => {
            return {
                type: actionType.saveCurrentShelf,
            }
        },

        add: (shelfname :AShelf) :ActionInterface => {
            return {
                type: actionType.addShelfItem,
                payload: shelfname
            }
        },

        rename: (shelfname :string, index :number) :ActionInterface => {
            return {
                type: actionType.renameShelf,
                payload: shelfname,
                index: index
            }
        },

        delete: (index :number) :ActionInterface => {
            return {
                type: actionType.deleteShelfItem,
                index: index,
            }
        },

        setSelectedShelfKey: (key :string) :ActionInterface => {
            return {
                type: actionType.setSelectedShelfKey,
                payload: key
            }
        },
    },

    books: {
        setBooks: (books :Array<Book>) :ActionInterface => {
            return {
                type: actionType.setBooks,
                payload: books
            }
        },

        setIsOnBooks: (isOnBooks :boolean) :ActionInterface => {
            return {
                type: actionType.setIsOnBooks,
                payload: isOnBooks
            }
        },

        setSelectedBook: (bookindex :number) :ActionInterface => {
            return {
                type: actionType.setSelectedBook,
                payload: bookindex
            }
        },
        
        setSelectedPage: (pageIndex :number) :ActionInterface => {
            return {
                type: actionType.setSelectedPage,
                payload: pageIndex
            }
        },

        setCurrentPageContent: (text :string) :ActionInterface => {
            return {
                type: actionType.setCurrentPageContent,
                payload: text
            }
        },

    },
}
export default Action;
