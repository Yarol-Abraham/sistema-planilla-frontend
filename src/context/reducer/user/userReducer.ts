import { Reducer } from "react";
import { ACTION, GET_USER, USER_FAIL,  USER_SUCCESS, DISABLE_FAIL, DISABLE_USER, LIST_USER_FAIL, LIST_USER_SUCCESS } from "../../types/user/userTypes";
import { props, initialState } from "../../models/user/userProps";
import { Usuario } from "../../models/user/user";

const UserReducer: Reducer<props, ACTION> = (state: props, action: ACTION)=> {

    switch(action.type)
    {
        case DISABLE_FAIL:
        case USER_FAIL:
            return {
                ...state,
                usuarioResponse: action.payload.usuarioResponse
            }
        
        case DISABLE_USER:    
        case USER_SUCCESS:
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
        
        case GET_USER:
            let userFilter = state.listUsuarioResponse.usuarios.filter( usuario => usuario.idUsuario == action.payload.idUsuario);
            let usuario: Usuario = userFilter.length > 0 ? userFilter[0] : initialState.usuario;
            return {
                ...state,
                usuario
            }

        default:
            return state;
    }

}

export default UserReducer;
