/*
    * TYPE
        Dialog Box - A Dialog Box is a component that over takes the current scene without replacing it.

    * DESCRIPTION
        Show the delete shelf dialog box to user using DialogBox from utilities

    * VISIBLE WHEN
        localState.showDialogDelete is true. When the user select delete in the option menu
*/
import React from 'react';

import AlertBox from '../../Utility/Dialogs/AlertBox';
import { contextProvider, StateAPI, action } from '../../StateAPI';
import { localContextProvider, LocalStateAPI, localAction } from '../localStateAPI';

interface propsReceive {
    isOnBooks           :boolean;
    currentItemName     :string;
}

export default function ConfirmDelete(props :propsReceive) {
    const { state, dispatch } :StateAPI = React.useContext(contextProvider);
    const { localState, localDispatch } :LocalStateAPI = React.useContext(localContextProvider);

    function handleDelete() {
        if(props.isOnBooks) 
            dispatch( action.books.deleteBook( state.selectedBook ));
        else
            dispatch( action.books.deletePage( state.selectedPage ));
        localDispatch(localAction.showDialogDelete(false));

        //Save the current shelf into the async storage. it requires to be timeout
        setTimeout(() => dispatch(action.shelf.saveCurrentShelf()), 100);
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
