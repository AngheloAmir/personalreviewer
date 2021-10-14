/*
    This component set ups the stack navigation screen
*/
import * as React from 'react';
import { View } from 'react-native';
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
          </Stack.Navigator>
        </localContextProvider.Provider>
    );
}

import Topbar from '../TopBar';
import AllDialogsIndex from './components/AllDialogsIndex';

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
