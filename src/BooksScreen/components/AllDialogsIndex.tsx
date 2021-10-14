/*
    * TYPE
        Fragment of src/BookScreen/index - A fragment is a piece of component that is
            part of a scene

    * DESCRIPTION
        Contained all of the dialog boxes that will appear in the Book screen while providing the
        actual action to each dialogs

    * VISIBLE WHEN
        This alway visible however, it children will be visible based on the condition of some variables
*/
import React from 'react';
import { View } from 'react-native';

import { contextProvider, StateAPI } from '../../StateAPI';
import { localContextProvider, LocalStateAPI, localAction } from '../localStateAPI';

import InfoBox          from '../../Utility/Dialogs/InfoBox';
import OptionsDialog    from '../dialogs/Options';
import ConfirmDelete    from '../dialogs/ConfirmDelete';
import RenameItem       from '../dialogs/RenameItem';
import AddNew           from '../dialogs/AddNew';

export default function AllDialogsIndex({isOnBooks} :any) {
    const { state } : StateAPI = React.useContext(contextProvider);
    const { localState, localDispatch } :LocalStateAPI = React.useContext(localContextProvider);

    const currentItemIndex = isOnBooks ? state.selectedBook : state.selectedPage;
    let currentItemName = '';
    try {
        currentItemName = isOnBooks ?
            state.shelf[state.selectedBook].name
            :
            state.shelf[state.selectedBook].files[state.selectedPage].name;
    }
    catch(err) {
        currentItemName = 'empty'
    }

    return (
        <View style={{position: 'absolute'}}>
            <OptionsDialog
                currentItemIndex={currentItemIndex}
                currentItemName={currentItemName}
            />
            <InfoBox
                title={'Info'}
                scroll={false}
                text={localState.infoText}
                isshow={localState.showDialogInfo}
                ok={() => localDispatch( localAction.setDialogInfo(false)) }
            />
            <RenameItem
                currentItemIndex={currentItemIndex}
                currentItemName={currentItemName}
            />
            <ConfirmDelete
                currentItemIndex={currentItemIndex}
                currentItemName={currentItemName}
            />
            <AddNew
                isOnBooks={isOnBooks}
            />
        </View>
    );
}
