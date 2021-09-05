/*
    This file is not accessed outside the StateAPI folder.
*/
import getDate from '../Utility/getdate';
import { Book, File } from "./index";

const functions = {
    createBook: (name :string) :Book => {
        return {
            name:       name,
            date:       getDate( Date.now() ),
            lastmod:    getDate( Date.now() ),
            files:      [],
        }
    },

    createFile: (name :string) :File => {
        return {
            name:       name,
            date:       getDate( Date.now() ),
            lastmod:    getDate( Date.now() ),
            content:    '',
        }
    },

    changeBookName: (newname :string, book :Book) :Book => {
        return {
            ...book,
            name: newname, 
            lastmod: getDate( Date.now() ),
        }
    },

    removeBookFromShelf: (bookIndex :number, books :Array<Book>) :Array<Book> => {
        return books.filter((abook :Book, index :number) => index !== bookIndex)
    },

    removeFile: (fileIndex :number, book :Book) :Book => {
        return {
            ...book, files: book.files.filter((file :File, index :number) => fileIndex !== index)
        }
    }

}
export default functions;
