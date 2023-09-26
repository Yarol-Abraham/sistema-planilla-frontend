import { Reducer } from "react";
import { ACTION, CREATE_FAIL, CREATE_SUCCESS } from "../../types/user/userTypes";
import { props } from "../../models/user/userProps";

const UserReducer: Reducer<props, ACTION> = (state: props, action: ACTION)=> {

    switch(action.type)
    {
        case CREATE_FAIL:
        case CREATE_SUCCESS:
            return {
                ...state,
                usuarioResponse: action.payload.usuarioResponse
            }

        default:
            return state;

    }

}

export default UserReducer;
