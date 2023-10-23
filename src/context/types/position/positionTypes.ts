import { PositionDeparmentListResponse } from "../../models/position/position";

export const GET_POSITION_DEPARMENT = "GET_POSITION_DEPARMENT";
export const GET_POSITION_DEPARMENT_ERROR = "GET_POSITION_DEPARMENT_ERROR";


export type ACTION = |  
    {
       type: "GET_POSITION_DEPARMENT",
       payload: {
        positionDeparmentListResponse: PositionDeparmentListResponse
       }
    }
    |
    {
        type: "GET_POSITION_DEPARMENT_ERROR",
        payload: {
            positionDeparmentListResponse: PositionDeparmentListResponse
        }
     }
     