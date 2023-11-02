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

export interface UsuarioResponse {
    strResponseCode: string
    strResponseMessage: string
    entUsuario: EntUsuario
  }
  
  export interface EntUsuario {
    nombre: string
    apellido: string
    correoElectronico: string
    telefonoMovil: string
    fechaNacimiento: string
    idGenero: number
    idUsuario: string
    idSucursal: number
    requiereCambiarPassword: number
    fotografia: string
    nombreSucursal: string
    idStatusUsuario: number
  }
  
  