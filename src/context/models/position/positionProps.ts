import { ReactNode } from "react";
import { PositionDeparmentListResponse } from "./position";

export interface propsAction {
    children: ReactNode
}
export interface props {
    positionDeparmentListResponse: PositionDeparmentListResponse,
    getPositionByDeparment: (idDeparment: number, sessionId: string)=> void,
  
}

export const initialState: props = {
    positionDeparmentListResponse: {
        strResponseCode: "",
        strResponseMessage: "",
        puestos: []
    },
    
    getPositionByDeparment(){}
}