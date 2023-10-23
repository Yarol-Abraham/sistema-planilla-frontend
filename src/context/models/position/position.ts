export interface PositionDeparmentListResponse {
    strResponseCode: string
    strResponseMessage: string
    puestos: PuestoDepartamento[]
  }

  export interface PuestoDepartamento {
    idPuesto: number
    idDepartamento: number
    nombre: string
  }
