/*
    Provides the state (context provider), interface, and mechanism to control the
    current global state of the app.
*/
import React from 'react';
import { ContextProvider, CreateDefaultState } from './State';
import { ActionInterface } from './Interface';
import Actions from './Actions'
import functions from './Functions';

export const createDefaultState     = () => CreateDefaultState();
export const contextProvider        = ContextProvider;
export const action                 = Actions;
export const statefunction          = functions;

export interface StateAPI {
    state     :StateInterface;
    dispatch  :React.Dispatch< ActionInterface >;
}

export  interface StateInterface {
    listOfShelfs    :Array<AShelf>;
    selectedShelf   :string; //the name of the shelf to be loaded
    shelf?          :Array<Book>;
}

export interface AShelf {
    name  :string;
    key   :string;
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
