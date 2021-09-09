/*
*/
import React from 'react';
import { View, Image, Text} from 'react-native';
import { Book } from '../../StateAPI';

interface propsReceive {
    items       :Array<Book>;
    ondelete    :(index :number) => void;
}

const BookIcon = require('../../../assets/book.png');
export default function Books( props :propsReceive ) {
    return (
    <View>
        { props.items.map((item :Book, index :number) => {
            return (
                <View key={index}>
                    <View>
                        <Image source={BookIcon} style={{width: 48, height: 48}} resizeMode='cover'/>
                        <Text>{item.name}</Text>
                    </View>
                </View>
            )
        })
        }
    </View>
    )
}
