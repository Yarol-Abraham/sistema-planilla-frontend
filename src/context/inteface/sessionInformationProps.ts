import { SessionInformationCredential, SessionInformationResponse } from "./sessionInformation";

export interface props {
    sessionInformationResponse: SessionInformationResponse,
    sessionInformationCredential: SessionInformationCredential,
    getSessionInformation: () => void,
    postSessionInformation:  (sessionInformationCredential: SessionInformationCredential) => void,
    selectRole: (role: number) => String
}

export const initialState: props = {
    sessionInformationResponse: {
        strResponseCode: "",
        strResponseMessage: "",
        strSessionId: "",
        strIdUsuario: "",
        strNombre: "",
        strFotografia: "",
        intRoleSelect: 0,
        listRoles: []
    },
    sessionInformationCredential: {
        correoElectronico: "",
        password: ""
    },
    getSessionInformation: function(){},
    postSessionInformation: function() {},
    selectRole: function(){ return "" }
}