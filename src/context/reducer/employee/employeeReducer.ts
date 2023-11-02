import { Empleado } from "../../models/employee/employee";
import { initialState, props } from "../../models/employee/employeeProps";
import { ACTION, CREATE_EMPLOYEE, CREATE_EMPLOYEE_ERROR, GET_EMPLOYEE, GET_EMPLOYEE_ERROR, GET_EMPLOYEE_SELECT } from "../../types/employee/employeType";

const EmployeeReducer: React.Reducer<props, ACTION> = (state: props, action:ACTION)=> 
{
    switch(action.type)
    {
        case GET_EMPLOYEE:
        case GET_EMPLOYEE_ERROR: 
            return {
                ...state,
                employeeListResponse: action.payload.employeeListResponse
            }

        case CREATE_EMPLOYEE:
        case CREATE_EMPLOYEE_ERROR: 
            return {
                ...state,
                employeeResponse: action.payload.employeeResponse,
                employeeListResponse: action.payload.employeeListResponse
            }
        
        case GET_EMPLOYEE_SELECT:
            console.log(action.payload.idEmpleado);
            let employeeFilter = state.employeeListResponse.empleados.filter( empleado => empleado.idEmpleado == action.payload.idEmpleado);
            let employee: Empleado = employeeFilter.length > 0 ? employeeFilter[0] : initialState.employee;
            return {
                ...state,
                employee
            }
            
        default: 
            return state;
    }
}

export default EmployeeReducer;