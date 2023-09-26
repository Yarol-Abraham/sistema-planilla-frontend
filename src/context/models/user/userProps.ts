import { UsuarioResponse } from "../sessionInformation/sessionInformation";
import { UsuarioCreate } from "./user";

export interface props {
    usuarioResponse: UsuarioResponse
   // usuarioCreate: UsuarioCreate,
    createUser: ( usuarioCreate: UsuarioCreate, SessionId: string) => void
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
    },/*
    usuarioCreate: {
        nombre: "",
        apellido: "",
        correoElectronico: "",
        telefonoMovil: "",
        fechaNacimiento: "",
        idGenero: 0,
        idUsuario: "",
        idSucursal: 0,
        requiereCambiarPassword: 0,
        fotografia: ""
    },*/
    createUser(){}
}