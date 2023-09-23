import { 
    SESSIONINFORMATION_SUCCESS,
    SESSIONINFORMATION_FAIL,
    ACTION
} from "../types/authenticationType";

import { props } from "../inteface/sessionInformationProps";
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
    
        default:
            return state;
    }
}

export default AuthenticationReducer;