/*
    * TYPE
        Dialog Box - A Dialog Box is a component that over takes the current scene without replacing it.

    * DESCRIPTION
        Show the rename shelf dialog box to user using DialogBox from utilities

    * VISIBLE WHEN
        The user pressed the three dot (option) and choose the "rename shelf" in the dialog that appear
*/
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import DialogBox from '../../Utility/DialogBox';
import { contextProvider, StateAPI, action } from '../../StateAPI';

interface propsReceive {
    itemname    :string;
    index       :number;
    onclose     :() => void;
}

export default function RenameItem(props :propsReceive) {
    const { dispatch } :StateAPI    = React.useContext(contextProvider);
    const [shelfname, setname]      = React.useState(props.itemname);

    function handleOnOk() {
        if(!shelfname || shelfname.trim().length < 1 ) return;
        dispatch( action.shelf.rename(shelfname.trim(), props.index) );
        props.onclose();
    }

    return (
        <DialogBox
            title={'Rename ' + props.itemname}
            isshow={true}
            ok={handleOnOk}
            cancel={props.onclose}
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
                    marginBottom: 16
                }}
            />
        </View>
    );
}

import GlobalStyle from '../../Utility/GloabalStyles';
const styles = StyleSheet.create({
    itemtext: {
        fontSize:   GlobalStyle.fontsize,
        color:      GlobalStyle.fontcolor,
        marginLeft: 8,
        marginBottom: 16,
    }
});
