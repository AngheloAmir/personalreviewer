/*
    This file is not accessed outside the StateAPI folder except by the App.tsx
*/
import { StateInterface } from "./index";
import { ActionInterface, actionType } from "./Interface";

import ShelfReducer from './Reducers/ShelfReducer';
import BooksReducer from './Reducers/BooksReducer';

export default function RootReducer(state :StateInterface, action :ActionInterface) :StateInterface {
    switch(action.type) {
        case actionType.setListOfShelf:
        case actionType.addShelfItem:
        case actionType.renameShelf:
        case actionType.deleteShelfItem:
            return ShelfReducer(state, action);
        
        case actionType.setBooks:
            return BooksReducer(state, action);

        default:
            console.error('ACTION NOT DEFINED IN THE REDUCER');
            return state;
    }
}
