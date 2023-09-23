export interface SessionInformationCredential {
    correoElectronico: string
    password: string  
}

export interface SessionInformationResponse {
    strResponseCode: string
    strResponseMessage: string
    strSessionId: string
    strIdUsuario: string
    strNombre: string
    strFotografia: string
    intRoleSelect: number
    listRoles: ListRole[]
}
  
export interface ListRole {
    idRole: number
    nombre: string
}