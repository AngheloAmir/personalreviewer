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
    let isNum = false;
    let numcount = 0;

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
                          if(isNum) {
                            spaces = '';
                            isNum = false;
                            numcount = 0;
                            return <View key={index}></View>
                          }
                          else {
                            spaces = '';
                            isNum = true;
                            numcount = 0;
                            return <Text key={index}
                                style={[styles.text, styles.keywordList]}>{text.substring(1, text.length)}</Text>
                          }

                        case "@":
                            if(isEncounterAt) {
                                spaces = '';
                                isEncounterAt = false;
                                return <View key={index}></View>
                            }
                            else {
                                spaces = '';
                                isEncounterAt = true;
                                return <Text key={index}
                                    style={[styles.text, styles.keywordList]}>{text.substring(1, text.length)}</Text>
                            }

                        case "*":
                            spaces = '\t\t';
                            if(isNum) {
                                numcount = numcount + 1;
                                return (
                                    <View style={styles.shifted} key={index}>
                                        <Text key={index} style={[styles.text, styles.keywordListItem]}>{romanize(numcount)}. {text.substring(1, text.length)}</Text>
                                    </View>
                                );
                            }
                            return (
                                <View style={styles.shifted} key={index}>
                                    <Text key={index} style={[styles.text, styles.keywordListItem]}>• {text.substring(1, text.length)}</Text>
                                </View>
                            );

                        case "-":
                            return <View key={index} style={styles.line}></View>

                        default:
                            if(isEncounterAt)
                                return (
                                    <View style={styles.shifted} key={index}>
                                        <Text key={index} style={[styles.text]}>{spaces + text}</Text>
                                    </View>
                                );
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

import GlobalStyle from "../GlobalStyles";
const styles = StyleSheet.create({
    shifted: {
        width: '95%',
        marginLeft: '5%',
    },
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
        //fontWeight: 'bold',
        color: 'lightblue'
    },
    keywordList: {
        fontWeight: 'bold',
        color: '#99c'
    },
    keywordListItem: {
        //fontWeight: 'bold',
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

function romanize (num :number) {
    if (isNaN(num))
        return NaN;
    var digits :any = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
               "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
               "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}
