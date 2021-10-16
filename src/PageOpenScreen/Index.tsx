/*
     * TYPE
        Scene - A scene (screen) is a component that occupies a large part of the screen
        Index - A parent component that does not display itself
        Fragment of src/BookScreen/index - A fragment is a piece of component that is
            part of a scene

    * DESCRIPTION
        The index file that display the page content or the page edit scene.
        This component is still part of BooksScreen, it was seperated because it will have its own
        components and functionality that not available in BookScreen folder.

    * VISIBLE WHEN
        A page is open
*/
import React from 'react';
import { View } from 'react-native';

import PageReading from './components/PageReading';
import PageEditing from './components/PageEditing';
import QuizInit from './components/QuizInit';
import QuizStart from './components/QuizStart';

export default function PageReadScreenContainer() {
    const [isReading, setIsReading] = React.useState(true);
    const [isQuiz, setIsQuiz]       = React.useState(false);
    const [setting, setsetting]     = React.useState({
        includeBelongTo: true,
        includeSteps:    false,
        onlyTen:         false,
        started:         false,
    });
    const [questions, setquestions] = React.useState<any>();

    function whichScreen() {
        if(isQuiz) {
            if( !setting.started )
                return <QuizInit setting={setting} setsetting={setsetting} setquestions={setquestions}/>
            else
                return <QuizStart questions={questions} setting={setting} />
        }
        else if(isReading)
            return <PageReading setIsReading={setIsReading} setIsQuiz={setIsQuiz} />;
        else
            return <PageEditing setIsReading={setIsReading} />;
    }

    return (
        <View>   
            { 
                whichScreen()
            }
        </View>
    );
}
