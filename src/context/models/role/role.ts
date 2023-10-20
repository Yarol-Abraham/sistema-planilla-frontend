export interface RoleListResponse {
    strResponseCode: string
    strResponseMessage: string
    roles: Role[]
}

export interface RoleResponse {
    strResponseCode: string
    strResponseMessage: string,
    role: Role
}

export interface Role {
    idRole: number;
	nombre: string;
} 

export interface RoleAssign {
    idRole: string
    idUsuario: string
}
  
export interface OptionListResponse {
    strResponseCode: string
    strResponseMessage: string
    option: Option[]
}

export interface OptionResponse {
    strResponseCode: string
    strResponseMessage: string
    option: Option
}

export interface Option {
    idOpcion: string
    nombre: string
    ordenMenu: string
    pagina: string
    alta: string
    baja: string
    cambio: string
    imprimir: string
    exportar: string
}

export interface OptionAssign {
    idRole: string
    idOpcion: string
    alta: string
    baja: string
    cambio: string
    imprimir: string
    exportar: string
}

