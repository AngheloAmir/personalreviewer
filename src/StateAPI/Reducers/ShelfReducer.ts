/*
    This file is not accessed outside the StateAPI folder except by the App.tsx
*/
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StateInterface, AShelf } from "../index";
import { ActionInterface, actionType } from "../Interface";

export default function ShelfReducer(state :StateInterface, action :ActionInterface) :StateInterface {
    let temp :any;

    switch(action.type) {
        case actionType.setListOfShelf:
            action.payload = action.payload.sort((a: AShelf, b :AShelf) => a.name.localeCompare(b.name));

            return {
                ...state,
                listOfShelfs: action.payload
            }
        
        case actionType.saveCurrentShelf:
            SaveCurrent(state.selectedShelf, JSON.stringify(state.shelf) );
            return state;

        case actionType.addShelfItem:
            temp = [...state.listOfShelfs, action.payload ];
            SaveListOfShelf(temp);
            return {
                ...state,
                listOfShelfs: temp
            }
        
        case actionType.renameShelf:
            temp = state.listOfShelfs.map((item :AShelf, index :number) => {
                if(index == action.index)
                    return {
                        name: action.payload, key: item.key
                    };
                return item;
            });
            SaveListOfShelf(temp);
            return {
                ...state,
                listOfShelfs: temp
            }

        case actionType.deleteShelfItem:
            if(action.index == undefined)
                return state;
            DeleteAShelf( state.listOfShelfs[action.index].key );
            temp = state.listOfShelfs.filter((item :AShelf, index :number) =>  index !== action.index );
            SaveListOfShelf(temp);
            return {
                ...state,
                listOfShelfs: temp
            }
        
        case actionType.setSelectedShelfKey:
            return {
                ...state, selectedShelf: action.payload
            }
    
        default:
            console.error('ACTION NOT DEFINED IN SHELF REDUCER');
            return state;
    }
}

async function SaveCurrent(key :string, data :string) {
    try {
        await AsyncStorage.setItem(key, data );
    }
    catch(err :any) {
      console.error('Failed to save the current shelf. ' + err);
    }
}

async function SaveListOfShelf(stateToSave :Array<AShelf>) {
    try {
        await AsyncStorage.setItem('savestates', JSON.stringify(stateToSave) )
    }
    catch(err :any) {
      console.error('Failed to load the save state. ' + err);
    }
}

async function DeleteAShelf(key :string) {
    try {
        await AsyncStorage.removeItem(key);
    }
    catch(err :any) {
      console.error('Failed to delete a storage. ' + err);
    } 
}
