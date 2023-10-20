export interface PeopleListResponse {
    strResponseCode: string
    strResponseMessage: string
    personas: Persona[]
  }
  
  export interface Persona {
    idPersona: number
    nombre: string
    apellido: string
    fechaNacimiento: string
    idGenero: number
    genero: string
    direccion: string
    telefono: string
    correoElectronico: string
    estadoCivil: string
    idEstadoCivil: number
  }
  