/*
	Search.js contains a function named colorBlueFileSearch which accepts
		* the CB file (string )
		* search key (string )
		* excludes search in description (boolean)
	 
	This function will return the result of  the search as array of objects
	result will look like this:
	
	return [
		{ keyword: "Apple", description: "Apple is a keyword"},
		...
	];
	
	It is an array of object with atrribute of keyword and description of the matching text
	Take note that, it skips comments in the
*/

export default function colorBlueFileSearch( dataString :string, searchKey :string, onlyk :boolean) {
	const sentences = dataString.split("\n");
	let founditem = [];
	
	for(let y =0; y < sentences.length; y++) {
		if( sentences[y][0] === "/" && sentences[y][1] === "/" )
			continue; //which ignores searching in comment
			
		if( (new RegExp("\\b" + searchKey + "\\b", "i" )).test( sentences[y] ) ) {
			if( sentences[y][0] === "#" || sentences[y][0] === "*" )
				founditem.push( {
					keyword: sentences[y].substring(1, sentences[y].length),
					text: sentences[y+1] ? sentences[y+1]  : '??' 
				});
			else if ( !onlyk )
				founditem.push( {
					keyword: sentences[y-1] && ( sentences[y-1][0] === "#" || sentences[y-1][0] === "*")  ?
									sentences[y-1].substring(1, sentences[y-1].length)  : ' ' ,
					description: sentences[y] 
				});
		}//if reg ex..
	}//for ...
	
	return founditem;
}
