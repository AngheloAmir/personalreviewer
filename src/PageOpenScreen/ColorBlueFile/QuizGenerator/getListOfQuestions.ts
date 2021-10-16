/*Used by Quiz.js
	return the question found in the file

	return object look like this:
	{
		uidcount: 8,
		questions: [
			{ keyword: "string", description: "string" , type: "order", uidcount: 0, id: 0 }
			...
		]
	}
	
	uidcount :number
		means unique id count .used in counting number of keywords that are unique.
		It uses is from generating choices for "belong to: ..."
		which determine the number of choice it can make.
	
	type :string
		tells the type of the question.
		* order - a question generated from order list
		* unorder - a question generated from unorder list
		This attribute is used to determine if this question will be skipped (as the user wants)
		
	id :number
		If this has a value, the question is "Belongs to: ...".
		This is used in determining the right choices for the question
		so making sure that choices in the question is unique to their
		groups
*/

export interface QuestionItem {
	uidcount	:number;
	questions	:Array<{
		keyword			:string;
		description		:string;
		type?			:'order' | 'unorder';
		uidcount?		:number;
	 	id?				:number;
	} | any>;
}

export function getListOfQuestions( file :string) :QuestionItem {
	const sentence = file.split("\n");
	
	//set up the numbers of items (question) found in the page
	let found = [];
	let isInEnum = false; //tells if @  (an enumeration ) is encounter or not
	let enumCount = 1;
	let enumQuestion = "";
	let isInList = false; //tell if its time to generate a list
	let listID = 0; //tells the list id, for generating a question like:  Belongs to <...>
	let listQuestion = "";
	let keywordCounter = 0; //used in determining count of question (see the bottom of the function)
	
	//look up for available questions
	for( let i =0; i < sentence.length ; i++) {
		const word = sentence[i];
		
		//check if enumeration is already been encountered=======================
		if( isInEnum ) {
			//check if we are done to enumerating available items in a enumeration
			if( word[0] === "&" ) {
				isInEnum = false;
				continue;
			}
			//an item is been found
			if( word[0] === "*" ) {
				//push it as an item in enum
				const theQuestion = getEnumQuestion(enumQuestion, enumCount );
				found.push( { keyword: word.substring(1, word.length ), description: theQuestion, type: "order" } );
				enumCount++;
				keywordCounter++;
				const temp = sentence[i +1];
				if( temp[0] !== '*' && temp[0] !== '#' && temp[0] !== '&' && temp[0] !== '$' && temp[0] !== '/' && temp[0] !== '-' && temp[0] !== '>') {
					found.push( { keyword: word.substring(1, word.length ), description: temp } );
					keywordCounter++;
				}
			}
			continue; //to lessen the nested else if statement instead of another else statement
		}
		
		//check if an enumeration is been encounter============================
		else if( word[0] === "&" ) {
			isInEnum = true;
			enumCount = 1;
			enumQuestion = word.substring(1, word.length );
		}
		
		//check if the generating a list=======================================
		else if( isInList ) {
			//check if we are done listing available items that can be found
			if( word[0] === "@" ) {
				isInList = false;
				continue;
			}
			//an item is been found
			if( word[0] === "*" ) {
				//push it as an item in enum
				found.push( { keyword: word.substring(1, word.length ), description: listQuestion, type: "unorder", id: listID } );
				const temp = sentence[i +1];
				if( temp[0] !== '*' && temp[0] !== '#' && temp[0] !== '&' && temp[0] !== '$' && temp[0] !== '/' && temp[0] !== '-' && temp[0] !== '>')
					found.push( { keyword: word.substring(1, word.length ), description: temp , id: listID}  );
			}
			continue;
		}
		
		//check if it is start to generate a list==================================
		else if( word[0] === "@"  ) {
			listQuestion = "Belongs to: " + word.substring(1, word.length );
			isInList = true;
			listID++;
		}
		
		//otherwise a keyword is found, get the keyword and its description==========
		//if the sentence starts with * or # it means it is a keyword to remember (by a user)
		//if so, get the next sentence but make sure that it is not another keyword
		else {
			if( word[0] === '#' || word[0] === '*' ) {
				const temp = sentence[i +1];
				if( temp[0] !== '*' && temp[0] !== '#' && temp[0] !== '&' && temp[0] !== '$' && temp[0] !== '/' && temp[0] !== '-'  && temp[0] !== '>') {
					found.push( { keyword: word.substring(1, word.length ), description: temp } );
					keywordCounter++;
				}//if
			}//if
		}//else
	}//for
	
	//everything should be ok, return all found available keyword (the answer) with their description (the question)
	return {
		uidcount: keywordCounter, questions: found
	};
}

function getEnumQuestion( q :string, count :number  ) {
	return "The number " + count + " in: " + q + "?";
}
