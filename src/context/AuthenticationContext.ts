import { createContext } from "react";
import { props, initialState } from './inteface/sessionInformation/sessionInformationProps';

export const AuthenticationContext = createContext<props>({
    sessionInformationResponse: initialState.sessionInformationResponse,
    sessionInformationCredential: initialState.sessionInformationCredential,
    getSessionInformation(){},
    postSessionInformation(){},
    selectRole(){ return "" }
});