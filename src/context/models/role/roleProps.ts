import { ReactNode } from "react";
import { OptionAssign, OptionListResponse, OptionResponse, Role, RoleAssign, RoleListResponse, RoleResponse} from "./role";

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
    roleListOptionUnassignResponse: OptionListResponse,
    roleListOptionAssignResponse: OptionListResponse,
    roleOptionResponse: OptionResponse,
    createRol: (role: Role, roleListResponse: RoleListResponse, sessionId: string) => void,
    getRols: (sessionId: string)=> void,
    getRole: (idRole: number) => void,
    updateRole: (role: Role, roleListResponse: RoleListResponse, sessionId: string) => void,
    getAssignedRoles: (idUsuario: string,sessionId: string) => void,
    getUnassignedRoles:(idUsuario: string,sessionId: string) => void,
    grantPermission: (roles: Array<RoleAssign>, sessionId: string) => void,
    notgrantPermission: (roles: Array<RoleAssign>, sessionId: string) => void,
    getOptionUnassigned: (idRole: string,sessionId: string) => void,
    getOptionAssigned: (idRole: string,sessionId: string) => void,
    grantOptionPermission: (rolesOptionAssign: Array<OptionAssign>, sessionId: string) => void,
    notgranOptionPermission: (rolesOptionAssign: Array<OptionAssign>, sessionId: string) => void
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
    roleListOptionUnassignResponse: {
      strResponseCode: "",
      strResponseMessage: "",
      option: []
    },
    roleListOptionAssignResponse: {
        strResponseCode: "",
        strResponseMessage: "",
        option: []
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
    }, 
    roleOptionResponse: {
        strResponseCode: "",
        strResponseMessage: "",
        option: {
            idOpcion:" 0",
            nombre: "",
            ordenMenu:" 0",
            pagina: "",
            alta:" 0",
            baja:" 0",
            cambio:" 0",
            imprimir:" 0",
            exportar:" 0"
        }
    },
    createRol(){},
    getRols(){},
    getRole(){},
    updateRole(){},
    getAssignedRoles(){},
    getUnassignedRoles(){},
    grantPermission(){},
    notgrantPermission(){},
    getOptionUnassigned(){},
    getOptionAssigned(){},
    grantOptionPermission(){},
    notgranOptionPermission(){}
}