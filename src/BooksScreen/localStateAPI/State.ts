/*
    The local state in the book screen. It is created so the functionality between BookScreen
    and PageScreen is shared, which avoid reduntant functionality
*/
import React from 'react';
import { LocalStateInterface } from './';

export const LocalContextProvider :React.Context<any> = React.createContext(null);
export function CreateDefaultState() :LocalStateInterface {
    return {
        showDialogAdd:      false,
        showDialogOption:   false,
        showDialogRename:   false,
        showDialogDelete:   false,
        showDialogInfo:     false,
        infoText:           ''
    }
}
