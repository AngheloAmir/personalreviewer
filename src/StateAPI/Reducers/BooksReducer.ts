/*
    This file is not accessed outside the StateAPI folder except by the App.tsx
*/
import { StateInterface, Book, File } from "../index";
import { ActionInterface, actionType, } from "../Interface";
import { getDateCurrentPHTime } from "../../Utility/Functions/getdate";
import functions from "../Functions";

export default function BooksReducer(state :StateInterface, action :ActionInterface) :StateInterface {
    switch(action.type) {
        case actionType.setBooks:
            return {
                ...state,
                shelf: action.payload
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
            tempBook.files[state.selectedPage].lastmod = getDateCurrentPHTime();

            return {
                ...state,
                shelf: state.shelf.map((item, index) => {
                    if(index != state.selectedBook)
                        return item;
                    else return tempBook
                })
            }
        
        case actionType.sortBooks:
            return {
                ...state, shelf: state.shelf.sort((a :Book, b: Book) => a.name.localeCompare(b.name))
            }

        case actionType.sortPages:
            const temp  = state.shelf[state.selectedBook];
            temp.files = temp.files.sort((a :File, b :File) => a.name.localeCompare(b.name) );
            return {
                ...state,
                shelf: state.shelf.map((item :Book, index: number) => {
                    if(index != state.selectedBook) return item;
                    return temp;
                })
            }

        case actionType.addBook:
            return {
                ...state,
                shelf: [...state.shelf, functions.createBook(action.payload) ]
            }
  
        case actionType.addPage:
            return {
                ...state,
                shelf: state.shelf.map((item :Book, index: number) => {
                    if(index != state.selectedBook) return item;
                    return {
                        ...item,
                        files: [ ...item.files, functions.createFile(action.payload) ]
                    };
                })
            }
        
        case actionType.deleteBook:
            return {
                ...state,
                shelf: state.shelf.filter((value :any, index :number) => index != action.index)
            }

        case actionType.deletePage:
            return {
                ...state,
                shelf: state.shelf.map((item :Book, index :number) => {
                    if(index != state.selectedBook) return item;
                    return {
                        ...item,
                        files: item.files.filter((value :any, i :number) => i != action.index)
                    }
                })
            }

        case actionType.renameBook:
            return {
                ...state,
                shelf: state.shelf.map((item :Book, index :number) => {
                    if(index != action.index) return item;
                    return {
                        ...item,
                        name: action.payload,
                        lastmod: getDateCurrentPHTime()
                    }
                })
            }

        case actionType.renamePage:
            return {
                ...state,
                shelf: state.shelf.map((item :Book, index :number) => {
                    if(index != state.selectedBook) return item;
                    return {
                        ...item,
                        files: item.files.map((file :File, i :number) => {
                            if(i != action.index) return file;
                            return {
                                ...file,
                                name: action.payload,
                                lastmod: getDateCurrentPHTime()
                            }
                        })
                    }
                })
            }
            
        default:
            console.error('ACTION NOT DEFINED IN THE BOOKS REDUCER');
            return state;
    }
}
