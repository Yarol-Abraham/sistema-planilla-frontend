import { PositionDeparmentListResponse ,PositionListResponse, PositionResponse } from "../../models/position/position";

export const GET_POSITION_DEPARMENT = "GET_POSITION_DEPARMENT";
export const GET_POSITION_DEPARMENT_ERROR = "GET_POSITION_DEPARMENT_ERROR";

export const  GET_LIST_POSITION = "GET_LIST_POSITION";
export const  GET_LIST_POSITION_ERROR = "GET_LIST_POSITION_ERROR";

export const CREATE_POSITION = "CREATE_POSITION";
export const CREATE_POSITION_ERROR = "CREATE_POSITION_ERROR";

export const GET_POSITION_SELECT = "GET_POSITION_SELECT";

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
     
     |  
    {
       type: "GET_LIST_POSITION",
       payload: {
        positionListResponse: PositionListResponse
       }
    }
    |
    {
        type: "GET_LIST_POSITION_ERROR",
        payload: {
            positionListResponse: PositionListResponse
        }
     }
     |
     {
         type: "CREATE_POSITION",
         payload: {
             positionResponse: PositionResponse,
             positionListResponse: PositionListResponse,
         }
      }
      |
     {
         type: "CREATE_POSITION_ERROR",
         payload: {
            positionResponse: PositionResponse,
            positionListResponse: PositionListResponse
         }
      }
      |
     {
         type: "GET_POSITION_SELECT",
         payload: {
            idPuesto: number
         }
      }