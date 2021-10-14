/*
    * TYPE
        Scene - A scene (screen) is a component that occupies a large part of the screen
        Index - A parent component that does not display itself

    * DESCRIPTION
       This component show the list of files (books or files) and handle when
       the file is clicked or the 3dots option is clicked

    * VISIBLE WHEN
        When the user is in the BookScreen which occur after the user open a shelf
*/
import React from 'react';
import { Image, View, StyleSheet, ScrollView } from 'react-native';

import { contextProvider, StateAPI, action } from '../StateAPI';
import { localContextProvider, LocalStateAPI, localAction } from './localStateAPI';

import ListOfItems from '../Utility/ListOfItems';
import AddItem from './components/AddItem';

const BookIcon = require('../../assets/book.png');
const PageIcon = require('../../assets/page.png');

interface propsReceive {
    isOnBooks   :boolean;
    navigation  :any;
}

export default function FileScreen(props :propsReceive) {
    const { state, dispatch } :StateAPI     = React.useContext(contextProvider);
    const { localDispatch } :LocalStateAPI  = React.useContext(localContextProvider);

    function handleItemPressed(item :any, index :number) {
        if( props.isOnBooks ) {
            dispatch( action.books.setSelectedBook(index) );
            dispatch( action.books.setSelectedPage(0)); //this function required! or it will error
            props.navigation.navigate('PageScreen');
        }
        else {
            dispatch( action.books.setSelectedPage(index));
            props.navigation.navigate('PageOpenScreen');
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content}>
                <ListOfItems
                    items={
                        props.isOnBooks ?
                            state.shelf :
                            state.shelf[state.selectedBook].files
                    }
                    onOptionPressed={ (index :number) => {
                        if( props.isOnBooks )
                            dispatch( action.books.setSelectedBook(index) );
                        else
                            dispatch( action.books.setSelectedPage(index) );
                        localDispatch( localAction.showDialogOption(true));
                        dispatch( action.books.setIsOnBooks(props.isOnBooks) );
                    }}
                    onItemSelected={handleItemPressed}
                    itemIcon={() => {
                        if( props.isOnBooks )
                            return <Image source={BookIcon} style={{width: 36, height: 36}} resizeMode='cover'/>
                        return <Image source={PageIcon} style={{width: 36, height: 36}} resizeMode='cover'/>
                    }}
                />
                <AddItem onPress={() => localDispatch( localAction.showDialogAdd(true)) } />
            </ScrollView>
        </View>
    );
}

import GlobalStyle from '../Utility/GlobalStyles';
import { WindowDimension } from '../Utility/useResponsive';
const styles = StyleSheet.create({
    container: {
        backgroundColor: GlobalStyle.defaultBackgroundColor,
    },
    content: {
        height: WindowDimension.height - 70,
        width: '88%',
        alignSelf: 'center',
        marginTop: 10,
        paddingBottom: 24,
    }
});
