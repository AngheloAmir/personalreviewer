/*
    This file is not accessed outside the StateAPI folder except by the App.tsx
*/
import { StateInterface, Book} from "../index";
import { ActionInterface, actionType, } from "../Interface";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
            const selectedPage = state.shelf[state.selectedBook].files.length > 0 ?
                action.payload : -1;
            return {
                ...state,
                selectedPage: selectedPage
            }
        
        case actionType.setCurrentPageContent:
            const tempBook :Book = state.shelf[state.selectedBook];
            tempBook.files[state.selectedPage].content = action.payload;

            return {
                ...state,
                shelf: state.shelf.map((item, index) => {
                    if(index != state.selectedBook)
                        return item;
                    else return tempBook
                })
            }

        default:
            console.error('ACTION NOT DEFINED IN THE REDUCER');
            return state;
    }
}