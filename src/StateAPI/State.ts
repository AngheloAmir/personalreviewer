/*
    This file is not accessed outside the StateAPI folder.
    Set up the initial state of the application
*/
import React from 'react';
import { StateInterface } from './index';

export const ContextProvider :React.Context<any> = React.createContext(null);

export function CreateDefaultState() :StateInterface{
    return {
        text: 'Hello World!',
        mydata: [
            {
                name:   'sample1',
                date:   'jan 01',
                lastmod: 'jan 01',
                data: {
                    content: 'Et enim ipsum ut ex excepteur et aliqua dolore laborum nostrud nisi fugiat.'
                }
            },
            {
                name:   'sample2',
                date:   'jan 01',
                lastmod: 'jan 01',
                data: {
                    content: 'Et enim ipsum ut ex excepteur et aliqua dolore laborum nostrud nisi fugiat.'
                }
            },
            {
                name:   'sample3',
                date:   'jan 01',
                lastmod: 'jan 01',
                data: {
                    content: 'Et enim ipsum ut ex excepteur et aliqua dolore laborum nostrud nisi fugiat. Et enim ipsum ut ex excepteur et aliqua dolore laborum nostrud nisi fugiat.'   
                }
            }
        ]
    }
}
