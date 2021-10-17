/*
*/
import { getDateCurrentPHTime } from '../Utility/Functions/getdate';
import { Book, File } from "./index";

const functions = {
    createBook: (name :string) :Book => {
        return {
            name:       name,
            date:       getDateCurrentPHTime(),
            lastmod:    getDateCurrentPHTime(),
            files:      [],
        }
    },

    createFile: (name :string) :File => {
        return {
            name:       name,
            date:       getDateCurrentPHTime(),
            lastmod:    getDateCurrentPHTime(),
            content:    '',
        }
    },

    createSample: () :Book => {
        return {
            name:       'Demo book',
            date:       getDateCurrentPHTime(),
            lastmod:    getDateCurrentPHTime(),
            files: [
                {
                    name:       'Sample page 1',
                    date:       getDateCurrentPHTime(),
                    lastmod:    getDateCurrentPHTime(),
                    content:    firstPageContent, 
                }
            ]
        }
    }
}
export default functions;

const firstPageContent =
`
//Welcome!

//Editing this is file is simple. To make a word hightighted, which know as the KEYWORD (in bold color), just add a number sign (#) in the start of a line. Then add new line to it to have its description. A keyword is a word you would normally remember when studying.

//Character @ marks the start of an UNORDERLIST and each item is start with STAR (*) to mark that it was a keyword inside an unorder list. Then proceed with a description of this item.
//Character & marks the start of an ORDERLIST and each item is start with STAR (*) to mark that it was a keyword inside an unorder list. Then proceed with a description of this item.

//This is syntax scheme is used in generating quiz automatically, and requires proper syntax.
//There are others syntax used but these are ignored during quiz generation.

//Click "Edit" to see how things work or may start "Quiz"! Have fun!

#First Keyword
Description of the first keyword

#Second keyword
Description of the second keyword

@An Unorderlist
*Item one
This line is the description of item one
*Item two
This line is the description of item two
@

&An Ordered List
*Step One 
Description of the num 1 in an ordered list
*Step Two
Description of the num 2 in an ordered list
&

!Red keyword

-

#Exclamation point (!) 
Marks the line in bold red

#Double back-slash (//) 
Marks the line as a comment

#Minus Sign(-)
Creates an horizontal line
`;
