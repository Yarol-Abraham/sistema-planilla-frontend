import { UsuarioResponse } from "../../models/sessionInformation/sessionInformation";
import { ListUsuarioResponse } from "../../models/user/user";

export const CREATE_SUCCESS = "CREATE_SUCCESS";
export const CREATE_FAIL = "CREATE_FAIL";
export const LIST_USER_SUCCESS = "LIST_USER_SUCCESS";
export const LIST_USER_FAIL = "LIST_USER_FAIL";

export const DISABLE_USER = "DISABLE_USER";
export const DISABLE_FAIL = "DISABLE_FAIL";

export type ACTION = |
    {
        type: "CREATE_SUCCESS",
        payload: {
            usuarioResponse: UsuarioResponse,
            listUsuarioResponse: ListUsuarioResponse
        }
    }
    |
    {
        type: "CREATE_FAIL",
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