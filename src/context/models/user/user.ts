export interface UsuarioCreate {
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
  }
  
  export interface ListUsuarioResponse {
    strResponseCode: string
    strResponseMessage: string
    usuarios: Usuario[]
  }
  
  export interface Usuario {
    nombre: string
    apellido: string
    correoElectronico: string
    telefonoMovil: string
    fechaNacimiento: string
    idGenero: number
    idUsuario: string
    idSucursal: number
    nombreSucursal: string
    requiereCambiarPassword: number
    fotografia: string,
    idStatusUsuario: number
  }
  