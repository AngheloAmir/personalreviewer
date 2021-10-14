/*
    Work same as the DialogBox but providing a list with icon as the content
*/
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DialogBox from '../DialogBox';

interface propsReceive {
    title       :string;
    isshow      :boolean;
    list        :Array<{text: string, iconname?: string}>;
    onSelect    :(code :string, index :number) => void;
    cancel      :() => void;
}

export default function OptionsDialog(props :propsReceive) {
    if(!props.isshow) return <View></View>;
    
    return (
        <DialogBox
            title={props.title}
            isshow={true}
            cancel={props.cancel}
            dialogContent={ () =>
                <DialogContent
                    close={props.cancel}
                    onSelect={props.onSelect}
                    list={props.list}
                />
            }
        />
    );
}

interface DialogContentProps {
    list        :Array<{text: string, iconname?: string}>;
    onSelect    :(text :string, index :number) => void;
    close       :() => void;
}

function DialogContent( props :DialogContentProps) {
    return (
        <View>
        { props.list.map((item :{text: string, iconname?: string}, index :number) => {
            return (
                <TouchableOpacity style={styles.item}
                    onPress={ () => { props.close(); props.onSelect( item.text, index ) }}
                    key={index}>
                    { item.iconname &&
                        <MaterialCommunityIcons name={item.iconname} size={32} color='lightgreen' />
                    }
                    <Text style={styles.itemtext}>{item.text}</Text>
                </TouchableOpacity>
            )
        })}
        </View>
    )
}

import GlobalStyle from '../GlobalStyles';
const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        marginVertical: 4,
        marginLeft: 8,
    },
    itemtext: {
        fontSize:   GlobalStyle.fontsize,
        color:      GlobalStyle.fontcolor,
        marginLeft: 12,
        marginBottom: 16,
    }
});
