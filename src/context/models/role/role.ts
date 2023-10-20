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
  