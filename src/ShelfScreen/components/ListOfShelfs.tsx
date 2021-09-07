/*
    * TYPE
        Fragment of src/ShelfScreen/ShelfScreen - A fragment is a piece of component that is
            part of a scene

    * DESCRIPTION
        Return the list of shelf items available to be selected by the user. The list is simple as
        an array of string. However, these points to AsyncStorage key value.

    * VISIBLE AT
        The top of the Shelf Screen 
*/
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { contextProvider, StateAPI, AShelf } from '../../StateAPI';

interface propsReceive {
    onOptionPressed :(index :number) => void;
}

export default function ListOfShelfs( props :propsReceive ) {
    const { state } :StateAPI = React.useContext(contextProvider);

    function handleShelfItemSelect(shelf :AShelf) {
        console.error('CLICKING A SHELF NOT YET DEFINED')
        console.log('name: ' + shelf.name + ', key: ' + shelf.key);
    }
    
    return (
        <View style={{marginBottom: 4}}>
        {
            state.listOfShelfs.map((item :AShelf, index :number) => {
                return (
                    <View key={index} style={styles.container}>
                        <TouchableOpacity style={styles.item} onPress={() => handleShelfItemSelect(item) }>
                            <MaterialCommunityIcons name="bookshelf" size={32} color='lightblue' />
                            <Text style={styles.itemtext}>{item.name}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => props.onOptionPressed(index) }>
                            <MaterialCommunityIcons name="dots-horizontal" size={24} color='darkgreen' />
                        </TouchableOpacity>
                    </View>
                )
            })
        }
        </View>
    );
}

import GlobalStyle from '../../Utility/GloabalStyles';
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    item: {
        flexDirection: 'row',
    },
    itemtext: {
        fontSize:   GlobalStyle.fontsize,
        color:      GlobalStyle.fontcolor,
        marginLeft: 8,
        marginBottom: 16,
        marginTop: 8,
    },

});
