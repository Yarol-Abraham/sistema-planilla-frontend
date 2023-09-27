import { Reducer } from "react";
import { ACTION, CREATE_FAIL, CREATE_SUCCESS, DISABLE_FAIL, DISABLE_USER, LIST_USER_FAIL, LIST_USER_SUCCESS } from "../../types/user/userTypes";
import { props } from "../../models/user/userProps";

const UserReducer: Reducer<props, ACTION> = (state: props, action: ACTION)=> {

    switch(action.type)
    {
        case DISABLE_FAIL:
        case CREATE_FAIL:
            return {
                ...state,
                usuarioResponse: action.payload.usuarioResponse
            }
        
        case DISABLE_USER:    
        case CREATE_SUCCESS:
            return {
                ...state,
                usuarioResponse: action.payload.usuarioResponse,
                listUsuarioResponse: action.payload.listUsuarioResponse
            }

        case LIST_USER_FAIL:    
        case LIST_USER_SUCCESS:
        return {
            ...state,
            listUsuarioResponse: action.payload.listUsuarioResponse
        }
        
        default:
            return state;

    }

}

export default UserReducer;
