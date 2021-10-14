/*
    Defines the state, action and interface availble to be used to control the local state.

EXAMPLE USAGE====================================================================================
    import { localContextProvider, action, LocalStateAPI } from '.......localStateAPI';
    import { useContext } from 'react';
    import { View, Text } from 'react-native';

    export default function component() {
        const [localState, localDispatch] :LocalStateAPI = React.useContext(localContextProvider);
        return (
            <View>
                <Text>Selected book index: {localState.selectedBook}</Text>
                <Button title="increament selected book" onpress={() => {
                    dispatch( action.selectedBook(localState.selectedBook + 1) );
                }}
            </View>
        )
    }
*/
import React from 'react';
import { LocalContextProvider, CreateDefaultState } from "./State";
import { ActionInterface } from './Interface';
import Actions from './Action'
import RootReducer from './RootReducer';

export const createDefaultState     = () => CreateDefaultState();
export const localContextProvider   = LocalContextProvider;
export const localAction                 = Actions;
export const rootReducer            = RootReducer;

export interface LocalStateAPI {
    localState     :LocalStateInterface;
    localDispatch  :React.Dispatch< ActionInterface >;
}

export interface LocalStateInterface {
    showDialogAdd       :boolean;
    showDialogOption    :boolean;
    showDialogRename    :boolean;
    showDialogDelete    :boolean;
    showDialogInfo      :boolean,
    infoText            :string;
}
