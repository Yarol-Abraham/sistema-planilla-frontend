import { SessionInformationCredential, SessionInformationResponse, UsuarioResponse } from "../../models/sessionInformation/sessionInformation";

export const SESSIONINFORMATION_CREDENTIAL = 'SESSIONINFORMATION_CREDENTIAL';
export const SESSIONINFORMATION_SUCCESS = "SESSIONINFORMATION_SUCCESS";
export const SESSIONINFORMATION_FAIL = "SESSIONINFORMATION_FAIL";
export const GET_PERFIL = "GET_PERFIL";
export const UPDATE_PERFIL = "UPDATE_PERFIL";

export type ACTION = |
    {
        type: 'SESSIONINFORMATION_CREDENTIAL'; 
        payload: {
            sessionInformationCredential: SessionInformationCredential
        }
    }
    | {
        type: 'SESSIONINFORMATION_SUCCESS'; 
        payload: {
            sessionInformationResponse: SessionInformationResponse
        }
    }  
    | {
        type: 'SESSIONINFORMATION_FAIL'; 
        payload: {
            sessionInformationResponse: SessionInformationResponse
        }
    }
    | {
        type: 'GET_PERFIL';
        payload: {
            usuarioResponse: UsuarioResponse
        }
    }
    |
    {
        type: 'UPDATE_PERFIL';
        payload: {
            usuarioResponse: UsuarioResponse
        }
    }
    ;