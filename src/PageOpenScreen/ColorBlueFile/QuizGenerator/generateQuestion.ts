//Returned a list of randomize question  with choices
import { QuestionItem } from './getListOfQuestions';

export function generateQuestion( listofquestion :QuestionItem, ignores :Array<string> | undefined) {
	let available = [ ...listofquestion.questions ];
	let questions = [];
	let choicesCount = listofquestion.uidcount >= 4 ? 4 : listofquestion.uidcount;
	let trys = 999; //ensure that, infinite loop wont occur
	
	try {
		while ( available.length > 0 && trys-- > 0 ) {
			const randnum = parseInt('' + (Math.random() * 1000000), 10) % available.length;
			
			if( available[0] === undefined ) break;
			if( available[randnum] === undefined ) continue;
			
			let isIgnoreThisQuestion = false;
			if( available[randnum].type !== undefined && ignores !== undefined && ignores.length > 0) {
				for(let i =0; i < ignores.length; i++) {
					if( ignores[i] === available[randnum].type)
						isIgnoreThisQuestion = true;
				}
				if( isIgnoreThisQuestion ) {
					available = available.filter( (value,  index) => index !== randnum );
					continue;
				}
			}
			
			const question  = available[randnum].description;
			const answer	= available[randnum].keyword;
			const crrans	 = parseInt('' + (Math.random() * 1000000), 10) % choicesCount;
			let added    	   = 0;
			let choices		= [];
			
			//generate choices
			while( added < choicesCount ) {
				const rkey 	  = parseInt('' + (Math.random() * 1000000), 10) % listofquestion.questions.length;
				const rchoice = listofquestion.questions[rkey].keyword;
				if( rchoice === answer && added !== crrans )
					continue; 
				else if( added === crrans )
					choices.push( answer );
				else if( choices[0] === rchoice || choices[1] === rchoice || choices[2] === rchoice || choices[3] === rchoice )
					continue;
				else
					choices.push( rchoice );
				added++;
			}//end of while
			
			questions.push ({
				question, choices, answer, type: available[randnum].type
			});
			available = available.filter( (value,  index) => index !== randnum );
		}//end of while
	}
	catch( err ) {
	}
	return questions;
}
