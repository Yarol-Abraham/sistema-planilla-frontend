import { UsuarioResponse } from "../../models/sessionInformation/sessionInformation";
import { ListUsuarioResponse } from "../../models/user/user";

export const USER_SUCCESS = "USER_SUCCESS";
export const USER_FAIL = "USER_FAIL";
export const LIST_USER_SUCCESS = "LIST_USER_SUCCESS";
export const LIST_USER_FAIL = "LIST_USER_FAIL";

export const DISABLE_USER = "DISABLE_USER";
export const DISABLE_FAIL = "DISABLE_FAIL";

export const GET_USER = "GET_USER";

export const METHOD = {
    create: "CREATE",
    update: "UPDATE"
};

export type ACTION = |
    {
        type: "GET_USER",
        payload: {
            idUsuario: string
        }
    }
    |
    {
        type: "USER_SUCCESS",
        payload: {
            usuarioResponse: UsuarioResponse,
            listUsuarioResponse: ListUsuarioResponse
        }
    }
    |
    {
        type: "USER_FAIL",
        payload: {
            usuarioResponse: UsuarioResponse
        }
    }
    |
    {
        type: "LIST_USER_SUCCESS",
        payload: {
            listUsuarioResponse: ListUsuarioResponse
        }
    }
    |
    {
        type: "LIST_USER_FAIL",
        payload: {
            listUsuarioResponse: ListUsuarioResponse
        }
    }
    | {
        type: "DISABLE_USER",
        payload: {
            usuarioResponse: UsuarioResponse,
            listUsuarioResponse: ListUsuarioResponse
        }
    }
    | {
        type: "DISABLE_FAIL",
        payload: {
            usuarioResponse: UsuarioResponse
        }
    }