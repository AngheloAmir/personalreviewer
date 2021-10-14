/*
    * TYPE
        Dialog Box - A Dialog Box is a component that over takes the current scene without replacing it.

    * DESCRIPTION
        Show the add new shelf dialog box to user using DialogBox from utilities

    * VISIBLE WHEN
        The user pressed add shelf button in the screen
*/
import React from 'react';
import { contextProvider, StateAPI, action } from '../../StateAPI';
import TextfieldBox from '../../Utility/Dialogs/TextfieldBox';

interface propsReceive {
    show    :boolean;
    cancel  :() => void;
    ok      :() => void;
}

export default function AddNewShelfDialog(props :propsReceive) {
    const { dispatch } :StateAPI    = React.useContext(contextProvider);

    function handleOnOk(text :string) {
        dispatch( action.shelf.add({name: text, key: '' + Date.now() }) );
        props.ok();
    }

    return (
        <TextfieldBox
            title='Add New Shelf'
            display='Please enter new shelf name: '
            show={props.show}
            ok={handleOnOk}
            cancel={() => props.cancel()}
        />
    );
}
