/*
    * TYPE
        Fragment of src/ShelfScreen/index - A fragment is a piece of component that is
            part of a scene

    * DESCRIPTION
        Show the list of available shelf

    * VISIBLE WHEN
        When the user is at the Shelf scene
*/
import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { contextProvider, StateAPI, AShelf, Book, action, statefunction } from '../../StateAPI';
import ListOfItems      from '../../Utility/ListOfItems';
import AddShelfBtn      from '../components/AddShelfBtn';

interface propsReceive {
    navigation              :any;
    setShowOptionDialog     :(show :boolean) => void;
    setItem                 :(arg :{ name :string, index: number }) => void;
    setShowAddDialog        :(show :boolean) => void;
}

export default function ListOfShelfs(props :propsReceive) {
    const { state, dispatch } :StateAPI = React.useContext(contextProvider);

    //Handle when a shelf is selected.
    //This how it works:
    //First, it check if the assciated item has key that exist in the async storage
    //if so load the data (parse in json). if not, create a demo books
    //and save the content in async storage
    async function handleShelfItemSelect(shelf :AShelf, index :number) {
        try {
            const data = await AsyncStorage.getItem(shelf.key);
            if(data == null) {
                const shelfdata :Array<Book> = [];
                shelfdata.push( statefunction.createSample() );

                await AsyncStorage.setItem(shelf.key, JSON.stringify(shelfdata));
                dispatch( action.books.setBooks(shelfdata) );
            }
            else
                dispatch( action.books.setBooks( JSON.parse(data) ) );
            dispatch( action.books.setIsOnBooks(true) );
            props.navigation.jumpTo('Books');
        }
        catch(err) {
            console.error(err);
        }
    }
    
    return (
        <ScrollView style={styles.content}>
            <ListOfItems
                items={state.listOfShelfs}
                onOptionPressed={(index :number) => {
                    props.setShowOptionDialog(true);
                    props.setItem({ name: state.listOfShelfs[index].name, index: index });
                }}
                onItemSelected={handleShelfItemSelect}
                itemIcon={ () => {
                    return <MaterialCommunityIcons name="bookshelf" size={32} color='lightblue' />
                }}
            />
            <AddShelfBtn onPress={() => props.setShowAddDialog(true)} />
        </ScrollView>
    )
}

import { WindowDimension } from '../../Utility/useResponsive';
const styles = StyleSheet.create({
    content: {
        height: WindowDimension.height - 70,
        width: '88%',
        alignSelf: 'center',
        marginTop: 10,
        paddingBottom: 24,
    }
});
