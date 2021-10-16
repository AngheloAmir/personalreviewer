/*
     * TYPE
        Fragment of src/PageOpenScreen/Index - A fragment is a piece of component that is
            part of a scene

    * DESCRIPTION

    * VISIBLE WHEN
        A page is open
*/
import React from 'react';
import { ScrollView, StyleSheet, View, Button} from 'react-native';

import { contextProvider, StateAPI } from '../../StateAPI';
import ParseRender from '../ColorBlueFile/ParserRender';

interface propsReceive {
    setIsReading: (isreading :boolean) => void;
    setIsQuiz:    (isquiz :boolean) => void;
}

export default function PageReading(props :propsReceive) {
    const { state } :StateAPI = React.useContext(contextProvider);
    
    let content = 'empty';
    try {
        if( state.shelf[state.selectedBook].files[state.selectedPage].content != undefined )
            content = state.shelf[state.selectedBook].files[state.selectedPage].content;
    }
    catch(err) {
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scroll}>
                <View style={styles.content}>
                    <ParseRender data={content} />
                </View>
            </ScrollView>
            <View style={styles.button}>
                <View style={{width: '40%'}}>
                    <Button title='edit' onPress={() => props.setIsReading(false)} />
                </View>
                <View style={{width: '40%'}}>
                    <Button title='start quiz' onPress={() => props.setIsQuiz(true)} />
                </View>
            </View>
        </View>
    );
}

import { WindowDimension } from '../../Utility/useResponsive';
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
    scroll: {
        height: WindowDimension.height - 90,
    },
    content: {
        width: '92%',
        marginLeft: '4%',
        paddingBottom: 24,
        paddingTop: 8,
    },
    button: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
});
