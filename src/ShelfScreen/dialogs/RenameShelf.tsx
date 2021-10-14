/*
    * TYPE
        Dialog Box - A Dialog Box is a component that over takes the current scene without replacing it.

    * DESCRIPTION
        Show the rename shelf dialog box to user using DialogBox from utilities

    * VISIBLE WHEN
        The user pressed the three dot (option) and choose the "rename shelf" in the dialog that appear
*/
import React from 'react';
import { contextProvider, StateAPI, action } from '../../StateAPI';
import TextfieldBox from '../../Utility/Dialogs/TextfieldBox';

interface propsReceive {
    shelfname   :string;
    index       :number;
    show        :boolean;
    onclose     :() => void;
}

export default function RenameShelf(props :propsReceive) {
    const { dispatch } :StateAPI    = React.useContext(contextProvider);

    function handleOnOk(text :string) {
        dispatch( action.shelf.rename(text, props.index) );
        props.onclose();
    }

    return (
        <TextfieldBox
            title={'Rename ' + props.shelfname}
            show={props.show}
            ok={handleOnOk}
            cancel={props.onclose}
            display={'Enter new name'}
            initialText={props.shelfname}
        />
    );
}
