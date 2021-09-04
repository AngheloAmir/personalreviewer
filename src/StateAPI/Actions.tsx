/*
    This file is not accessed outside the StateAPI folder.
*/
import { ActionInterface, actionType } from "./Interface"

const Action = {
    test: () :ActionInterface => {
        return {
            type: actionType.test
        }
    },


}
export default Action;
