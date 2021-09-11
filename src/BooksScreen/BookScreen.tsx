/*
    * TYPE
        Scene - A scene (screen) is a component that occupies a large part of the screen
        Index - A parent component that does not display itself

    * DESCRIPTION
       

    * VISIBLE WHEN
        
*/
import React from 'react';
import { Image, View, StyleSheet, ScrollView } from 'react-native';

import { contextProvider, StateAPI, action } from '../StateAPI';
import ListOfItems from '../Utility/ListOfItems';

import AlertBox from '../Utility/AlertBox';
import AddItem from './components/AddItem';
import OptionsDialog from './dialogs/Options';
import ConfirmDelete from './dialogs/ConfirmDelete';
import RenameItem from './dialogs/RenameItem';

const BookIcon = require('../../assets/book.png');

export default function BookScreen({navigation} :any) {
    const { state, dispatch }: StateAPI = React.useContext(contextProvider);
    const [selectedBook, setSelected]               = React.useState(0);
    const [isShowAddDialog, setShowAddDialog]       = React.useState(false);
    const [isShowOptionDialog, setShowOptionDialog] = React.useState(false);
    const [isRenameOptionDialog, setRenameDialog]   = React.useState(false);
    const [isConfirmDeleteDialog, setConfirmDelete] = React.useState(false);
    const [isInfoShow, setInfo]                     = React.useState({show: false, text: ''});

    function handleItemPressed(item :any, index :number) {
        dispatch( action.books.setSelectedBook(index) );
        navigation.navigate('PageScreen');
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content}>
                <ListOfItems
                    items={state.shelf}
                    onOptionPressed={
                        (index :number) => {
                            setSelected(index); setShowOptionDialog(true);
                    }}
                    onItemSelected={handleItemPressed}
                    itemIcon={() => {
                        return <Image source={BookIcon} style={{width: 36, height: 36}} resizeMode='cover'/>
                    }}
                />
                <AddItem onPress={() => console.log('pressed')} />
            </ScrollView>

            <OptionsDialog
                show={isShowOptionDialog}
                currentItemIndex={selectedBook}
                currentItemName={state.shelf[selectedBook].name}
                cancel={() => setShowOptionDialog(false)}
                onRenameSelect={() => setRenameDialog(true)}
                onDeleteSelect={() => setConfirmDelete(true)}
                onInfoSelect={() =>
                    setInfo({
                        show: true,
                        text: `Created: ${state.shelf[selectedBook].date}\nLast Modified: ${state.shelf[selectedBook].lastmod}`
                    })
                }
            />

            { isConfirmDeleteDialog &&
            <ConfirmDelete
                shelfname={state.shelf[selectedBook].name}
                index={selectedBook}
                onclose={() => setConfirmDelete(false)}
            />
            }

            { isRenameOptionDialog &&
            <RenameItem
                itemname={state.shelf[selectedBook].name}
                index={selectedBook}
                onclose={() => setRenameDialog(false)}
            /> }

            <AlertBox
                title={state.shelf[selectedBook].name}
                text={isInfoShow.text}
                isshow={isInfoShow.show}
                ok={() => setInfo({show: false, text: ''})}
            />


        </View>
    );
}

//STYLING===========================================================================
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
