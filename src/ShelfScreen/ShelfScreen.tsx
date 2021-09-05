/*
*/
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { contextProvider, StateAPI } from '../StateAPI';

export default function ShelfScreen() {
    const { state } :StateAPI = React.useContext(contextProvider);
    return (
        <View style={styles.container}>
        {
            state.listOfShelfs.map((item :string, index :number) => {
                return (
                    <TouchableOpacity>
                        <Text key={index} style={{fontSize: 32, color: 'white'}}>{item}</Text>
                    </TouchableOpacity>
                )
            })
        }
            <Text style={{fontSize: 16, color: 'white'}}>add a shelf</Text>
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
