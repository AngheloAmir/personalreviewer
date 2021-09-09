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

import { contextProvider, StateAPI } from '../StateAPI';
import ListOfShelfs     from './components/ListOfShelfs';
import AddShelfBtn      from './components/AddShelfBtn';
import AddNewShelf      from './dialogs/AddNewShelf';
import Options          from './dialogs/Options';  
import RenameShelf      from './dialogs/RenameShelf';
import ConfirmDelete    from './dialogs/ConfirmDelete';

export default function ShelfScreen() {
    const { state } :StateAPI                       = React.useContext(contextProvider); 
    const [isShowAddDialog, setShowAddDialog]       = React.useState(false);
    const [isShowOptionDialog, setShowOptionDialog] = React.useState(false);
    const [isRenameOptionDialog, setRenameDialog]   = React.useState(false);
    const [isConfirmDeleteDialog, setConfirmDelete] = React.useState(false);
    const [currentItem, setItem]                    = React.useState({name: '', index: 0});
    
    return (
        <View style={styles.container}>
            <ScrollView style={styles.content}>
                <ListOfShelfs
                   onOptionPressed={(index :number) => {
                       setShowOptionDialog(true);
                       setItem({ name: state.listOfShelfs[index].name, index: index });
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
import { State } from 'react-native-gesture-handler';
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
