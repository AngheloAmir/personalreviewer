/*
*/
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { contextProvider, StateAPI } from '../StateAPI';

import Books from './components/Books';

export default function BookScreen() {
    const { state }: StateAPI = React.useContext(contextProvider);

    function handleDelete(index: number) {
        console.log('deleting');
    }

    return (
        <View style={styles.container}>
        {
            state.shelf && state.shelf.length > 0 ?
            <Books
                items={state.shelf}
                ondelete={handleDelete}
            />
            :
            <Text>
                There is no book in this shelf
            </Text>
        }
        </View>
    )
}

//STYLING===========================================================================
import GlobalStyle from '../Utility/GloabalStyles';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyle.defaultBackgroundColor,
    }
});
