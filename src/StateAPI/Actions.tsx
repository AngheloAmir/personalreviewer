/*
    This file is not accessed outside the StateAPI folder.

    The list of actions that will be used by the dispatch function
*/
import { ActionInterface, actionType } from "./Interface";
import { StateInterface, AShelf } from "./index";

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

        delete: (shelfname :string) :ActionInterface => {
            return {
                type: actionType.deleteShelfItem,
                payload: shelfname
            }
        }
    },

    books: {

    },

    file: {

    },

    setting: {

    },
}
export default Action;
