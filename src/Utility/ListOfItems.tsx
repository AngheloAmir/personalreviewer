/*
    Return the list of  items available to be selected by the user. The list is simple as
    an array of string.

Example Usage======================================================
    <ListOfItems
        items={[{name: 'item1'}, {name: 'item2'}]}
        onOptionPressed={(index :number) => {
            console.log('pressed at: ' + index);
        }}
        onItemSelected={ (item :any, index :number) => {
            cosole.log('Pressed name: ' + item.name + ', at: ' + index);
        }}
        itemIcon={ () => {
            return <MaterialCommunityIcons name="bookshelf" size={32} color='lightblue' />
        }}
    />
*/
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface propsReceive {
    items               :Array<{name :string}  | any> | undefined;
    onOptionPressed?    :(index :number) => void;
    onItemSelected      :(item :any, index :number) => void;
    itemIcon            :() => React.Component | any;
    noOption?           :boolean;
}

export default function ListOfItems( props :propsReceive ) {
    if(!props.items || props.items.length <= 0)
        return <View></View>
        
    return (
        <View style={{marginBottom: 4}}>
        {
            props.items.map((item :{name :string}, index :number) => {
                return (
                    <View key={index} style={styles.container}>
                        <TouchableOpacity style={styles.item} onPress={() => props.onItemSelected(item, index) }>
                            { props.itemIcon() }
                            <Text style={styles.itemtext}>{item.name}</Text>
                        </TouchableOpacity>
                        { !props.noOption && 
                            <TouchableOpacity onPress={() => props.onOptionPressed && props.onOptionPressed(index) }>
                                <MaterialCommunityIcons name="dots-horizontal" size={24} color='lightgreen' />
                            </TouchableOpacity>
                        }
                    </View>
                )
            })
        }
        </View>
    );
}

import GlobalStyle from './GlobalStyles';
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    item: {
        flexDirection: 'row',
    },
    itemtext: {
        fontSize:   GlobalStyle.fontsize + 2,
        color:      GlobalStyle.fontcolor,
        marginLeft: 8,
        marginBottom: 16,
        marginTop: 8,
    },
});
