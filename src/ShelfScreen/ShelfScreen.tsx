/*
    * TYPE
        Scene - A scene (screen) is a component that occupies a large part of the screen
        Index - A parent component that does not display itself

    * DESCRIPTION
        Show the content of the Shelf Screen. This component also sets the layout of the Shelf Screen

    * VISIBLE WHEN
        This component is usually rendered when the app is first started or
        the user choose "Shelfs" in the drawer menu
*/
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { contextProvider, StateAPI, AShelf, Book, action, statefunction } from '../StateAPI';
import ListOfItems      from '../Utility/ListOfItems';
import AddShelfBtn      from './components/AddShelfBtn';
import AddNewShelf      from './dialogs/AddNewShelf';
import Options          from './dialogs/Options';  
import RenameShelf      from './dialogs/RenameShelf';
import ConfirmDelete    from './dialogs/ConfirmDelete';

export default function ShelfScreen({navigation} :any) {
    const { state, dispatch } :StateAPI             = React.useContext(contextProvider); 
    const [currentItem, setItem]                    = React.useState({name: '', index: 0});
    const [isShowAddDialog, setShowAddDialog]       = React.useState(false);
    const [isShowOptionDialog, setShowOptionDialog] = React.useState(false);
    const [isRenameOptionDialog, setRenameDialog]   = React.useState(false);
    const [isConfirmDeleteDialog, setConfirmDelete] = React.useState(false);
    
    async function handleShelfItemSelect(shelf :AShelf, index :number) {
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
            dispatch( action.books.setIsOnBooks(true) );
            navigation.jumpTo('Books');
        }
        catch(err) {
            console.error(err);
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content}>
                <ListOfItems
                    items={state.listOfShelfs}
                    onOptionPressed={(index :number) => {
                        setShowOptionDialog(true);
                        setItem({ name: state.listOfShelfs[index].name, index: index });
                    }}
                    onItemSelected={handleShelfItemSelect}
                    itemIcon={ () => {
                        return <MaterialCommunityIcons name="bookshelf" size={32} color='lightblue' />
                    }}
                />
                
                <AddShelfBtn onPress={() => setShowAddDialog(true)} />
            </ScrollView>
            
        {/*DIALOGS ===============================================*/}
            <AddNewShelf
                show={isShowAddDialog}
                cancel={() => setShowAddDialog(false)}
                ok={() =>     setShowAddDialog(false)}
            />

            <Options
                show={isShowOptionDialog}
                currentItemIndex={currentItem.index}
                currentItemName={currentItem.name}
                cancel={() => setShowOptionDialog(false)}
                onRenameSelect={() => setRenameDialog(true)}
                onDeleteSelect={() => setConfirmDelete(true)}
            />

            { isRenameOptionDialog &&
            <RenameShelf
                shelfname={currentItem.name}
                index={currentItem.index}
                onclose={() => setRenameDialog(false)}
            /> }

            { isConfirmDeleteDialog &&
            <ConfirmDelete
                shelfname={currentItem.name}
                index={currentItem.index}
                onclose={() => setConfirmDelete(false)}
            />
            }
        </View>
    );
}

import GlobalStyle from '../Utility/GloabalStyles';
import { WindowDimension } from '../Utility/useResponsive';
const styles = StyleSheet.create({
    container: {
        backgroundColor: GlobalStyle.defaultBackgroundColor,
    },
    content: {
        height: WindowDimension.height - 70,
        width: '90%',
        alignSelf: 'center',
        marginTop: 10,
        paddingBottom: 24,
    }
});
