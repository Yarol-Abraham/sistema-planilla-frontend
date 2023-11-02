import { ReactNode } from "react";
import { PositionDeparmentListResponse, PositionListResponse, PositionResponse, Puesto } from "./position";

export interface propsAction {
    children: ReactNode
}
export interface props {
    positionDeparmentListResponse: PositionDeparmentListResponse,
    positionListResponse: PositionListResponse,
    positionResponse: PositionResponse,
    position: Puesto,
    getPositionByDeparment: (idDeparment: number, sessionId: string)=> void,
    getPositions: (sessionId: string)=> void,
    createPosition: (puesto: Puesto, positionListResponse: PositionListResponse, sessionId: string) => void,
    updatePosition: (puesto: Puesto, positionListResponse: PositionListResponse, sessionId: string) => void,
    getPosition: (idPersona: number) => void
}

export const initialState: props = {
    positionDeparmentListResponse: {
        strResponseCode: "",
        strResponseMessage: "",
        puestos: []
    },
    positionListResponse: {
        strResponseCode: "",
        strResponseMessage: "",
        puestos: []
    },
    positionResponse: {
        strResponseCode: "",
        strResponseMessage: "",
        puesto: {
            idDepartamento: 0,
            idPuesto: 0,
            nombre: ""
        }
    },
    position: {
        idDepartamento: 0,
        idPuesto: 0,
        nombre: ""
    },
    getPositionByDeparment(){},
    getPositions(){},
    createPosition(){},
    updatePosition(){},
    getPosition(){}
}