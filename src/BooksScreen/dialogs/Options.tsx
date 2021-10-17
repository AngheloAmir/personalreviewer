/*
    * TYPE
        Dialog Box - A Dialog Box is a component that over takes the current scene without replacing it.

    * DESCRIPTION
        Show option dialog box to the user screen

    * VISIBLE WHEN
        The user pressed the ... in the right side of the shelf name. This dialog is shared and will be used by the
        BookScreen and PageScreen component.
*/
import React from 'react';

import { localContextProvider, LocalStateAPI, localAction } from '../localStateAPI';
import OptionBox from '../../Utility/Dialogs/OptionBox';
import { StateAPI, contextProvider, action} from '../../StateAPI';

interface propsReceive {
    isOnBooks            :boolean;
    currentItemName      :string;
}

export default function OptionsDialog(props :propsReceive) {
    const { state, dispatch } :StateAPI = React.useContext(contextProvider);
    const { localState, localDispatch } :LocalStateAPI = React.useContext(localContextProvider);

    return (
        <OptionBox
            title={'What to do with ' + props.currentItemName + '?'}
            isshow={localState.showDialogOption}
            cancel={() => localDispatch( localAction.showDialogOption(false)) }
            list={[
                { text: 'Info',         iconname: 'information' },
                { text: 'Rename',       iconname: 'rename-box' },
                { text: 'Delete',       iconname: 'delete-forever' },
                //{ text: 'Move Up',      iconname: 'arrow-up-circle' },
                //{ text: 'Move Down',    iconname: 'arrow-down-circle' },
                { text: 'Sort',         iconname: 'sort-alphabetical-ascending' },
            ]}
            onSelect={(text :string) => {
                switch(text) {
                    case 'Info':
                        const info = props.isOnBooks ?
                            `Created: ${state.shelf[state.selectedBook].date} \n` +
                            `Last Modified: ${state.shelf[state.selectedBook].lastmod}` :
                            `Created: ${state.shelf[state.selectedBook].files[state.selectedPage].date}\n` +
                            `Last Modifled: ${state.shelf[state.selectedBook].files[state.selectedPage].lastmod}`;
                        localDispatch( localAction.setDialogInfo(true, info));
                        break;
                    case 'Rename':
                        localDispatch( localAction.showDialogRename(true));
                        break;
                    /*
                    case 'Move Up':
                        console.log('Pressed up');
                        break;
                    case 'Move Down':
                        console.log('Pressed down');
                        break;
                    */
                    case 'Sort':
                        if( props.isOnBooks )
                            dispatch( action.books.sortBooks() );
                        else
                            dispatch( action.books.sortPages() );

                        //Save the current shelf into the async storage. it requires to be timeout
                        setTimeout(() => dispatch(action.shelf.saveCurrentShelf()), 100);
                        break;
                    case 'Delete':
                        localDispatch( localAction.showDialogDelete(true))
                        break;
                    default:
                        break;
                }
            }}
        />
    );
}
