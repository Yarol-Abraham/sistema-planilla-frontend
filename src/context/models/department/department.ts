export interface DeparmentListResponse {
    strResponseCode: string
    strResponseMessage: string
    departamentos: Departamento[]
  }
  
  export interface Departamento {
    idDepartamento: number
    nombre: string
  }
  