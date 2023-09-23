import { createContext } from "react";
import { props } from './inteface/sessionInformationProps';
import { initialState } from "./inteface/sessionInformationProps";

export const AuthenticationContext = createContext<props>({
    sessionInformationResponse: initialState.sessionInformationResponse,
    sessionInformationCredential: initialState.sessionInformationCredential,
    getSessionInformation(){},
    postSessionInformation(){},
    selectRole(){ return "" }
});