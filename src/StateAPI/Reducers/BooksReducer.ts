/*
    This file is not accessed outside the StateAPI folder except by the App.tsx
*/
import { StateInterface } from "../index";
import { ActionInterface, actionType } from "../Interface";

export default function BooksReducer(state :StateInterface, action :ActionInterface) :StateInterface {
    switch(action.type) {
        case actionType.setBooks:
            return {
                ...state,
                shelf: action.payload
            }
        
        case actionType.setIsOnBooks:
            return {
                ...state,
                isOnBooks: action.payload
            }
            
        case actionType.setSelectedBook:
            return {
                ...state,
                selectedBook: action.payload
            }
        
        case actionType.setSelectedPage:
            return {
                ...state,
                selectedPage: action.payload
            }

        default:
            console.error('ACTION NOT DEFINED IN THE REDUCER');
            return state;
    }
}
