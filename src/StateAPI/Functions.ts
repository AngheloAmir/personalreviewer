/*
    This file is not accessed outside the StateAPI folder.
*/
import getDate from '../Utility/Functions/getdate';
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

    createSample: () :Array<Book> => {
        return [
            {
                name:       'Demo book',
                date:       getDate( Date.now() ),
                lastmod:    getDate( Date.now() ),
                files: [
                    {
                        name:       'Sample page 1',
                        date:       getDate( Date.now() ),
                        lastmod:    getDate( Date.now() ),
                        content:    'This is a sample page', 
                    }
                ]
            }
        ]
    }
}
export default functions;
