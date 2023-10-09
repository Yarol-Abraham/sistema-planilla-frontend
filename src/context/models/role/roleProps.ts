import { ReactNode } from "react";
import { Role, RoleListResponse, RoleResponse} from "./role";

export interface propsAction {
    children: ReactNode
}

export interface props {
    role: Role,
    roleResponse: RoleResponse,
    roleListResponse: RoleListResponse,
    createRol: (role: Role, roleListResponse: RoleListResponse, sessionId: string) => void,
    getRols: (sessionId: string)=> void,
    getRole: (idRole: number) => void,
    updateRole: (role: Role, roleListResponse: RoleListResponse, sessionId: string) => void
}

export const initialState: props = { 
    role: {
        idRole: 0,
        nombre: ""
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
    updateRole(){}
}