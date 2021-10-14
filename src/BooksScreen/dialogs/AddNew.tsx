/*
    * TYPE
        Dialog Box - A Dialog Box is a component that over takes the current scene without replacing it.

    * DESCRIPTION
        

    * VISIBLE WHEN
        
*/
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import DialogBox from '../../Utility/DialogBox';
import { contextProvider, StateAPI, action } from '../../StateAPI';

interface propsReceive {
    show    :boolean;
    cancel  :() => void;
    ok      :() => void;
}

export default function AddNew(props :propsReceive) {
    const { dispatch } :StateAPI    = React.useContext(contextProvider);
    const [shelfname, setname]      = React.useState('');

    function handleOnOk() {
        if(!shelfname || shelfname.length < 1 ) return;
        const shelfn = shelfname.trim();
        dispatch( action.shelf.add({name: shelfn, key: '' + Date.now() }) );
        setname('');
        props.ok();
    }

    return (
        <DialogBox
            title='Add New Shelf'
            isshow={props.show}
            ok={handleOnOk}
            cancel={props.cancel}
            dialogContent={ () => <DialogContent shelfname={shelfname} setname={setname} /> }
        />
    );
}

interface dialogContentProps {
    shelfname   :string;
    setname     :(name :string) => void;
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

import GlobalStyle from '../../Utility/GlobalStyles';
const styles = StyleSheet.create({
    itemtext: {
        fontSize:   GlobalStyle.fontsize,
        color:      GlobalStyle.fontcolor,
        marginLeft: 8,
        marginBottom: 16,
    }
});
