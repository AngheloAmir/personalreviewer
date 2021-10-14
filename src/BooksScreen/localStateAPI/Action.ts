/*
    Define the available actions that will be used to manupulate local state
*/
import { ActionInterface, actionType} from "./Interface"

const Actions = {
    showDialogAdd: (isShow :boolean) :ActionInterface => {
        return {
            type: actionType.showDialogAdd, payload: isShow
        }
    },
    showDialogOption: (isShow :boolean) :ActionInterface => {
        return {
            type: actionType.showDialogOption, payload: isShow
        }
    },
    showDialogRename: (isShow :boolean) :ActionInterface => {
        return {
            type: actionType.showDialogRename, payload: isShow
        }
    },
    showDialogDelete: (isShow :boolean) :ActionInterface => {
        return {
            type: actionType.showDialogDelete, payload: isShow
        }
    },
    setDialogInfo: (isShow :boolean, text? :string) :ActionInterface => {
        return {
            type: actionType.showDialogInfo, payload: {
                show: isShow,
                text: text ? text : ''
            }
        }
    },
}
export default Actions;
