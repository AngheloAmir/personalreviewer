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
import AddItem from './components/AddItem';

const PageIcon = require('../../assets/page.png');

export default function PageScreen() {
    const { state, dispatch }: StateAPI = React.useContext(contextProvider);
    const [selectedPage, setSelected]               = React.useState(0);
    const [isShowAddDialog, setShowAddDialog]       = React.useState(false);
    const [isShowOptionDialog, setShowOptionDialog] = React.useState(false);
    const [isRenameOptionDialog, setRenameDialog]   = React.useState(false);
    const [isConfirmDeleteDialog, setConfirmDelete] = React.useState(false);

    function handleItemPressed(item :any, index :number) {
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content}>
                <ListOfItems
                    items={state.shelf[state.selectedBook].files }
                    onOptionPressed={(index :number) => console.log('Pressed at: ' + index)}
                    onItemSelected={handleItemPressed}
                    itemIcon={() => { return <Image source={PageIcon} style={{width: 36, height: 36}} resizeMode='cover'/> }}
                />
                <AddItem onPress={() => console.log('pressed')} />
            </ScrollView>
        </View>
    )
}

//STYLING===========================================================================
import GlobalStyle from '../Utility/GlobalStyles';
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
