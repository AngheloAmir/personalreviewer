/*
     * TYPE
        Fragment of src/PageOpenScreen/Index - A fragment is a piece of component that is
            part of a scene

    * DESCRIPTION

    * VISIBLE WHEN
        A page is edit
*/
import React from 'react';
import { View, Text } from 'react-native';

interface propsReceive {
}

export default function PageEditing(props :propsReceive) {
    return (
        <View>
            <Text style={{fontSize: 20}}>You are editing a page!!!!!!!!</Text>
        </View> 
    );
}
