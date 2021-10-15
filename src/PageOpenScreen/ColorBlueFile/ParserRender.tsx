/*
    Render a string that has use ColorBlueFile format.
*/

import React from "react";
import { View, Text, StyleSheet } from 'react-native';

interface propsReceive {
    data        :string;
}

export default function ParserRender(props :propsReceive) {
    try {
    let temp = props.data.split( "\n");
    if( temp.length === 1 && temp[0].length === 0 )
        return <Text style={styles.text}>...empty...</Text>;

    let spaces = '';
    let isEncounterAt = false;

    return (
        <View>
            {
                temp.map( (text :string, index: number) => {
                    //line break
                        if( text.length <= 0 )
                            return <Text key={index}></Text>

                    //comment
                        if( text[0] === "/" && text[1] === "/" )
                            return <Text key={index} style={[styles.text, styles.comment]}>{text}</Text>

                    switch( text[0] ) {
                        case "#":
                            spaces = '\t\t';
                            return <Text key={index} style={[styles.text, styles.keyword]}>{text.substring(1, text.length)}</Text>

                        case "!":
                            return <Text key={index} style={[styles.text, styles.red]}>{text.substring(1, text.length)}</Text>

                        case "&":
                        case "@":
                            if(isEncounterAt) {
                                spaces = '';
                                isEncounterAt = false;
                                return <View key={index}></View>
                            }
                            else {
                                spaces = '\t\t';
                                isEncounterAt = true;
                                return <Text key={index} style={[styles.text, styles.keywordList]}>{text.substring(1, text.length)}</Text>
                            }

                        case "*":
                            spaces = '\t\t\t\t';
                            return <Text key={index} style={[styles.text, styles.keywordListItem]}>{'\t\t'}{text.substring(1, text.length)}</Text>

                        case "-":
                            return <View key={index} style={styles.line}></View>

                        default:
                            return <Text key={index} style={[styles.text]}>{spaces + text}</Text>
                    }
                })
            }
        </View>
    );
    } catch(err) {
        return (
            <View>
                <Text style={[styles.text, {color: 'red'}]}>File cannot be parsed</Text>
            </View>
        );
    }
}

import GlobalStyle from "../../Utility/GlobalStyles";
const styles = StyleSheet.create({
    text: {
        fontSize: GlobalStyle.fontsize,
        color: 'lightgray',
    },
    empty: {
        color: 'gray',
    },
    error: {
        color: 'red',
    },
    comment: {
        color: 'gray',
        fontStyle: 'italic'
    },
    keyword: {
        fontWeight: 'bold',
        color: 'lightblue'
    },
    keywordList: {
        fontWeight: 'bold',
        color: '#99c'
    },
    keywordListItem: {
        fontWeight: 'bold',
        color: '#6ca'
    },
    red: {
        color: '#f88',
        fontWeight: 'bold'
    },
    line: {
        width: '85%',
        marginLeft: '7.5%',
        borderWidth: 1,
        borderColor: 'gray',
        paddingVertical: 1
    }
});
