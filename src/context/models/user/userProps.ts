import { UsuarioResponse } from "../sessionInformation/sessionInformation";
import { ListUsuarioResponse, UsuarioCreate } from "./user";

export interface props {
    usuarioResponse: UsuarioResponse,
    listUsuarioResponse: ListUsuarioResponse,
    createUser: ( usuarioCreate: UsuarioCreate, SessionId: string) => void,
    listuser: (SessionId: string) => void
}

export const initialState: props = {
    usuarioResponse: {
        strResponseCode: "",
        strResponseMessage: "",
        entUsuario: {
            nombre: "",
            apellido: "",
            correoElectronico: "",
            telefonoMovil: "",
            fechaNacimiento: "",
            idGenero: 0
        }
    },
    listUsuarioResponse:{
        strResponseCode: "",
        strResponseMessage: "",
        usuarios: []
    },
    createUser(){},
    listuser(){}
}