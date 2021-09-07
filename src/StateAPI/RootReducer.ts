/*
    This file is not accessed outside the StateAPI folder except by the App.tsx
*/
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StateInterface, AShelf } from "./index";
import { ActionInterface, actionType } from "./Interface";

export default function RootReducer(state :StateInterface, action :ActionInterface) :StateInterface {
    switch(action.type) {
        case actionType.setListOfShelf:
            return {
                ...state,
                listOfShelfs: action.payload
            }
        
        case actionType.addShelfItem:
            const listOfShelfs :Array<AShelf> = [...state.listOfShelfs, action.payload ];
            SaveListOfShelf(listOfShelfs);
            return {
                ...state,
                listOfShelfs: listOfShelfs
            }

        default:
            console.error('ACTION NOT DEFINED IN THE REDUCER');
            return state;
    }
}

async function SaveListOfShelf(stateToSave :Array<AShelf>) {
    try {
        await AsyncStorage.setItem('savestates', JSON.stringify(stateToSave) )
    }
    catch(err :any) {
      console.error('Failed to load the save state ' + err);
    }
}
