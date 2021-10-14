/*
    Work same as the DialogBox but providing an alert icon and text as the content
*/
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DialogBoxWindow from '../DialogBox';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export interface propsReceive {
    title    :string;
    text     :string;
    isshow   :boolean;
    ok       :() => void;
    cancel?  :() => void;
}

export default function AlertBox(props :propsReceive) {
    return (
        <DialogBoxWindow
            title={props.title}
            isshow={props.isshow}
            ok={props.ok}
            cancel={props.cancel}
            dialogContent={() => dialogContent(props.text)}
        />
    );
}

function dialogContent(text :string) {
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons name="alert-rhombus" size={72} color="#f55" />
            <Text style={styles.itemtext}>{text}</Text>
        </View>
    )
}

import GlobalStyle from '../GlobalStyles';
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
