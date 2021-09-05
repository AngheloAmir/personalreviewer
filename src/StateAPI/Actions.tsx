/*
    This file is not accessed outside the StateAPI folder.
*/
import { ActionInterface, actionType } from "./Interface";
import { StateInterface } from "./index";

const Action = {
    setState: (newstate :StateInterface) :ActionInterface => {
        return {
            type: actionType.setState,
            payload: newstate
        }
    },


}
export default Action;
