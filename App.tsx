/*
  The main entry component file.
  * It set up the global state and provide context provider to be used.
  * It display the main view (the initial screen the user would see)
  
  HOW THE PROGRAM WORKS?
    On the initial display of the application, the src/IndexForSelf is loaded.
    This component sets up the navigation drawer. It will essentially display
    the ShelfScreen (at src/ShelfScreen/Index).

    The application stores array of { name: string, key: string } which is known as the 
    "list of shelf" in the async storage key: "savestates".
    This items display the list of shelf that will be available to be selected by the user.
    Therefore, ShelfScreen display the list of shelf.

    When the user select a shelf in the list, the key attribute will be used as the key
    to load the async storage it contain.
    For example:
    listOfShelfs: [{name: 'shelf1', key: 'thekey1'}, { name: 'shelf2', key: 'thekey2' }];
    if the user select shelf1, it will load the async storage stored at "thekey1"
    
    The app source code can be quite confusing. There were two Drawer Container.
    Since Shelf Screen (the initial screen will be seen at the app first run) can have functionality
    like: Search... and on the other hand, BookScreen (which include PageOpenScreen) cannot have functionality
    like: Import. So threfore, it has to be seperated IndexNavigation. The main reason of seperation is because
    capturing back button will produce more complicated solution.

*/
import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { contextProvider, createDefaultState, action } from './src/StateAPI';
import RootReducer from './src/StateAPI/RootReducer';

import IndexNavForShelf from './src/IndexNavForShelf';
import IndexNavForBooks from './src/IndexNavForBooks';

export default function App() {
  const [state, dispatch]     = React.useReducer(RootReducer, createDefaultState());

  React.useEffect(() => {
    //This function works by checking the if there was an async storage key stored in the "currentbook" async storage
    //this main purpose is to achieve a feature when the user has selected a shelf, that shelf will
    //immediately loaded after the app was re run
    async function loadCurrentBook() {
      const loadedBook :any = await AsyncStorage.getItem('currentbook');
      if(loadedBook != null) {
        const data = await AsyncStorage.getItem(loadedBook);
        if(data != null) {
          dispatch( action.app.setIsOnBooks(true) );
          dispatch( action.shelf.setSelectedShelfKey(loadedBook) );
          dispatch( action.books.setBooks( JSON.parse(data) ) );
        }
      }
      loadSaveListOfShelf();
    }
    //Load the save states which contains an array of {name :string, key :string}
    async function loadSaveListOfShelf() {
      try {
        const savestate :any = await AsyncStorage.getItem('savestates');
        if(savestate == null) {
          const newListOfShelf = [{ name: 'demo', key: '' + Date.now() }];
          await AsyncStorage.setItem('savestates', JSON.stringify(newListOfShelf));
          dispatch( action.shelf.setList( newListOfShelf ));
        }
        else 
          dispatch( action.shelf.setList( JSON.parse(savestate) ) );
        }
        catch(err) {
          console.error(err);
        }
        dispatch( action.app.doneLoading() );
    }
    loadCurrentBook();
  }, []);

  //This function will be called after async storage has loaded data into the memory
  //to prevent a flicker
  function storageLoaded() {
    if(state.isOnBooks)
      return <IndexNavForBooks />
    else
      return <IndexNavForShelf />
  }
  return (
    <View style={styles.app}>
      <StatusBar barStyle='default'/>
        <contextProvider.Provider value={{state, dispatch}}>
          {
            state.doneloading && storageLoaded()
          }
        </contextProvider.Provider>		
    </View>
  );
}

import GlobalStyle from './src/Utility/GlobalStyles';
const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: GlobalStyle.defaultBackgroundColor
  },
});
