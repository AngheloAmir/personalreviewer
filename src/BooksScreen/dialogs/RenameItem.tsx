/*
    * TYPE
        Dialog Box - A Dialog Box is a component that over takes the current scene without replacing it.

    * DESCRIPTION
        Show and handle the rename dialog box functionality

    * VISIBLE WHEN
        The user taps rename in the option menu
*/
import React from 'react';
import TextfieldBox from '../../Utility/Dialogs/TextfieldBox';
import { contextProvider, StateAPI, action } from '../../StateAPI';
import { LocalStateAPI, localContextProvider, localAction } from '../localStateAPI';

interface propsReceive {
    isOnBooks           :boolean;
    currentItemName     :string;
}

export default function RenameItem(props :propsReceive) {
    const { state, dispatch } :StateAPI    = React.useContext(contextProvider);
    const { localState, localDispatch } :LocalStateAPI = React.useContext(localContextProvider)

    function handleOnOk(text :string) {
        if( props.isOnBooks )
            dispatch( action.books.renameBook(text, state.selectedBook));
        else
            dispatch( action.books.renamePage(text, state.selectedPage));

        localDispatch( localAction.showDialogRename(false));
        //Save the current shelf into the async storage. it requires to be timeout
        setTimeout(() => dispatch(action.shelf.saveCurrentShelf()), 100);
    }

    const title = 'Rename  ' + props.currentItemName;

    return (
        <TextfieldBox
            title={title}
            show={localState.showDialogRename}
            ok={handleOnOk}
            cancel={() => localDispatch( localAction.showDialogRename(false))}
            display={'Enter new name'}
            initialText={props.currentItemName}
        />
    );
}
