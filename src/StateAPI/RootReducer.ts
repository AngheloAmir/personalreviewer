/*
    This file is not accessed outside the StateAPI folder except by the App.tsx
*/
import { StateInterface } from "./index";
import { ActionInterface, actionType } from "./Interface";

import AppReducer   from './Reducers/AppReducer';
import ShelfReducer from './Reducers/ShelfReducer';
import BooksReducer from './Reducers/BooksReducer';

export default function RootReducer(state :StateInterface, action :ActionInterface) :StateInterface {
    try {
        switch(action.type) {
            case actionType.doneLoading:
            case actionType.setIsOnBooks:
                return AppReducer(state, action);

            case actionType.setListOfShelf:
            case actionType.saveCurrentShelf:
            case actionType.addShelfItem:
            case actionType.renameShelf:
            case actionType.deleteShelfItem:
            case actionType.setSelectedShelfKey:
                return ShelfReducer(state, action);
            
            case actionType.setBooks:
            case actionType.setSelectedBook:
            case actionType.setSelectedPage:
            case actionType.setCurrentPageContent:
            case actionType.sortBooks:
            case actionType.sortPages:
            case actionType.addBook:
            case actionType.addPage:
            case actionType.deleteBook:
            case actionType.deletePage:
            case actionType.renameBook:
            case actionType.renamePage:
            case actionType.moveBookUp:
            case actionType.moveBookDown:
            case actionType.movePageUp:
            case actionType.movePageDown:
                return BooksReducer(state, action);

            default:
                console.error('ACTION NOT DEFINED IN THE ROOT REDUCER');
                return state;
        }
    }
    catch(err) {
        console.error('An error occurred during the reducer operation');
        return state;
    }
}
