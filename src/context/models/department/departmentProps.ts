import { ReactNode } from "react";
import { DeparmentListResponse } from "./department";

export interface propsAction {
    children: ReactNode
}
export interface props {
    departmentListResponse: DeparmentListResponse,
    getDepartments: (sessionId: string)=> void,
  
}

export const initialState: props = {
    departmentListResponse: {
        strResponseCode: "",
        strResponseMessage: "",
        departamentos: []
    },
    
    getDepartments(){}
}