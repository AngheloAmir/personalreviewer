/*
  The main entry component file.
  * It set up the global state and provide context provider to be used.
  * It display the main view (the initial screen the user would see)
  * Also, it handle the custom made alert box easier.
*/
import React from 'react';
import { StatusBar } from 'react-native';

import AlertBox from './src/Utility/AlertBox';
import { contextProvider, createDefaultState } from './src/StateAPI';
import RootReducer from './src/StateAPI/RootReducer';

import IndexNavigation from './src/IndexNavigation';

export default function App() {
  const [state, dispatch]             = React.useReducer(RootReducer, createDefaultState());
  const [msgboxdata, setmsgboxshow] = React.useState({
    ishow: false, title: '', text: ''
  });

  function msgbox(title :string, msg :string) {
    setmsgboxshow({title: title, text: msg, ishow: true})
  }

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
