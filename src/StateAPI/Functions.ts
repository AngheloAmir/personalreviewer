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
    }
}
export default functions;
