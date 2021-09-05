/*
  The main entry component file.
  * It set up the global state and provide context provider to be used.
  * It display the main view (the initial screen the user would see)
  * Also, it handle the custom made alert box easier.
*/
import React from 'react';
import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AlertBox from './src/Utility/AlertBox';
import { contextProvider, createDefaultState, act } from './src/StateAPI';
import RootReducer from './src/StateAPI/RootReducer';

import IndexNavigation from './src/IndexNavigation';

export default function App() {
  const [state, dispatch]           = React.useReducer(RootReducer, createDefaultState());
  const [msgboxdata, setmsgboxshow] = React.useState({
    ishow: false, title: '', text: ''
  });

  function msgbox(title :string, msg :string) {
    setmsgboxshow({title: title, text: msg, ishow: true})
  }

  React.useEffect(() => {
    async function loadSaveStates() {
      try {
        const savestate = await AsyncStorage.getItem('savestates');
        if(savestate == null) 
          await AsyncStorage.setItem('savestates', JSON.stringify(state) )
        else {
          dispatch( act.setState( JSON.parse(savestate)) );
          console.log( savestate );
        }
      }
      catch(err) {
        console.error('Failed to load the save state ' + err);
      }
    }
    loadSaveStates();
  }, [])

  return (
    <contextProvider.Provider value={{state, dispatch, msgbox}}>
      <StatusBar barStyle='default'/>
      <IndexNavigation />

      <AlertBox
        isshow={msgboxdata.ishow} title={msgboxdata.title} text={msgboxdata.text}
        ok={() => setmsgboxshow({ishow: false, title: '', text: ''})}
      />
      
    </contextProvider.Provider>			
  );
}
