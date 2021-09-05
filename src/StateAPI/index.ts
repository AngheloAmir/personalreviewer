/*
    Provides the state (context provider), interface, and mechanism to control the
    current global state of the app.
*/
import React from 'react';
import { ContextProvider, CreateDefaultState } from './State';
import { ActionInterface } from './Interface';
import Actions from './Actions'

export const createDefaultState     = () => CreateDefaultState();

export const contextProvider        = ContextProvider;
export const act                    = Actions;

export interface StateAPI {
    state     :StateInterface;
    dispatch  :React.Dispatch< ActionInterface >;
    msgbox    :(title :string, msg :string) => void;
}

export  interface StateInterface {
    listOfShelfs        :Array<string>; //Array of shelf name to be used as the async storage key
    selectedShelf       :string;        //the name of the shelf to be loaded

    shelf?              :Array<Book>;
}

export interface Book {
    name        :string;
    date        :string;
    lastmod     :string;
    files       :Array<File>;
}

export interface File {
    name        :string;
    date        :string;
    lastmod     :string;
    content     :any;
}
