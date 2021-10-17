/*
     * TYPE
        Fragment of src/PageOpenScreen/Index - A fragment is a piece of component that is
            part of a scene

    * DESCRIPTION

    * VISIBLE WHEN
        A page is edit
*/
import React from 'react';
import { View, StyleSheet,
        Button, KeyboardAvoidingView,
        TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { contextProvider, StateAPI, action } from '../../StateAPI';

import InfoBox from '../../Utility/Dialogs/InfoBox';

interface propsReceive {
    setIsReading: (isreading :boolean) => void;
}

export default function PageReading(props :propsReceive) {
    const { state, dispatch } :StateAPI = React.useContext(contextProvider);
    const [ text, settext ]             = React.useState('-1');
    const [ showConfirm, setShow]       = React.useState(false);
    const textinputref                  = React.useRef<TextInput>(null);
    const navigation                    = useNavigation();

    let content = '';
    try {
        if( state.shelf[state.selectedBook].files[state.selectedPage].content != undefined )
            content = state.shelf[state.selectedBook].files[state.selectedPage].content;
    }
    catch(err) {
    }

    React.useEffect(() => {
        //The data is stored using ref to prevent re rendering. This will optimize the input field
        textinputref.current?.setNativeProps({ text: content });

        function captureBack(e :any) {
            e.preventDefault();
            setShow(true);
        }
        navigation.addListener('beforeRemove',captureBack);
        return () => 
            navigation.removeListener('beforeRemove', captureBack);
    }, []);

    async function handleOnSave() {
        //check if no editing is made
        if(text == '-1')
            props.setIsReading(true); 
        else {
            dispatch( action.books.setCurrentPageContent(text));
        //Save the current shelf into the async storage. it requires to be timeout
            setTimeout(() => dispatch(action.shelf.saveCurrentShelf()), 100);
            props.setIsReading(true);
        }
    }

    return (
        <View>
            <KeyboardAvoidingView style={styles.container}>
                <TextInput
                    style={styles.textinput}
                    ref={textinputref}
                    multiline={true}
                    autoFocus={true}
                    blurOnSubmit={false}
                    scrollEnabled={true}
                    keyboardType={'default'}
                    returnKeyType={'default'}
                    onChangeText={ text =>  {
                        textinputref.current?.setNativeProps({ text });
                        settext(text);
                    }}
                    onBlur={() => textinputref.current?.focus()}
                />
                <View style={styles.button}>
                    <View style={{width: '80%'}}>
                        <Button title='save' onPress={handleOnSave} />
                    </View>
                </View>
            </KeyboardAvoidingView>
            <InfoBox
                isshow={showConfirm}
                title='Discard changes'
                text='Close editing and discard changes?'
                ok={() => props.setIsReading(true)}
                cancel={() => setShow(false)}
             />   
        </View>
    );
}

import { WindowDimension } from '../../Utility/useResponsive';
import GlobalStyle from '../../Utility/GlobalStyles';
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        maxHeight: WindowDimension.height - 36,
        paddingTop: 60,
        paddingBottom: 16,
    },
    textinput: {
        fontSize:   GlobalStyle.fontsize,
        color:      'lightgray',
        lineHeight: GlobalStyle.lineheight,
        width: '94%',
        marginLeft: '3%',
        paddingHorizontal: '2%',
        borderWidth: 1,
        borderColor: '#555',
    },
    button: {
        width: '80%',
        position: 'absolute',
        left: '10%',
        top: 16,
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
});
