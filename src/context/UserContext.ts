import { createContext } from "react";
import { initialState, props } from "./models/user/userProps";

const UserContext = createContext<props>({
    usuario: initialState.usuario,
    usuarioResponse: initialState.usuarioResponse,
    listUsuarioResponse: initialState.listUsuarioResponse,
    createUser(){},
    deleteUser(){},
    updateUpUser(){},
    updateUser(){},
    getUser(){},
    listuser(){}
});

export default UserContext;