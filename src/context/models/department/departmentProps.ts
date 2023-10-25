import { ReactNode } from "react";
import { DeparmentListResponse, Departamento, DepartamentoCreate, DepartmentResonse } from "./department";

export interface propsAction {
    children: ReactNode
}
export interface props {
    departmentListResponse: DeparmentListResponse,
    departmentResponse: DepartmentResonse,
    department: Departamento,
    getDepartments: (sessionId: string)=> void,
    createDepartment: (departamento: DepartamentoCreate, departmentListResponse: DeparmentListResponse, sessionId: string) => void,
    updateDepartment: (departamento: DepartamentoCreate, departmentListResponse: DeparmentListResponse, sessionId: string) => void,
    getDepartment: (idDepartamento: number) => void
}

export const initialState: props = {
    departmentListResponse: {
        strResponseCode: "",
        strResponseMessage: "",
        departamentos: []
    },
    departmentResponse: {
        strResponseCode: "",
        strResponseMessage: "",
        departamento: {
            idDepartamento: 0,
            nombre: ""
        }
    }, 
    department: {
        idDepartamento: 0,
        nombre: ""
    },
    getDepartments(){},
    createDepartment(){},
    updateDepartment(){},
    getDepartment(){}
}


