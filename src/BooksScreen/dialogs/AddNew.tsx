/*
    * TYPE
        Dialog Box - A Dialog Box is a component that over takes the current scene without replacing it.

    * DESCRIPTION
        

    * VISIBLE WHEN
        
*/
import React from 'react';

import { contextProvider, StateAPI, action } from '../../StateAPI';
import { LocalStateAPI, localContextProvider, localAction } from '../localStateAPI';
import TextfieldBox from '../../Utility/Dialogs/TextfieldBox';

interface propsReceive {
    isOnBooks   :boolean;
}

export default function AddNew(props :propsReceive) {
    const { localState, localDispatch } :LocalStateAPI = React.useContext(localContextProvider)

    function handleAdd() {
        localDispatch( localAction.showDialogAdd(false) );
        console.log('Adding');
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
