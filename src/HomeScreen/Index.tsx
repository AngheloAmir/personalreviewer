/*
    This component set ups the stack navigation screen
*/
import * as React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import HomeScreenInitial from './HomeScreen';

export default function HomeScreenIndex() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreenContainer} options={{headerShown: false}} />
        </Stack.Navigator>
    );
}

import Topbar from '../TopBar';
function HomeScreenContainer({navigation} :any) {
  return (
    <View style={{flex: 1}}>
      <Topbar title='Home' navigation={navigation} />
      <HomeScreenInitial />
    </View>
  )
}
