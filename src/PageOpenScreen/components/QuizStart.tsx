/*

*/
import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';

interface propsReceive {
    questions   :Array<QuizItem>;
    setting     :Setting;
}

interface Setting {
    includeBelongTo: boolean,
    includeSteps:    boolean,
    onlyTen:         boolean,
    started:         boolean,
}

interface QuizItem {
	question	:string;
	choices		:Array<string>;
	answer		:string;
}

export default function QuizStart(props :propsReceive) {
    const [count, setcount] = React.useState(0);
    const [correct, setCorrect] = React.useState(0);

    let maxquestion;
    if(props.setting.onlyTen && props.questions.length < 10)
        maxquestion = props.questions.length;
    else if(props.setting.onlyTen && props.questions.length >= 10)
        maxquestion = 10;
    else 
        maxquestion = props.questions.length;

    function makeAnswer(choice :number) {
        if(props.questions[count].answer == props.questions[count].choices[choice] )
            setCorrect( correct + 1);
        setcount( count + 1);
    }

    return (
        <View>
        {
            count < maxquestion ?
            <View style={styles.container}>
                <View>
                    <Text style={styles.text}>Question {count + 1} of {maxquestion}</Text>
                    <Text style={styles.text}>{'\t'}{props.questions[count].question}</Text>
                </View>
                <View>
                    <View style={styles.choicesContainer}>
                        <TouchableOpacity style={styles.choiceItem} onPress={() => makeAnswer(0)}>
                            <Text style={styles.text}>{props.questions[count].choices[0]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.choiceItem} onPress={() => makeAnswer(1)}>
                            <Text style={styles.text}>{props.questions[count].choices[1]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.choiceItem} onPress={() => makeAnswer(2)}>
                            <Text style={styles.text}>{props.questions[count].choices[2]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.choiceItem} onPress={() => makeAnswer(3)}>
                            <Text style={styles.text}>{props.questions[count].choices[3]}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            :
            <View style={styles.container}>
                <Text style={styles.text}>Finnish!</Text>
                <View style={{marginTop: 16}}>
                    <Text style={styles.text}>You got {correct} out of {maxquestion}</Text>
                    <Text style={styles.text}>{Math.round((correct/maxquestion)*100)}% Correct</Text>
                </View>
                <View style={{marginTop: 64}}>
                    <Button title='try again' onPress={() => { setcount(0); setCorrect(0); }} />
                </View>
            </View>
        }   
        </View>
    );
};

import GlobalStyle from '../../Utility/GlobalStyles';
const styles = StyleSheet.create({
    container: {
        width: '85%',
        marginLeft: '7.5%',
        marginTop: 32,
    },
    text: {
        fontSize: GlobalStyle.fontsize,
        color: GlobalStyle.fontcolor,
    },
    choicesContainer: {
        marginTop: 32,
    },
    choiceItem: {
        borderWidth: 1,
        borderColor: 'lightblue',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 8,
        marginTop: 24,
    },
    cancelContainer: {
        marginTop: 32,
    }

})