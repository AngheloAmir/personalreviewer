/*
*/
import React from 'react';
import { View, ScrollView } from 'react-native';

import Topbar from '../TopBar';

import StoryViewer from '../Utility/StoryViewer';
const helpdata = require('./Database/about.json');

export default function Index({navigation} :any) {
    return (
        <View style={{flex: 1}}>
            <Topbar title='About' navigation={navigation} />
            <AboutScreen />
        </View>
    )  
}

function AboutScreen() {
    return (
        <ScrollView>
            <StoryViewer story={helpdata} />
        </ScrollView>
    )
}
