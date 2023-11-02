import { createContext } from "react";
import { props, initialState } from './models/sessionInformation/sessionInformationProps';

export const AuthenticationContext = createContext<props>({
    emailResponse: initialState.emailResponse,
    sessionInformationResponse: initialState.sessionInformationResponse,
    sessionInformationCredential: initialState.sessionInformationCredential,
    usuarioResponse: initialState.usuarioResponse,
    getSessionInformation(){},
    postSessionInformation(){},
    selectRole(){ return "" },
    getInformationPerfil(){},
    updatePerfil(){},
    sendEmailResetPassword(){},
    getValidateNewPassword(){},
    getConfirmPassword(){}
});