/*
    This file is not accessed outside the StateAPI folder except by the App.tsx
*/
import { act, StateInterface } from "./index";
import { ActionInterface, actionType } from "./Interface";

export default function RootReducer(state :StateInterface, action :ActionInterface) :StateInterface {
    switch(action.type) {
        case actionType.setState:
            return action.payload;
        
        default:
            console.error('ACTION NOT DEFINED IN THE REDUCER');
            return state;
    }
}
