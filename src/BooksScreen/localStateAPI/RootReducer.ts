/*
*/
import { actionType, ActionInterface } from "./Interface";
import { LocalStateInterface } from ".";

export default function RootReducer( state :LocalStateInterface, action :ActionInterface) :LocalStateInterface {
    switch( action.type ) {
        case actionType.showDialogOption:
            return {
                ...state, showDialogOption: action.payload
            };

        case actionType.showDialogAdd:
            return {
                ...state, showDialogAdd: action.payload, showDialogOption: false
            };

        case actionType.showDialogDelete:
        return {
            ...state, showDialogDelete: action.payload, showDialogOption: false
        };
            
        case actionType.showDialogRename:
            return {
                ...state, showDialogRename: action.payload, showDialogOption: false
            }

        case actionType.showDialogInfo: 
            return {
                ...state,
                showDialogInfo: action.payload.show,
                infoText: action.payload.text
            }

        default:
            console.log('Action not defined in the root reducer');
            return state;
    }
}
