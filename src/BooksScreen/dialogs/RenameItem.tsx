/*
    * TYPE
        Dialog Box - A Dialog Box is a component that over takes the current scene without replacing it.

    * DESCRIPTION
        

    * VISIBLE WHEN
        
*/
import React from 'react';
import TextfieldBox from '../../Utility/Dialogs/TextfieldBox';
import { contextProvider, StateAPI, action } from '../../StateAPI';
import { LocalStateAPI, localContextProvider, localAction } from '../localStateAPI';

interface propsReceive {
    currentItemIndex    :number;
    currentItemName     :string;
}

export default function RenameItem(props :propsReceive) {
    //const { state, dispatch } :StateAPI    = React.useContext(contextProvider);
    const { localState, localDispatch } :LocalStateAPI = React.useContext(localContextProvider)

    function handleOnOk(text :string) {
       console.log('Renamed');
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
