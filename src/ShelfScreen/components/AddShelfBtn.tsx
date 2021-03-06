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
            <TouchableOpacity onPress={props.onPress}>
                <MaterialIcons name="library-add" size={30} color='lightgreen' />
            </TouchableOpacity>
        </View>
    );
}

const style = StyleSheet.create({
    container: {

    },
    buttonContainer: {
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
        color: 'white'
    }
});
