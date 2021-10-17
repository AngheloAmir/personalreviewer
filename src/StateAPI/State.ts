/*
    This file is not accessed outside the StateAPI folder.
    Set up the initial state of the application
*/
import React from 'react';
import { StateInterface } from './index';

export const ContextProvider :React.Context<any> = React.createContext(null);

export function CreateDefaultState() :StateInterface {
    return {
        listOfShelfs: [],
        selectedShelf: '?',

        shelf: [
        ],

        isOnBooks: false,
        selectedBook: 0,
        selectedPage: 0,

        doneloading: false,
    }
}
