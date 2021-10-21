/*
     * TYPE
        Scene - A scene (screen) is a component that occupies a large part of the screen

    * DESCRIPTION
        Display the Search screen.

    * VISIBLE WHEN
        The user pressed "Search" in the navigation drawer
*/
import React from 'react';
import { View, StyleSheet, ScrollView, Text, TextInput, Button } from 'react-native';

import { contextProvider, StateAPI } from '../StateAPI';
import Topbar from '../TopBar';
import colorBlueFileSearch from '../Utility/ColorBlueFile/Search';


export default function Index({navigation} :any) {
    return (
        <View>
            <Topbar title='Search' navigation={navigation} />
            <SearchScreen />
        </View>
    )
}

function SearchScreen() {
    const { state } :StateAPI = React.useContext(contextProvider);
    const [result, setresult] = React.useState([
       {
           bookname: '----',
           founds: [
                { keyword: '', description: '' }
           ]
       }
    ]);
    const [searchtext, settext] = React.useState('');

    function generateSearch() {
        if(searchtext.length <= 1) return;
        let allresult :any= [];
        for(let x = 0; x < state.shelf.length; x++) {
            let founds :any = [];
            for(let y = 0; y < state.shelf[x].files.length; y++) {
                const result =  colorBlueFileSearch( state.shelf[x].files[y].content, searchtext, false );
                result.map((item :any) => founds.push(item) );
            }
            if(founds.length > 0 )
                allresult.push({
                    bookname: state.shelf[x].name,
                    founds: founds
                })
        }
        if(allresult.length <= 0 )
            setresult([{
                bookname: 'found nothing...',
                founds: [{ keyword: '', description: ''}]
            }]);
        else
            setresult(allresult);
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchInputContainer}>
                <View style={styles.searchBox}>
                    <Text style={styles.text}>Search:</Text>
                    <TextInput
                        autoFocus={true}
                        value={searchtext}
                        placeholder='search'
                        style={styles.input}
                        onChangeText={(text :string) => settext(text)}
                    />
                </View>
                <Button title='search' onPress={generateSearch} />
            </View>
            <ScrollView style={styles.searchResultContainer}>
            {
                result.map( (book :any, i :number) => {
                    return (
                        <View key={i} >
                            <Text style={styles.keyword}>{book.bookname}</Text>
                        {
                            book.founds.map((item :any, index :number) => {
                                if(!item.keyword.length || item.keyword.length <= 0)
                                    return <Text key={index} style={styles.text}>{item.description}</Text>
                                if(!item.description || item.description.length <= 0)
                                    return <Text key={index} style={styles.keyword}>{item.keyword}</Text>
                                return (
                                    <View key={index} style={styles.founds}>
                                        <Text style={styles.keyword}>{item.keyword}</Text>
                                        <Text style={styles.text}>{item.description}</Text>
                                    </View>
                                );
                            })
                        }
                        </View>
                    );
                })
            }
            </ScrollView>
        </View>
    );
}

import GlobalStyle from "../Utility/GlobalStyles";
import { WindowDimension } from '../Utility/useResponsive';
const styles = StyleSheet.create({
    container: {
        width: '90%',
        marginLeft: '5%',
        flexDirection: 'column',
        height: WindowDimension.height - 80,
    },
    searchInputContainer: {
        marginTop: 16,
    },
    searchBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    input: {
        fontSize: GlobalStyle.fontsize,
        color: 'lightgray',
        height: 32,
        width: '65%',
        borderWidth: 1,
        borderColor: 'lightblue',
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    searchResultContainer: {
        marginTop: 16,
    },
    founds: {
        width: '95%',
        marginLeft: '5%',
        marginTop: GlobalStyle.fontsize,
    },
    text: {
        fontSize: GlobalStyle.fontsize,
        color: 'lightgray',
    },
    keyword: {
        fontSize: GlobalStyle.fontsize,
        color: 'lightblue'
    },
});
