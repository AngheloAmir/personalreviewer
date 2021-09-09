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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { contextProvider, StateAPI, AShelf, statefunction, Book, action } from '../../StateAPI';

interface propsReceive {
    onOpenBooks     :() => void;
    onOptionPressed :(index :number) => void;
}

export default function ListOfShelfs( props :propsReceive ) {
    const { state, dispatch } :StateAPI = React.useContext(contextProvider);

    async function handleShelfItemSelect(shelf :AShelf) {
        try {
            const data = await AsyncStorage.getItem(shelf.key);
            if(data == null) {
                const shelfdata :Array<Book> = [];
                    shelfdata.push( statefunction.createBook('demo') );
                    shelfdata.push( statefunction.createBook('demo 2') );
                    shelfdata[0].files.push( statefunction.createFile('file1') );
                    shelfdata[0].files.push( statefunction.createFile('file2') );
                    shelfdata[1].files.push( statefunction.createFile('qwe') );
                    shelfdata[1].files.push( statefunction.createFile('asd') );
                    shelfdata[1].files.push( statefunction.createFile('rty') );
                    shelfdata[1].files.push( statefunction.createFile('ooo') );
                await AsyncStorage.setItem(shelf.key, JSON.stringify(shelfdata));
                dispatch( action.books.setBooks(shelfdata) );
            }
            else
                dispatch( action.books.setBooks( JSON.parse(data) ) );
        }
        catch(err) {
            console.error(err);
        }
        props.onOpenBooks();
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
