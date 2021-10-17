/*
    This file is not accessed outside the StateAPI folder except by the App.tsx
*/
import { StateInterface } from "../index";
import { ActionInterface, actionType, } from "../Interface";


export default function AppReducer(state :StateInterface, action :ActionInterface) :StateInterface {
    switch(action.type) {
         case actionType.doneLoading:
            return {
                ...state,
                doneloading: true,
            }
        
        case actionType.setIsOnBooks:
            return {
                ...state,
                isOnBooks: action.payload
            }
            
        default:
            console.error('ACTION NOT DEFINED IN THE APP REDUCER');
            return state;
    }
}
