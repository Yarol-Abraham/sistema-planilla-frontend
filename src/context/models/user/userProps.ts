import { UsuarioResponse } from "../sessionInformation/sessionInformation";
import { ListUsuarioResponse, Usuario, UsuarioCreate } from "./user";

export interface props {
    usuario: Usuario,
    usuarioResponse: UsuarioResponse,
    listUsuarioResponse: ListUsuarioResponse,
    createUser: ( usuarioCreate: UsuarioCreate, listUsuarioResponse: ListUsuarioResponse, SessionId: string) => void,
    deleteUser: (idUsuario: string, listUsuarioResponse: ListUsuarioResponse, SessionId: string ) => void,
    updateUpUser: (idUsuario: string, listUsuarioResponse: ListUsuarioResponse, SessionId: string) => void,
    updateUser: (usuario: UsuarioCreate, listUsuarioResponse: ListUsuarioResponse, SessionId: string) => void,
    getUser: (idUsuario: string) => void,
    listuser: (SessionId: string) => void
}

export const initialState: props = {
    usuario: {
        nombre: "",
        apellido: "",
        correoElectronico: "",
        telefonoMovil: "",
        fechaNacimiento: "",
        idGenero: 0,
        idUsuario: "",
        idSucursal: 0,
        nombreSucursal: "",
        requiereCambiarPassword: 0,
        fotografia: "",
        idStatusUsuario: 0
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
    listUsuarioResponse:{
        strResponseCode: "",
        strResponseMessage: "",
        usuarios: []
    },
    createUser(){},
    updateUpUser(){},
    updateUser(){},
    listuser(){},
    deleteUser(){},
    getUser(){}
}