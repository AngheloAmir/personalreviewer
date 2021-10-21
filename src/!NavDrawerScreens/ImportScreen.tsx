/*
     * TYPE
        Scene - A scene (screen) is a component that occupies a large part of the screen

    * DESCRIPTION
        Show the import screen to the user.

    * VISIBLE WHEN
        The select "Import" in the navigation drawer while in Shelf Screen
*/
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Touchable } from 'react-native';

import { contextProvider, StateAPI, action } from '../StateAPI';
import { StorageAccessFramework } from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ListOfItems from '../Utility/ListOfItems';
import Topbar from '../TopBar';
import CommonNav from './Functions/Common';

import ContentFile from './Functions/interface';
import loadFilesInTheHomeDirectory from './Functions/loadFilesInTheHomeDirectory';

export default function Index({navigation} :any) {
    return (
        <View>
            <Topbar title='Help' navigation={navigation} />
            <ImportScreen navigation={navigation}/>
        </View>
    )  
}

function ImportScreen({navigation} :any) {
    const { dispatch } :StateAPI = React.useContext(contextProvider);
    const [files, setfiles] = React.useState([{name :'', path: ''}]);

    React.useEffect(() => {
        async function init() {
            await CommonNav.init();
            loadFile();
        }
        init();
    }, []);

    async function loadFile() {
        const files = await loadFilesInTheHomeDirectory();
        setfiles( files );
    }

    async function handleFileSelect(file :ContentFile) {
        try {
            const content = await StorageAccessFramework.readAsStringAsync(file.path);
            const key = '' + Date.now();
            dispatch( action.shelf.add({name: file.name, key: key }) );
            await AsyncStorage.setItem(key, content);
            navigation.navigate('Shelfs');
        }
        catch(err) {

        }
    }

    async function handleSetDirectory() {
        const saf = await StorageAccessFramework.requestDirectoryPermissionsAsync();
        if( saf.granted) {
            CommonNav.setHomeDirectoryFromURI(saf.directoryUri);
            await loadFile();
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Please select a file from the current home directory (tap to change) </Text>
            <TouchableOpacity style={styles.directory} onPress={handleSetDirectory}>
                <Text style={styles.text}>{CommonNav.getHomeDirectorty()}</Text>
            </TouchableOpacity>
            <View style={styles.containerList}>
                <Text style={styles.text}>Found files</Text>
                <ListOfItems
                    items={files}
                    noOption={true}
                    onItemSelected={ (item :any) => {
                        handleFileSelect( item );
                    }}
                    itemIcon={ () => {
                        return <MaterialCommunityIcons name="bookshelf" size={32} color='lightblue' />
                    }}
                />
            </View>
        </View>
    );
}

import GlobalStyle from '../Utility/GlobalStyles';
const styles = StyleSheet.create({
    container: {
        width: '90%',
        marginLeft: '5%',
        marginTop: 24,
    },
    containerList: {
        width: '90%',
        marginLeft: '5%',
        marginTop: 16,
        padding: 8,
    },
    directory: {
        borderWidth: 1,
        borderColor: 'lightgreen',
        borderRadius: 8,    
        marginTop: 12,
        padding: 2,
    }, 
    text: {
        fontSize: GlobalStyle.fontsize,
        color: GlobalStyle.fontcolor,
        textAlign: 'center'
    }
});
