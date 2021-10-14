/*
    Work same as the DialogBox component but providing text field in as the content
*/
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import DialogBox from '../DialogBox';

interface propsReceive {
    show            :boolean;
    title           :string;
    display         :string;
    cancel          :() => void;
    ok              :(text :string) => void;
    initialText?    :string;
}

export default function TextfieldBox(props :propsReceive) {
    const inittext = props.initialText ? props.initialText : '';
    const [textvalue, settext] = React.useState(inittext);

    function handleOnOk() {
        if(!textvalue || textvalue.length < 1 ) return;
        const trimmedText = textvalue.trim();
        settext('');
        props.ok(trimmedText);
    }

    function handleCancel() {
        settext('');
        props.cancel();
    }

    return (
        <DialogBox
            title={props.title}
            isshow={props.show}
            ok={handleOnOk}
            cancel={handleCancel}
            dialogContent={ () => <DialogContent text={textvalue} settext={settext} dis={props.display} /> }
        />
    );
}

function DialogContent( props :{text :string; settext:(name :string) => void; dis :string} ) {
    return (
        <View>
            <Text style={styles.itemtext}>{props.dis}</Text>
            <TextInput
                value={props.text}
                onChangeText={ text => props.settext(text)}
                style={{
                    borderColor: 'white',
                    borderWidth: 1,
                    fontSize: 16,
                    padding: 8,
                    color: 'white',
                }}
            />
        </View>
    );
}

import GlobalStyle from '../GlobalStyles';
const styles = StyleSheet.create({
    itemtext: {
        fontSize:   GlobalStyle.fontsize,
        color:      GlobalStyle.fontcolor,
        marginLeft: 8,
        marginBottom: 16,
    }
});
