/*
    * TYPE
        Dialog Box - A Dialog Box is a component that over takes the current scene without replacing it.

    * DESCRIPTION
        Show option dialog box to the user screen

    * VISIBLE WHEN
        The user pressed the ... in the right side of the shelf name
*/
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DialogBox from '../../Utility/DialogBox';

interface propsReceive {
    currentItemIndex     :number;
    currentItemName      :string;
    show                 :boolean;
    cancel               :() => void;
    onRenameSelect       :() => void;
    onDeleteSelect       :() => void;
    onExport             :() => void;
}

export default function OptionsDialog(props :propsReceive) {
    return (
        <DialogBox
            title={'What to do with ' + props.currentItemName + '?'}
            isshow={props.show}
            cancel={props.cancel}
            dialogContent={ () =>
                <DialogContent
                    close={props.cancel}
                    onRenameSelect={props.onRenameSelect}
                    onDeleteSelect={props.onDeleteSelect}
                    onExport={props.onExport}
                />
            }
        />
    );
}

function DialogContent( {close, onRenameSelect, onDeleteSelect, onExport} :any ) {
    return (
        <View>
            <TouchableOpacity style={styles.item} onPress={() => { onRenameSelect(); close() }}>
                <MaterialCommunityIcons name='rename-box' size={32} color='lightgreen' />
                <Text style={styles.itemtext}>Rename</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={() => { onDeleteSelect(); close() }}>
                <MaterialCommunityIcons name='delete-forever' size={32} color='lightgreen' />
                <Text style={styles.itemtext}>Delete</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={() => { onExport(); close(); }}>
                <MaterialCommunityIcons name='file-export' size={32} color='lightgreen' />
                <Text style={styles.itemtext}>Download this shelf</Text>
            </TouchableOpacity>
        </View>
    );
}

import GlobalStyle from '../../Utility/GlobalStyles';
const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        marginVertical: 4,
        marginLeft: 8,
    },
    itemtext: {
        fontSize:   GlobalStyle.fontsize,
        color:      GlobalStyle.fontcolor,
        marginLeft: 12,
        marginBottom: 16,
    }
});
