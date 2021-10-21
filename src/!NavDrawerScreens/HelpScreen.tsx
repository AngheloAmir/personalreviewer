/*
     * TYPE
        Scene - A scene (screen) is a component that occupies a large part of the screen

    * DESCRIPTION
        Display an article

    * VISIBLE WHEN
        When pressed in the navigation drawer
*/
import React from 'react';
import { View, ScrollView } from 'react-native';

import Topbar from '../TopBar';

import StoryViewer from '../Utility/StoryViewer';
const helpdata = require('./Database/help.json');

export default function Index({navigation} :any) {
    return (
        <View style={{flex: 1}}>
            <Topbar title='Help' navigation={navigation} />
            <HelpScreen />
        </View>
    )  
}

function HelpScreen() {
    return (
        <ScrollView>
            <StoryViewer story={helpdata} />
        </ScrollView>
    )
}
