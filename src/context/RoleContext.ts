import { createContext } from "react";
import { initialState, props } from "./models/role/roleProps";

const RoleContext = createContext<props>({
    role: initialState.role,
    roleResponse: initialState.roleResponse,
    roleGrantResponse: initialState.roleResponse,
    roleListResponse: initialState.roleListResponse,
    roleListAssignResponse: initialState.roleListAssignResponse,
    roleListUnassignResponse: initialState.roleListUnassignResponse,
    roleListOptionUnassignResponse: initialState.roleListOptionUnassignResponse,
    roleListOptionAssignResponse: initialState.roleListOptionAssignResponse,
    createRol(){},
    getRols(){},
    getRole(){},
    updateRole(){},
    getAssignedRoles(){},
    getUnassignedRoles(){},
    grantPermission(){},
    notgrantPermission(){},
    getOptionUnassigned(){},
    getOptionAssigned(){}
});

export default RoleContext;