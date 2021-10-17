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

import { contextProvider, StateAPI } from '../StateAPI';
import Topbar from '../TopBar';
import GlobalStyle from '../Utility/GlobalStyles';
import ListOfShelfs     from './components/ListOfShelf';
import ShelfDialogs     from './components/ShelfDialogs';

export default function Index({navigation} :any) {
  const { state } :StateAPI = React.useContext(contextProvider);
  const [currentItem, setItem]                    = React.useState({name: '', index: 0});
  const [isShowAddDialog, setShowAddDialog]       = React.useState(false);
  const [isShowOptionDialog, setShowOptionDialog] = React.useState(false);
  const [isRenameOptionDialog, setRenameDialog]   = React.useState(false);
  const [isConfirmDeleteDialog, setConfirmDelete] = React.useState(false);

  React.useEffect(() => {
    //In order to acheive an effect of switching to Bookscreen if the user prevously selected a book
    //when the app is lunch again. Immediately navigate to Books screen.
    //It may quite confusion but this is made in order to achieve that effect.
    //This component use state.doneloading to prevent a sudden flicker from screen change
    if(state.isOnBooks && !state.doneloading)
      navigation.jumpTo('Books');
  });

  return (
    <View style={{backgroundColor: GlobalStyle.defaultBackgroundColor}}>
      { state.doneloading &&
        <View>
          <Topbar title='Menu' navigation={navigation} />
          <ListOfShelfs
              navigation={navigation}
              setShowOptionDialog={(show) => setShowOptionDialog(show)}
              setItem={setItem}
              setShowAddDialog={(show) => setShowAddDialog(show)}
          />
          <ShelfDialogs
            currentItem={currentItem}
            setItem={setItem}
            isShowAddDialog={isShowAddDialog}
            isShowOptionDialog={isShowOptionDialog}
            isRenameOptionDialog={isRenameOptionDialog}
            isConfirmDeleteDialog={isConfirmDeleteDialog}
            setShowAddDialog={setShowAddDialog}
            setShowOptionDialog={setShowOptionDialog}
            setRenameDialog={setRenameDialog}
            setConfirmDelete={setConfirmDelete}
        />
        </View>
      }
    </View>
  )
}
