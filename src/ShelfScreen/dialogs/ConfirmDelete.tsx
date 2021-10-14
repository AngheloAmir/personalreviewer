/*
    * TYPE
        Dialog Box - A Dialog Box is a component that over takes the current scene without replacing it.

    * DESCRIPTION
        Show the delete shelf dialog box to user using DialogBox from utilities

    * VISIBLE WHEN
        The user pressed the three dot (option) and choose the "delete shelf" in the dialog that appear
*/
import React from 'react';
import { contextProvider, StateAPI, action } from '../../StateAPI';
import AlertBox from '../../Utility/Dialogs/AlertBox';

interface propsReceive {
    shelfname   :string;
    index       :number;
    show        :boolean;
    onclose     :() => void;
}

export default function ConfirmDelete(props :propsReceive) {
   const { dispatch } :StateAPI    = React.useContext(contextProvider);

    function handleOnOk() {
        dispatch( action.shelf.delete(props.index) );
        props.onclose();
    }

    return (
        <AlertBox
            title={'Delete ' + props.shelfname + '?'}
            isshow={props.show}
            ok={handleOnOk}
            cancel={props.onclose}
            text={'Pernamently DELETE ' + props.shelfname + ' and its content?' }
        />
    );
}
