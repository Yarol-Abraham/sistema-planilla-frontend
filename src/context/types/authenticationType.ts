import { SessionInformationCredential, SessionInformationResponse } from "../inteface/sessionInformation";

export const SESSIONINFORMATION_CREDENTIAL = 'SESSIONINFORMATION_CREDENTIAL';
export const SESSIONINFORMATION_SUCCESS = "SESSIONINFORMATION_SUCCESS";
export const SESSIONINFORMATION_FAIL = "SESSIONINFORMATION_FAIL";

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
    };