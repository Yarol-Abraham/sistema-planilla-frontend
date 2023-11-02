export interface PositionDeparmentListResponse {
    strResponseCode: string
    strResponseMessage: string
    puestos: PuestoDepartamento[]
  }

  export interface PositionListResponse extends  PositionDeparmentListResponse {}

  export interface PositionResponse {
    strResponseCode: string
    strResponseMessage: string
    puesto: PuestoDepartamento
  }

  export interface PuestoDepartamento {
    idDepartamento: number
    idPuesto?: number
    nombre: string
  }

  export interface Puesto extends PuestoDepartamento {}


