/*
    This component set ups the stack navigation screen.

    HOW THIS WORKS:
      There is two main screen that exist in this component, the BookScreen and the PageScreen.
      Since this two share similar functionality like renaming, these has been merge in FileScreen.
      Also this achieve the back button functionality provided by the React Navigation.

      The FileScreen will have to check whether the user was browsing Books or Pages
      before an action is performed.

      AllDialogsIndex is a component that contained all of the Dialog boxes that will appear in this component.
      Each child component will handle its own functionality, like renaming.
*/
import * as React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import FilesScreen from './FilesScreen';
import { localContextProvider, createDefaultState, rootReducer} from './localStateAPI';

export default function BooksScreenIndex() {
  const [localState, localDispatch] = React.useReducer(rootReducer, createDefaultState());
    return (
        <localContextProvider.Provider value={{localState, localDispatch}}>
          <Stack.Navigator>
              <Stack.Screen name="BooksScreen" component={BookScreenContainer} options={{headerShown: false}} />
              <Stack.Screen name="PageScreen"  component={PageScreenContainer} options={{headerShown: false}} />
              <Stack.Screen name="PageOpenScreen"  component={PageReadScreenContainer} options={{headerShown: false}} />
          </Stack.Navigator>
        </localContextProvider.Provider>
    );
}

import Topbar from '../TopBar';
import AllDialogsIndex from './components/AllDialogsIndex';
import PageOpenScreenIndex from '../PageOpenScreen/Index';

function BookScreenContainer({navigation} :any) {
  return (
    <View>
      <Topbar title='Books' navigation={navigation} />
      <AllDialogsIndex isOnBooks={true}/>
      <FilesScreen isOnBooks={true} navigation={navigation}/>
    </View>
  )
}

function PageScreenContainer({navigation} :any) {
  return (
    <View>
      <Topbar title='Pages' navigation={navigation} />
      <AllDialogsIndex isOnBooks={false}/>
      <FilesScreen isOnBooks={false} navigation={navigation}/>
    </View>
  )
}

function PageReadScreenContainer({navigation} :any) {
  return (
      <View>
          <Topbar title='Reading' navigation={navigation} />
          <PageOpenScreenIndex />
      </View>
  );
}
