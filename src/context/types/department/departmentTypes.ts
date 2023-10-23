import { DeparmentListResponse } from "../../models/department/department";

export const GET_DEPARTMENT = "GET_DEPARTMENT";
export const GET_DEPARTMENT_ERROR = "GET_DEPARTMENT_ERROR";


export type ACTION = |  
    {
       type: "GET_DEPARTMENT",
       payload: {
        departmentListResponse: DeparmentListResponse
       }
    }
    |
    {
        type: "GET_DEPARTMENT_ERROR",
        payload: {
            departmentListResponse: DeparmentListResponse
        }
     }
     