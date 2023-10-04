import { createContext } from "react";
import { initialState, props } from "./models/role/roleProps";

const RoleContext = createContext<props>({
    role: initialState.role,
    roleResponse: initialState.roleResponse,
    roleListResponse: initialState.roleListResponse,
    createRol(){},
    getRols() {},
});

export default RoleContext;