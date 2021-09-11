/*
    * TYPE
        Dialog Box - A Dialog Box is a component that over takes the current scene without replacing it.

    * DESCRIPTION
        Show option dialog box to the user screen

    * VISIBLE WHEN
        The user pressed the ... in the right side of the shelf name. This dialog is shared and will be used by the
        BookScreen and PageScreen component.
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
    onInfoSelect         :() => void;
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
                    onInfoSelect={props.onInfoSelect}
                />
            }
        />
    );
}

function DialogContent( {close, onRenameSelect, onDeleteSelect, onInfoSelect} :any ) {
    return (
        <View>
            <TouchableOpacity style={styles.item} onPress={() => { onInfoSelect(); close() }}>
                <MaterialCommunityIcons name='information' size={32} color='lightgreen' />
                <Text style={styles.itemtext}>Info</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={() => { onRenameSelect(); close() }}>
                <MaterialCommunityIcons name='rename-box' size={32} color='lightgreen' />
                <Text style={styles.itemtext}>Rename</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item}>
                <MaterialCommunityIcons name='arrow-up-circle' size={32} color='lightgreen' />
                <Text style={styles.itemtext}>Move Up</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item}>
                <MaterialCommunityIcons name='arrow-down-circle' size={32} color='lightgreen' />
                <Text style={styles.itemtext}>Move Down</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item}>
                <MaterialCommunityIcons name='sort-alphabetical-ascending' size={32} color='lightgreen' />
                <Text style={styles.itemtext}>Sort all</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={() => { onDeleteSelect(); close() }}>
                <MaterialCommunityIcons name='delete-forever' size={32} color='lightgreen' />
                <Text style={styles.itemtext}>Delete</Text>
            </TouchableOpacity>


        </View>
    );
}

import GlobalStyle from '../../Utility/GloabalStyles';
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
