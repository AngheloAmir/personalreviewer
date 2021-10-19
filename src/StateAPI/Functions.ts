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
`//Sample test file

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

-

!Red keyword

#Exclamation point (!) 
Marks the line in bold red

#Double back-slash (//) 
Marks the line as a comment

#Minus Sign(-)
Creates an horizontal line
`;
