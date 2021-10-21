/*
    * TYPE
        Dialog Box - A Dialog Box is a component that over takes the current scene without replacing it.

    * DESCRIPTION
        Show the add new dialog and handle the functionality

    * VISIBLE WHEN
        localState.showDialogAdd is true, which is set by
        localDispatch(localAction.showDialogAdd(....)). After the user tap (add new) icon
*/
import React from 'react';

import { contextProvider, StateAPI, action } from '../../StateAPI';
import { LocalStateAPI, localContextProvider, localAction } from '../localStateAPI';
import TextfieldBox from '../../Utility/Dialogs/TextfieldBox';

interface propsReceive {
    isOnBooks   :boolean;
}

export default function AddNew(props :propsReceive) {
    const { dispatch } :StateAPI = React.useContext(contextProvider);
    const { localState, localDispatch } :LocalStateAPI = React.useContext(localContextProvider);

    function handleAdd(name :string) {
        if(name.length > 22 )
            name = name.substr(0, 21);
        localDispatch( localAction.showDialogAdd(false) );
        if(props.isOnBooks)
            dispatch( action.books.addBook(name) );
        else
            dispatch( action.books.addPage(name) );

    //Save the current shelf into the async storage. it requires to be timeout
        setTimeout(() => dispatch(action.shelf.saveCurrentShelf()), 100);
    }

    return (
        <TextfieldBox
            title={ props.isOnBooks ? 'Add new book' : 'Add new page' }
            show={localState.showDialogAdd}
            ok={handleAdd}
            cancel={() => localDispatch( localAction.showDialogAdd(false))}
            display={'Enter the name'}
        />
    );
}
