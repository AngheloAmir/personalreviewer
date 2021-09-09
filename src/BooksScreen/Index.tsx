/*
    This component set ups the stack navigation screen
*/
import * as React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import BooksInitialScreen from './BookScreen';

export default function BooksScreenIndex() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="BooksScreen" component={BookScreenContainer} options={{headerShown: false}} />
        </Stack.Navigator>
    );
}

import Topbar from '../TopBar';
function BookScreenContainer({navigation} :any) {
  return (
    <View style={{flex: 1}}>
      <Topbar title='Menu' navigation={navigation} />
      <BooksInitialScreen />
    </View>
  )
}
