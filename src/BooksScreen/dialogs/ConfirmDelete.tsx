/*
    * TYPE
        Dialog Box - A Dialog Box is a component that over takes the current scene without replacing it.

    * DESCRIPTION
        Show the delete shelf dialog box to user using DialogBox from utilities

    * VISIBLE WHEN
        
*/
import React from 'react';

import AlertBox from '../../Utility/Dialogs/AlertBox';
import { contextProvider, StateAPI, action } from '../../StateAPI';
import { localContextProvider, LocalStateAPI, localAction } from '../localStateAPI';

interface propsReceive {
    currentItemIndex     :number;
    currentItemName      :string;
}

export default function ConfirmDelete(props :propsReceive) {
    const { localState, localDispatch } :LocalStateAPI = React.useContext(localContextProvider);

    function handleDelete() {
        console.log('.....Deleting......');
        localDispatch(localAction.showDialogDelete(false));
    }

    return (
        <AlertBox
            title={'Delete ' + props.currentItemName + '?'}
            isshow={localState.showDialogDelete}
            text={'Are you sure to delete ' + props.currentItemName + '?'}
            ok={handleDelete}
            cancel={() => localDispatch(localAction.showDialogDelete(false)) }
        />
    )
}
