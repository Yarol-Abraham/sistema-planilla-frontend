import { Role, RoleListResponse, RoleResponse} from "./role";

export interface props {
    roleResponse: RoleResponse,
    roleListResponse: RoleListResponse,
    createRol: (role: Role, roleListResponse: RoleListResponse, sessionId: string) => void,
    getRols: (sessionId: string)=> void
}

export const initialState: props = { 
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
    getRols() {}
}