import React from 'react';

export const contextProvider :React.Context<any> = React.createContext(null);

export function createDefaultState() {
    return {
        text: 'Hello World!',
    }
}
