/*
    This component set ups the stack navigation screen
*/
import * as React from 'react';
import { View } from 'react-native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
const Stack = createStackNavigator();

import BooksInitialScreen from './BookScreen';
import PageScreen from './PageScreen';

export default function BooksScreenIndex() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="BooksScreen" component={BookScreenContainer} options={{headerShown: false}} />
            <Stack.Screen name="PageScreen"  component={PageContainer} options={{headerShown: false}} />
        </Stack.Navigator>
    );
}

import Topbar from '../TopBar';
function BookScreenContainer({navigation} :any) {
  return (
    <View>
      <Topbar title='Books' navigation={navigation} />
      <BooksInitialScreen navigation={navigation} />
    </View>
  )
}

function PageContainer({navigation} :any) {
  return (
    <View>
      <Topbar title='Pages' navigation={navigation} />
      <PageScreen />
    </View>
  )
}
