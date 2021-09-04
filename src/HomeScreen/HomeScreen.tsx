/*
*/
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { contextProvider, StateAPI } from '../StateAPI';

import FileItems from './components/FileItems';

export default function HomeScreen() {
    const { state, msgbox }: StateAPI = React.useContext(contextProvider);

    function handleDelete(index: number) {
        console.log('deleting');
    }

    return (
        <View style={styles.container}>
            <FileItems
                items={state.mydata}
                ondelete={handleDelete}
            />
        </View>
    )
}

//STYLING
import GlobalStyle from '../Utility/GloabalStyles';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyle.defaultBackgroundColor,
    }
});
