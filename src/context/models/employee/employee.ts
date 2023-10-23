import { Persona } from "../people/people"
export interface EmployeeListResponse {
    strResponseCode: string
    strResponseMessage: string
    empleados: Empleado[]
  }

export interface EmployeeResponse {
    strResponseCode: string
    strResponseMessage: string
    empleado: Empleado
}

export interface Empleado {
    idEmpleado: number
    persona: Persona
    sucursal: Sucursal
    fechaContratacion: string
    puesto: Puesto
    idStatusEmpleado: number
    ingresoSueldoBase: number
    ingresoBonificacionDecreto: number
    ingresoOtrosIngresos: number
    descuentoIgss: number
    descuentoIsr: number
    descuentoInasistencias: number
}

export interface EmpleadoCreate {
    idEmpleado?: number
    idPersona: number
    idSucursal: number
    fechaContratacion: string
    idPuesto: number
    idStatusEmpleado: number
    ingresoSueldoBase: number
    ingresoBonificacionDecreto: number
    ingresoOtrosIngresos: number
    descuentoIgss: number
    descuentoIsr: number
    descuentoInasistencias: number
  }
  
export interface Sucursal {
    idSucursal: number
    nombre: string
}

export interface Puesto {
    idPuesto: number
    idDepartamento: number
    nombre: string
}