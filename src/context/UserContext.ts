import { createContext } from "react";
import { initialState, props } from "./models/user/userProps";

const UserContext = createContext<props>({
    usuarioResponse: initialState.usuarioResponse,
    listUsuarioResponse: initialState.listUsuarioResponse,
    createUser() {},
    listuser(){}
});

export default UserContext;