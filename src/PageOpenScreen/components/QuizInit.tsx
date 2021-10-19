/*

*/
import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { contextProvider, StateAPI } from '../../StateAPI';
import { generateQuiz } from '../../Utility/ColorBlueFile/QuizGenerator';

export default function QuizInit({setting, setsetting, setquestions} :any) {
    const { state } :StateAPI = React.useContext(contextProvider);
    const [isError, setError] = React.useState(false);

    function whichIcon(isTrue :boolean) {
        if( !isTrue )
            return <Icon name="checkbox-blank-outline" size={32} color="gray" />
        return <Icon name="checkbox-marked-outline" size={32} color="lightgreen" />
    }

    function handleStartQuiz() {
        const ignores :Array<string> = [];
        if(!setting.includeSteps)    ignores.push('order');
        if(!setting.includeBelongTo) ignores.push('unorder');
        const q = generateQuiz(
            state.shelf[state.selectedBook].files[state.selectedPage].content,
            ignores
        );
        if(q == undefined || q.length <= 0) {
            setError(true);
        }
        else {
            setquestions( q );
            setsetting({...setting, started: true});
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.items}
                onPress={() => setsetting({...setting, includeBelongTo: !setting.includeBelongTo})}>
                { whichIcon(setting.includeBelongTo) }
                <Text style={styles.itemText}>Includes "belong to" questions</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.items}
                onPress={() => setsetting({...setting, includeSteps: !setting.includeSteps})}>
                { whichIcon(setting.includeSteps) }
                <Text style={styles.itemText}>Includes "the number # in" questions</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.items}
                onPress={() => setsetting({...setting, onlyTen: !setting.onlyTen})}>
                { whichIcon(setting.onlyTen) }
                <Text style={styles.itemText}>Only 10 questions</Text>
            </TouchableOpacity>

            { isError &&
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Error occured during quiz generation.</Text>
                    <Text style={styles.errorText}>Make sure the content follows the proper format.</Text>
                </View>
            }

            <View style={styles.btnContainer}>
                <Button title='start quiz' onPress={handleStartQuiz} />
            </View>
        </View>
    );
}

import GlobalStyle from '../../Utility/GlobalStyles';
const styles = StyleSheet.create({
    container: {
        width: '85%',
        marginLeft: '7.5%',
        marginTop: 24,
    },
    items: {
        flexDirection: 'row',
        marginTop: 16,
    },
    itemText: {
        fontSize: GlobalStyle.fontsize,
        color: GlobalStyle.fontcolor,
        marginLeft: 16,
    },
    btnContainer: {
        marginTop: 42,
    },
    errorContainer: {
        marginTop: 16
    },
    errorText: {
        fontSize: GlobalStyle.fontsize,
        color: 'red',
    },
});
