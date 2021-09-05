/*
    This component set ups the stack navigation screen
*/
import * as React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import ShelfScreenInitial from './ShelfScreen';

export default function BooksScreenIndex() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Shelfs" component={ShelfScreenContainer} options={{headerShown: false}} />
        </Stack.Navigator>
    );
}

import Topbar from '../TopBar';
function ShelfScreenContainer({navigation} :any) {
  return (
    <View style={{flex: 1}}>
      <Topbar title='Menu' navigation={navigation} />
      <ShelfScreenInitial />
    </View>
  )
}
