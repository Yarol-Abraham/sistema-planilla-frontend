import { createContext } from "react";
import { initialState, props } from "./models/user/userProps";

const UserContext = createContext<props>({
    usuarioResponse: initialState.usuarioResponse,
    //usuarioCreate: initialState.usuarioCreate,
    createUser() {},
});

export default UserContext;