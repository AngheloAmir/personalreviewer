/*
  The main entry component file.
  * It set up the global state and provide context provider to be used.
  * It display the main view (the initial screen the user would see)
  * Also, it handle the custom made alert box easier.
*/
import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { contextProvider, createDefaultState, action, AShelf } from './src/StateAPI';
import RootReducer from './src/StateAPI/RootReducer';

import IndexNavigation from './src/IndexNavigation';

export default function App() {
  const [state, dispatch]     = React.useReducer(RootReducer, createDefaultState());

  //Load the save states which contains an array of {name :string, key :string}
  //this cant be done during redrawn of the component so it has be added after everything is rendered
  React.useEffect(() => {
    async function loadSaveListOfShelf() {
      try {
        const savestate :any = await AsyncStorage.getItem('savestates');
        if(savestate == null) 
          await AsyncStorage.setItem('savestates', JSON.stringify({
            listOfShelfs: [ { name: 'demo', key: '' + Date.now() } ]
          }));
        else 
          dispatch( action.shelf.setList( JSON.parse(savestate) ) );
        }
        catch(err) {
          console.error(err);
        }
      }
    loadSaveListOfShelf();
  }, []);




  return (
    <View style={styles.app}>
      <StatusBar barStyle='default'/>
        <contextProvider.Provider value={{state, dispatch}}>
          <IndexNavigation />
        </contextProvider.Provider>		
    </View>
  );
}//

import GlobalStyle from './src/Utility/GloabalStyles';
const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: GlobalStyle.defaultBackgroundColor
  },
});
