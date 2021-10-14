/*
    Work same as the DialogBox but providing an scrollable (or non scrollable) text content
*/
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DialogBoxWindow from '../DialogBox';

export interface propsReceive {
    title    :string;
    text     :string;
    isshow   :boolean;
    ok       :() => void;
    cancel?  :() => void;
    scroll?  :boolean;
}

export default function InfoBox(props :propsReceive) {
    if(!props.isshow) return <View></View>;
    
    return (
        <DialogBoxWindow
            title={props.title}
            isshow={true}
            ok={props.ok}
            cancel={props.cancel}
            isScrolledContent={props.scroll ? true : false}
            dialogContent={() => dialogContent(props.text)}
        />
    );
}

function dialogContent(text :string) {
    return (
        <View style={styles.container}>
            <Text style={styles.itemtext}>{text}</Text>
        </View>
    )
}

import GlobalStyle from '../GlobalStyles';
const styles = StyleSheet.create({
    container: {
    },
    itemtext: {
        textAlign: 'justify',
        fontSize:   GlobalStyle.fontsize + 1,
        color:      GlobalStyle.fontcolor,
        marginLeft: 8,
        marginBottom: 16,
        lineHeight: GlobalStyle.fontsize * 1.5,
    }
});
