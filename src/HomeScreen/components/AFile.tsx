/*
*/
import React from 'react';
import { View, Text } from 'react-native';

import { AData } from '../../StateAPI';

interface propsReceive {
    item        :AData;
    index       :number;
}

const BookIcon = require('../../../assets/book.png');
const PageIcon = require('../../../assets/page.png');

export default function AFile( props :propsReceive ) {
    return (
        <View>
            <Text> this is a file</Text>
        </View>
    )
}
