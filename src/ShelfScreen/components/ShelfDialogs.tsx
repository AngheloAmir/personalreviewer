/*
    * TYPE
        Fragment of src/ShelfScreen/index - A fragment is a piece of component that is
            part of a scene

    * DESCRIPTION
        Contained all of the dialog boxes that will appear in the Shelf screen

    * VISIBLE WHEN
        This alway visible however, it children will be visible based on the condition of some variables
*/
import React from 'react';
import { View } from 'react-native';

import AddNewShelf      from '../dialogs/AddNewShelf';
import Options          from '../dialogs/Options';  
import RenameShelf      from '../dialogs/RenameShelf';
import ConfirmDelete    from '../dialogs/ConfirmDelete';
import InfoBox          from '../../Utility/Dialogs/InfoBox';

interface propsReceive {
   currentItem              :{name: string, index: number};
   setItem                  :(item :{name: string, index: number}) => void;
   isShowAddDialog          :boolean;
   isShowOptionDialog       :boolean;
   isRenameOptionDialog     :boolean;
   isConfirmDeleteDialog    :boolean;
   setShowAddDialog         :(show :boolean) => void;
   setShowOptionDialog      :(show :boolean) => void;
   setRenameDialog          :(show :boolean) => void;
   setConfirmDelete         :(show :boolean) => void;
   onExport                 :() => void;
   exportmsg                :{show  :boolean, title :string, msg :string};
   setexportmsg             :(exportmsg :{show :boolean, title :string, msg :string}) => void;
}

export default function ShelfScreen(props :propsReceive) {
    return (
        <View style={{position: 'absolute'}}>
            <AddNewShelf
                show={props.isShowAddDialog}
                cancel={() => props.setShowAddDialog(false)}
                ok={() =>     props.setShowAddDialog(false)}
            />
            <Options
                show={props.isShowOptionDialog}
                currentItemIndex={props.currentItem.index}
                currentItemName={props.currentItem.name}
                cancel={() => props.setShowOptionDialog(false)}
                onRenameSelect={() => props.setRenameDialog(true)}
                onDeleteSelect={() => props.setConfirmDelete(true)}
                onExport={() => props.onExport() }
            /> 
            <RenameShelf
                show={props.isRenameOptionDialog}
                shelfname={props.currentItem.name}
                index={props.currentItem.index}
                onclose={() => props.setRenameDialog(false)}
            />
            <ConfirmDelete
                show={props.isConfirmDeleteDialog}
                shelfname={props.currentItem.name}
                index={props.currentItem.index}
                onclose={() => props.setConfirmDelete(false)}
            />
            <InfoBox
                isshow={props.exportmsg.show}
                title={props.exportmsg.title}
                text={props.exportmsg.msg}
                ok={() => props.setexportmsg({show: false, title: '', msg: ''})}
            />
        </View>
    );
}
