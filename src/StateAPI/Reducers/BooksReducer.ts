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
        
            case actionType.moveBookUp:
                const bkindex = action.index;
                if(bkindex == undefined || bkindex == 0) return state;
                const a = state.shelf.map((item :Book, index: number) => {
                    if(index == (bkindex - 1))
                        return state.shelf[bkindex];
                    if(index == bkindex)
                        return state.shelf[bkindex -1];
                    return item;
                });
                return {
                    ...state,
                    shelf: [...a]
                }

            case actionType.moveBookDown:
                const bkindex1 = action.index;
                if(bkindex1 == undefined || bkindex1 == (state.shelf.length - 1)) return state;
                const b = state.shelf.map((item :Book, index: number) => {
                    if(index == (bkindex1 + 1))
                        return state.shelf[bkindex1];
                    if(index == bkindex1)
                        return state.shelf[bkindex1 + 1];
                    return item;
                });
                return {
                    ...state,
                    shelf: [...b]
                }

            case actionType.movePageUp:
                const pindex = action.index;
                if(pindex == undefined || pindex == 0) return state;
                const files1 = state.shelf[state.selectedBook].files.map((item :File, index :number) => {
                    if(index == (pindex - 1))
                        return state.shelf[state.selectedBook].files[pindex];
                    if(index == pindex)
                        return state.shelf[state.selectedBook].files[pindex -1];
                    return item;
                });
              return {
                  ...state,
                  shelf: state.shelf.map((item :Book, index :number) => {
                      if(index != state.selectedBook) return item;
                      return {
                          ...item, files: [...files1]
                      }
                  })
              }

            case actionType.movePageDown:
                const pindex1 = action.index;
                if(pindex1 == undefined || pindex1 == state.shelf[state.selectedBook].files.length - 1) return state;
                const files2 = state.shelf[state.selectedBook].files.map((item :File, index :number) => {
                    if(index == (pindex1 + 1))
                        return state.shelf[state.selectedBook].files[pindex1];
                    if(index == pindex1)
                        return state.shelf[state.selectedBook].files[pindex1 + 1];
                    return item;
                });
              return {
                  ...state,
                  shelf: state.shelf.map((item :Book, index :number) => {
                      if(index != state.selectedBook) return item;
                      return {
                          ...item, files: [...files2]
                      }
                  })
              }
            
        default:
            console.error('ACTION NOT DEFINED IN THE BOOKS REDUCER');
            return state;
    }
}
