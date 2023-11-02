import { EmployeeListResponse, EmployeeResponse } from "../../models/employee/employee";

export const GET_EMPLOYEE = "GET_EMPLOYEE";
export const GET_EMPLOYEE_ERROR = "GET_EMPLOYEE_ERROR";

export const CREATE_EMPLOYEE = "CREATE_EMPLOYEE";
export const CREATE_EMPLOYEE_ERROR = "CREATE_EMPLOYEE_ERROR";

export const GET_EMPLOYEE_SELECT = "GET_EMPLOYEE_SELECT";
 
export type ACTION = |  
    {
       type: "GET_EMPLOYEE",
       payload: {
        employeeListResponse: EmployeeListResponse
       }
    }
    |
    {
        type: "GET_EMPLOYEE_ERROR",
        payload: {
         employeeListResponse: EmployeeListResponse
        }
     }
     |
    {
        type: "CREATE_EMPLOYEE",
        payload: {
            employeeResponse: EmployeeResponse,
            employeeListResponse: EmployeeListResponse,
        }
     }
     |
    {
        type: "CREATE_EMPLOYEE_ERROR",
        payload: {
            employeeResponse: EmployeeResponse,
            employeeListResponse: EmployeeListResponse
        }
     }
     |
    {
        type: "GET_EMPLOYEE_SELECT",
        payload: {
            idEmpleado: number
        }
     }