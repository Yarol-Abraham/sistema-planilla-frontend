export interface MenuResponse {
    strResponseCode: string
    strResponseMessage: string
    entModulo: EntModulo[]
  }
  
export interface EntModulo {
  idModulo: number
  nombre: string
  ordenMenu: number
  menu: Menu[]
}

export interface Menu {
  idMenu: number
  nombre: string
  ordenMenu: number
  opciones: Opcione[]
}

export interface Opcione {
  idOpcion: number
  nombre: string
  ordenMenu: number
  pagina: string
  alta: number
  baja: number
  cambio: number
  imprimir: number
  exportar: number
}
