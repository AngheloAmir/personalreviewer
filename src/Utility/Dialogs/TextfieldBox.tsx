/*
    * TYPE
        Dialog Box - A Dialog Box is a component that over takes the current scene without replacing it.

    * DESCRIPTION
        Show the add new shelf dialog box to user using DialogBox from utilities

    * VISIBLE WHEN
        The user pressed add shelf button in the screen
*/
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import DialogBox from '../DialogBox';

interface propsReceive {
    show    :boolean;
    cancel  :() => void;
    ok      :() => void;
}

interface dialogContentProps {
    shelfname   :string;
    setname     :(name :string) => void;
}

export default function TextfieldBox(props :propsReceive) {
    const [shelfname, setname] = React.useState('');

    function handleOnOk() {
        if(!shelfname || shelfname.length < 1 ) return;
        const shelfn = shelfname.trim();
        //dispatch( action.shelf.add({name: shelfn, key: '' + Date.now() }) );
        setname('');
        props.ok();
    }

    function handleCancel() {
        setname('');
        props.cancel();
    }

    return (
        <DialogBox
            title='Add New Shelf'
            isshow={props.show}
            ok={handleOnOk}
            cancel={handleCancel}
            dialogContent={ () => <DialogContent shelfname={shelfname} setname={setname} /> }
        />
    );
}

function DialogContent( props :dialogContentProps ) {
    return (
        <View>
            <Text style={styles.itemtext}>Please enter new shelf name: </Text>
            <TextInput
                value={props.shelfname}
                onChangeText={ text => props.setname(text)}
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

import GlobalStyle from '../GloabalStyles';
const styles = StyleSheet.create({
    itemtext: {
        fontSize:   GlobalStyle.fontsize,
        color:      GlobalStyle.fontcolor,
        marginLeft: 8,
        marginBottom: 16,
    }
});
