import { UsuarioResponse } from "../../models/sessionInformation/sessionInformation";

export const CREATE_SUCCESS = "CREATE_SUCCESS";
export const CREATE_FAIL = "CREATE_FAIL";

export type ACTION = |
    {
        type: "CREATE_SUCCESS",
        payload: {
            usuarioResponse: UsuarioResponse
        }
    }
    |
    {
        type: "CREATE_FAIL",
        payload: {
            usuarioResponse: UsuarioResponse
        }
    }