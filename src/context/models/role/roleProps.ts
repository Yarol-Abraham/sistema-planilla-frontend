import { ReactNode } from "react";
import { Role, RoleAssign, RoleListResponse, RoleResponse} from "./role";

export interface propsAction {
    children: ReactNode
}

export interface props {
    role: Role,
    roleResponse: RoleResponse,
    roleGrantResponse: RoleResponse,
    roleListResponse: RoleListResponse,
    roleListAssignResponse: RoleListResponse,
    roleListUnassignResponse: RoleListResponse,
    createRol: (role: Role, roleListResponse: RoleListResponse, sessionId: string) => void,
    getRols: (sessionId: string)=> void,
    getRole: (idRole: number) => void,
    updateRole: (role: Role, roleListResponse: RoleListResponse, sessionId: string) => void,
    getAssignedRoles: (idUsuario: string,sessionId: string) => void,
    getUnassignedRoles:(idUsuario: string,sessionId: string) => void,
    grantPermission: (roles: Array<RoleAssign>, sessionId: string) => void,
    notgrantPermission: (roles: Array<RoleAssign>, sessionId: string) => void,
}

export const initialState: props = { 
   
    role: {
        idRole: 0,
        nombre: ""
    },
    roleGrantResponse: {
        strResponseCode: "",
        strResponseMessage: "",
        role: {
            idRole: 0,
            nombre: ""
        }
    },
    roleListUnassignResponse: {
        strResponseCode: "",
        strResponseMessage: "",
        roles: []
    },
    roleListAssignResponse: {
        strResponseCode: "",
        strResponseMessage: "",
        roles: []
    },
    roleListResponse: {
        strResponseCode: "",
        strResponseMessage: "",
        roles: []
    },
    roleResponse: {
        strResponseCode: "",
        strResponseMessage: "",
        role: {
            idRole: 0,
            nombre: ""
        }
    } ,
    createRol(){},
    getRols(){},
    getRole(){},
    updateRole(){},
    getAssignedRoles(){},
    getUnassignedRoles(){},
    grantPermission(){},
    notgrantPermission(){}
}