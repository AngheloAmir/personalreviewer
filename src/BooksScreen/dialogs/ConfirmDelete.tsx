/*
    * TYPE
        Dialog Box - A Dialog Box is a component that over takes the current scene without replacing it.

    * DESCRIPTION
        Show the delete shelf dialog box to user using DialogBox from utilities

    * VISIBLE WHEN
        
*/
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import DialogBox from '../../Utility/DialogBox';
import { contextProvider, StateAPI, action } from '../../StateAPI';

interface propsReceive {
    shelfname   :string;
    index       :number;
    onclose     :() => void;
}

export default function ConfirmDelete(props :propsReceive) {
   const { dispatch } :StateAPI    = React.useContext(contextProvider);

    function handleOnOk() {
        
        props.onclose();
    }

    return (
        <DialogBox
            title={'Delete ' + props.shelfname + '?'}
            isshow={true}
            ok={handleOnOk}
            cancel={props.onclose}
            dialogContent={ () => <DialogContent shelfname={props.shelfname} /> }
        />
    );
}

interface dialogContentProps {
    shelfname   :string;
}

function DialogContent( props :dialogContentProps ) {
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons name="alert-rhombus" size={72} color="#f55" />
            <Text style={styles.itemtext}>Pernamently DELETE "{props.shelfname}" and its content? </Text>
        </View>
    );
}

import GlobalStyle from '../../Utility/GloabalStyles';
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 8,
    },
    itemtext: {
        fontSize:   GlobalStyle.fontsize,
        color:      GlobalStyle.fontcolor,
        marginLeft: 8,
        marginBottom: 16,
        marginTop: 8,
        textAlign: 'center',
    }
});
