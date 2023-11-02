import { DeparmentListResponse, DepartmentResonse } from "../../models/department/department";

export const GET_DEPARTMENT = "GET_DEPARTMENT";
export const GET_DEPARTMENT_ERROR = "GET_DEPARTMENT_ERROR";

export const CREATE_DEPARTMENT = "CREATE_DEPARTMENT";
export const CREATE_DEPARTMENT_ERROR  = "CREATE_DEPARTMENT_ERROR";

export const GET_DEPARTMENT_SELECT = "GET_DEPARTMENT_SELECT";


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
     |
     {
         type: "CREATE_DEPARTMENT",
         payload: {
            departmentResponse: DepartmentResonse,
            departmentListResponse: DeparmentListResponse,
         }
      }
      |
     {
         type: "CREATE_DEPARTMENT_ERROR",
         payload: {
            departmentResponse: DepartmentResonse,
            departmentListResponse: DeparmentListResponse
         }
      }
      |
     {
         type: "GET_DEPARTMENT_SELECT",
         payload: {
             idDepartamento: number
         }
      }

