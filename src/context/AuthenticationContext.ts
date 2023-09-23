import { createContext } from "react";
import { props, initialState } from './inteface/sessionInformation/sessionInformationProps';

export const AuthenticationContext = createContext<props>({
    sessionInformationResponse: initialState.sessionInformationResponse,
    sessionInformationCredential: initialState.sessionInformationCredential,
    usuarioResponse: initialState.usuarioResponse,
    getSessionInformation(){},
    postSessionInformation(){},
    selectRole(){ return "" },
    getInformationPerfil(){}
});