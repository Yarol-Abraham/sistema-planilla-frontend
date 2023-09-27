import { createContext } from "react";
import { initialState, props } from "./models/role/roleProps";

const RoleContext = createContext<props>({
    roleResponse: initialState.roleResponse,
    roleListResponse: initialState.roleListResponse,
    createRol(){},
    getRols() {},
});

export default RoleContext;