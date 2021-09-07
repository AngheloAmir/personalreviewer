/*
    * TYPE
        Index - A component that does not display itself

    * DESCRIPTION
        This component set ups the stack navigation screen

    * VISIBLE WHEN
        This component is usually rendered when the app is first started or
        the user choose "Shelfs" in the drawer menu
*/
import * as React from 'react';
import { View } from 'react-native';

import ShelfScreenInitial from './ShelfScreen';
import Topbar from '../TopBar';
import GlobalStyle from '../Utility/GloabalStyles';

export default function ShelfScreenContainer({navigation} :any) {
  
  return (
    <View style={{flex: 1, backgroundColor: GlobalStyle.defaultBackgroundColor,}}>
      <Topbar title='Menu' navigation={navigation} />
      <ShelfScreenInitial />
    </View>
  )
}
