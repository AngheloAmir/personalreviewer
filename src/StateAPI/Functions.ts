/*
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

    createSample: () :Book => {
        return {
            name:       'Demo book',
            date:       getDate( Date.now() ),
            lastmod:    getDate( Date.now() ),
            files: [
                {
                    name:       'Sample page 1',
                    date:       getDate( Date.now() ),
                    lastmod:    getDate( Date.now() ),
                    content:    firstPageContent, 
                }
            ]
        }
    }
}
export default functions;

const firstPageContent =
`#First Keyword
description of the first keyword

#Second keyword
description of the second keyword

@An Unorderlist
*Item one
description of list one
*Item two
description of list two
@

&An Ordered List
*Step One 
Description of step one
*Step Two
Description of step two
&

!Red keyword

-
//Editing this is file is simple. To make a word hightighted, which know as the KEYWORD (in bold color), just add a number sign (#) in the start of a line. Then add new line to it to have its description. A keyword is a word you would normally remember when studying.

//Character @ marks the start of an UNORDERLIST and each item is start with STAR (*) to mark that it was a keyword inside an unorder list. Then proceed with a description of this item.
//Character & marks the start of an ORDERLIST and each item is start with STAR (*) to mark that it was a keyword inside an unorder list. Then proceed with a description of this item.

//This is syntax scheme is used in generating quiz automatically, and might requires proper syntax or it cant generate a quiz at all. 
//There are others syntax used but these are ignored during quiz generation.

#Exclamation point (!) 
Marks the line in bold red

#Double back-slash (//) 
Marks the line as a comment/
#Minus Sign(-)

Create a horizontal line, ignoring text from this line
#Dollar sign ($) followed by path
Load an image relative to the app path (works in web version)

Click "Edit" to see how things work or may start quiz! Have fun!'`;
