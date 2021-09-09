/*
    This file is not accessed outside the StateAPI folder.

    The list of actions that will be used by the dispatch function
*/
import { ActionInterface, actionType } from "./Interface";
import { StateInterface, AShelf, Book } from "./index";

const Action = {
    shelf: {
        setList: (newstate :Array<AShelf>) :ActionInterface => {
            return {
                type: actionType.setListOfShelf,
                payload: newstate
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
        }
    },

    /*=============================================================================*/
    books: {
        setBooks: (books :Array<Book>) :ActionInterface => {
            return {
                type: actionType.setBooks,
                payload: books
            }
        },

    },

    /*=============================================================================*/
    file: {

    },

    /*=============================================================================*/
    setting: {

    },
}
export default Action;
