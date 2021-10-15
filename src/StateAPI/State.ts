/*
    This file is not accessed outside the StateAPI folder.
    Set up the initial state of the application
*/
import React from 'react';
import { StateInterface } from './index';
import Functions from './Functions';

export const ContextProvider :React.Context<any> = React.createContext(null);

export function CreateDefaultState() :StateInterface {
    return {
        listOfShelfs: [],
        selectedShelf: '?',

        shelf: [
            //Functions.createBook('sample 1'),
            //Functions.createBook('sample 2')
        ],
        isOnBooks: true,
        selectedBook: 0,
        selectedPage: 0,
    }
}
