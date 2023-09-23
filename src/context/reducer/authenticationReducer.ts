import { 
    SESSIONINFORMATION_SUCCESS,
    SESSIONINFORMATION_FAIL,
    GET_PERFIL,
    ACTION
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