import { ReactNode } from 'react';
import { EmpleadoCreate, Empleado, EmployeeResponse, EmployeeListResponse } from "./employee";

export interface propsAction {
    children: ReactNode
}
export interface props {
    employeeListResponse: EmployeeListResponse,
    employeeResponse: EmployeeResponse,
    employee: Empleado,
    getEmployees: (sessionId: string)=> void,
    createEmployee: (employee: EmpleadoCreate, employeeListResponse: EmployeeListResponse, sessionId: string) => void,
    updateEmployee: (employee: EmpleadoCreate, employeeListResponse: EmployeeListResponse, sessionId: string) => void,
    getEmployee: (idEmpleado: number) => void
}

export const initialState: props = {
    employeeListResponse: {
        strResponseCode: "",
        strResponseMessage: "",
        empleados: []
    },
    employeeResponse: {
        strResponseCode: "",
        strResponseMessage: "",
        empleado: {
            idEmpleado: 0,
            persona: {
                idPersona: 0,
                nombre: '',
                apellido: '',
                fechaNacimiento: '',
                idGenero: 0,
                genero: '',
                direccion: '',
                telefono: '',
                correoElectronico: '',
                estadoCivil: '',
                idEstadoCivil: 0
            },
            sucursal: {
                idSucursal: 0,
                nombre: ""
            },
            fechaContratacion: '',
            puesto: 
            {
                idPuesto: 0,
                idDepartamento: 0,
                nombre: ""
            },
            idStatusEmpleado: 0,
            ingresoSueldoBase: 0,
            ingresoBonificacionDecreto: 0,
            ingresoOtrosIngresos: 0,
            descuentoIgss: 0,
            descuentoIsr: 0,
            descuentoInasistencias: 0
        }
    },
    employee: {
        idEmpleado: 0,
        persona: {
            idPersona: 0,
            nombre: '',
            apellido: '',
            fechaNacimiento: '',
            idGenero: 0,
            genero: '',
            direccion: '',
            telefono: '',
            correoElectronico: '',
            estadoCivil: '',
            idEstadoCivil: 0
        },
        sucursal: {
            idSucursal: 0,
            nombre: ""
        },
        fechaContratacion: '',
        puesto: 
        {
            idDepartamento: 0,
            idPuesto: 0,
            nombre: ""
        },
        idStatusEmpleado: 0,
        ingresoSueldoBase: 0,
        ingresoBonificacionDecreto: 0,
        ingresoOtrosIngresos: 0,
        descuentoIgss: 0,
        descuentoIsr: 0,
        descuentoInasistencias: 0
    },
    getEmployees(){},
    createEmployee(){},
    updateEmployee(){},
    getEmployee(){}
}