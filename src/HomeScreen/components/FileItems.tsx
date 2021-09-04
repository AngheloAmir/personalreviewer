/*
*/
import React from 'react';
import { View } from 'react-native';

import { AData } from '../../StateAPI';
import AFile from './AFile';

interface propsReceive {
    items       :Array<AData>;
    ondelete    :(index :number) => void;
}

export default function ListItems( props :propsReceive ) {
    return (
    <View>
        { props.items.map((item :AData, index :number) => {
            return (
                <View key={index}>
                    <AFile item={item} index={index} />
                </View>
            )
        })
        }
    </View>
    )
}
