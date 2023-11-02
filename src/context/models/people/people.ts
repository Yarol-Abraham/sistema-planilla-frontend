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

  export interface PersonaResponse {
    strResponseCode: string
    strResponseMessage: string
    persona: Persona
  }
  
export interface PeopleCreate {
  nombre: string
  apellido: string
  fechaNacimiento: string
  idGenero: number
  direccion: string
  telefono: string
  correoElectronico: string
  idEstadoCivil: number
}
  