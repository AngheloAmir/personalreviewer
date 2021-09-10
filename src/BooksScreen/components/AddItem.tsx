/*
    * TYPE
        Fragment of src/ShelfScreen/ShelfScreen - A fragment is a piece of component that is
            part of a scene

    * DESCRIPTION
        The add shelf button

    * VISIBLE AT
        It appears below the ListOfShelf.tsx
*/
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface propsReceive {
    onPress : () => void;
}

export default function AddItem(props :propsReceive) {
    return (
        <View >
            <TouchableOpacity onPress={props.onPress} >
                <MaterialIcons name="library-add" size={30} color='lightgreen' />
            </TouchableOpacity>
        </View>
    );
}


