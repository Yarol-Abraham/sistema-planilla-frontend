export interface DeparmentListResponse {
    strResponseCode: string
    strResponseMessage: string
    departamentos: Departamento[]
  }

  export interface DepartmentResonse {
    strResponseCode: string
    strResponseMessage: string
    departamento: Departamento  
  }
  
  export interface Departamento {
    idDepartamento: number
    nombre: string
  }
  
  export interface DepartamentoCreate {
    idDepartamento: number
    nombre: string
    idEmpresa: number
  }