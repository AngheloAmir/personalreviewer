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

import ExportAFile from '../!NavDrawerScreens/Functions/Export';

export default function Index({navigation} :any) {
  const { state } :StateAPI                       = React.useContext(contextProvider);
  const [currentItem, setItem]                    = React.useState({name: '', index: 0});
  const [isShowAddDialog, setShowAddDialog]       = React.useState(false);
  const [isShowOptionDialog, setShowOptionDialog] = React.useState(false);
  const [isRenameOptionDialog, setRenameDialog]   = React.useState(false);
  const [isConfirmDeleteDialog, setConfirmDelete] = React.useState(false);
  const [exportmsg, setexportmsg]                 = React.useState({show :false, title: '', msg: ''});

  async function handleOnExport() {
    const msg = await ExportAFile(currentItem.name, state.listOfShelfs[currentItem.index].key);
    if( msg.error )
      setexportmsg({show: true, title: 'Error', msg: msg.message });
    else 
      setexportmsg({show: true, title: 'Exporting done', msg: msg.message });
  }

  return (
    <View style={{backgroundColor: GlobalStyle.defaultBackgroundColor}}>
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
            onExport={handleOnExport}
            exportmsg={exportmsg}
            setexportmsg={setexportmsg}
        />
        </View>
    </View>
  )
}
