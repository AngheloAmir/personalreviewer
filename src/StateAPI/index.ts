/*
    Provides the state (context provider), interface, and mechanism to control the
    current global state of the app.
*/
import React from 'react';
import { ContextProvider, CreateDefaultState } from './State';
import { ActionInterface } from './Interface';
import Actions from './Actions'

export const contextProvider        = ContextProvider;
export const createDefaultState     = () => CreateDefaultState();
export const act                    = Actions;

export interface StateAPI {
    state     :StateInterface;
    dispatch  :React.Dispatch< ActionInterface >;
    msgbox    :(title :string, msg :string) => void;
}

//define the structure of the state
export  interface StateInterface {
    text    :string;
    mydata  :Array<AData>;
}

//a data can be a file or a folder
export interface AData {
    name        :string;
    date        :string;    //date created
    lastmod     :string;    //last modified
    isFolder?   :boolean;   //false or undefined for regular file
    data        :ANote | Array<AData>;
}

export interface ANote {
    content     :string;
}
