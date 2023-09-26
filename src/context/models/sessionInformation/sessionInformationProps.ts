import { SessionInformationCredential, SessionInformationResponse, UsuarioResponse } from "./sessionInformation";

export interface props {
    sessionInformationResponse: SessionInformationResponse,
    sessionInformationCredential: SessionInformationCredential,
    usuarioResponse: UsuarioResponse,
    getSessionInformation: () => void,
    postSessionInformation:  (sessionInformationCredential: SessionInformationCredential) => void,
    selectRole: (role: number) => String,
    getInformationPerfil: (sessionInformationResponse: SessionInformationResponse) => void
    updatePerfil:(usuarioResponse: UsuarioResponse,sessionInformationResponse: SessionInformationResponse ) => void
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
    usuarioResponse: {
        strResponseCode: "",
        strResponseMessage: "",
        entUsuario: {
            nombre: "",
            apellido: "",
            correoElectronico: "",
            telefonoMovil: "",
            fechaNacimiento: "",
            idGenero: 0,
            idUsuario: "",
            idSucursal: 0,
            requiereCambiarPassword: 0,
            fotografia: "",
            nombreSucursal: "",
            idStatusUsuario: 0
        }
    },
    getSessionInformation: function(){},
    postSessionInformation: function() {},
    selectRole: function(){ return "" },
    getInformationPerfil: function(){},
    updatePerfil: function(){}
}