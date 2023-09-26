import { 
    SESSIONINFORMATION_SUCCESS,
    SESSIONINFORMATION_FAIL,
    GET_PERFIL,
    ACTION,
    UPDATE_PERFIL
} from "../types/authenticationType";

import { props } from "../inteface/sessionInformation/sessionInformationProps";
import { Reducer } from "react";

const AuthenticationReducer: Reducer<props,ACTION> = (state: props, action: ACTION) => {

    switch (action.type) 
    {
        case SESSIONINFORMATION_SUCCESS:
        case SESSIONINFORMATION_FAIL:
            return {
                ...state,
                sessionInformationResponse: action.payload.sessionInformationResponse
            }

        case UPDATE_PERFIL:
            return {
                ...state,
                usuarioResponse: action.payload.usuarioResponse,
                sessionInformationResponse: {
                    ...state.sessionInformationResponse,
                    strNombre: action.payload.usuarioResponse.entUsuario.nombre +" "+  action.payload.usuarioResponse.entUsuario.apellido
                }
            }

        case GET_PERFIL:
            return {
                ...state,
                usuarioResponse: action.payload.usuarioResponse
            }
    
        default:
            return state;
    }
}

export default AuthenticationReducer;