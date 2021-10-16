/*  
	Quiz.js contains a function that generate a quiz from the file.
	it accepts:
		** file :string
			the actual CBF verson 1.1
		** (optional) ignores :array of string
			Question type to be ignored 
			list of values that is currently acceptable:
				["order"] 					- which ignores question with #num: .....
				["unorder"] or			- which ignores question with Belongs to: .....
				["order", "unorder"]   - which ignores both
				undefined				 - nothing to ignores
	
	It will return an array of objects that contains the
		* Question (string )
		* Choices ( array of string )
		* Correct answer (string )
		
	and the question count will be based on the number possible question
	withing the file.The question is simple set of test with choices

	*NO question will be generated from:
		*comments
		*text inside a monospace
		*red text (red keyword)
		*ordinaty paragraph
	
	return an arrays of obejcts that looks like this:
		[
			{
				question: "what is the result of 5 + 5 ?",
				choices: ["5", "8", "10", "15"],
				answer: "10"
			},
			.....
		]
*/

import { getListOfQuestions } from './QuizGenerator/getListOfQuestions';
import { generateQuestion } from './QuizGenerator/generateQuestion';

export interface QuizItem {
	question	:string;
	choices		:Array<string>;
	answer		:string;
}

export function generateQuiz( file :string, ignores :Array<string> | undefined) :Array<QuizItem> {
	try {
		//firstly, find only important words in the file with there describtion
		//then returned a sets of question 
		const keywords = getListOfQuestions( file );
		
		//return a question and now includes the choices in random
		return generateQuestion( keywords, ignores );
	} 
	catch( err ) {
		return [
			{ question: "Error in generating question", choices: ["?", "?", "?", "?"], answer: "?" }
		];
	}
}
