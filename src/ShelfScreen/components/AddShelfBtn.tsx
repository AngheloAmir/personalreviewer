/*
    * TYPE
        Fragment of src/ShelfScreen/ListOfShelf - A fragment is a piece of component that is
            part of a scene

    * DESCRIPTION
        The add shelf button

    * VISIBLE AT
        It appears below the ListOfShelf.tsx
*/
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface propsReceive {
    onPress : () => void;
}

export default function AddShelfBtn(props :propsReceive) {
    return (
        <View style={style.container}>
            <TouchableOpacity onPress={props.onPress} style={style.buttonContainer}>
                <MaterialIcons name="library-add" size={30} color='lightgreen' />
                <Text style={style.text}>New Shelf</Text>
            </TouchableOpacity>

            <TouchableOpacity  style={style.buttonContainer}>
                <MaterialCommunityIcons name="database-import" size={30} color='lightgreen' />
                <Text style={style.text}>Import</Text>
            </TouchableOpacity>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        alignSelf:          'center',
        flexDirection:      'row',
        justifyContent:     'space-evenly',
        width:              '60%'
    },
    buttonContainer: {
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
        color: 'white'
    }
});
