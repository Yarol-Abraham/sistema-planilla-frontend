import  { useReducer } from 'react';
import { initialState, propsAction } from "../../models/employee/employeeProps";

import EmployeeContext from "../../EmployeeContext";
import EmployeeReducer from '../../reducer/employee/employeeReducer';

import  request, { sendSessionIdAuthorization } from "../../../config/axios";
import { SUCCESS } from '../../../utils/Methods';
import { CREATE_EMPLOYEE, CREATE_EMPLOYEE_ERROR, GET_EMPLOYEE, GET_EMPLOYEE_ERROR, GET_EMPLOYEE_SELECT } from '../../types/employee/employeType';
import { EmpleadoCreate, EmployeeListResponse, EmployeeResponse } from '../../models/employee/employee';


const EmployeeAction: React.FC<propsAction> = function(props)
{

    const [ state, dispatch ] = useReducer(EmployeeReducer, initialState);

    const getEmployees = async function(sessionId: string) 
    {
        let employeeListResponse = initialState.employeeListResponse;

        try{
            sendSessionIdAuthorization(request, sessionId);
            const sendRequest = await request.get("/tec/employee/list");
            employeeListResponse = sendRequest.data;

            if(employeeListResponse.strResponseCode != SUCCESS)
                throw new Error(employeeListResponse.strResponseMessage);

            dispatch({ type: GET_EMPLOYEE, payload: { employeeListResponse } });
            
        }
        catch(err)
        {
            dispatch({ type: GET_EMPLOYEE_ERROR, payload: { employeeListResponse } });
        }
    }

    const createEmployee = async function(employee: EmpleadoCreate, employeeListResponse: EmployeeListResponse, sessionId: string) 
    {
        let employeeResponse: EmployeeResponse = initialState.employeeResponse;
        try
        {
            sendSessionIdAuthorization(request, sessionId);
            const sendRequest = await request.post("/tec/employee/create", employee);
            employeeResponse = sendRequest.data;

            if(employeeResponse.strResponseCode != SUCCESS)
                throw new Error(employeeResponse.strResponseMessage);
            
            employeeListResponse.empleados = [ ...employeeListResponse.empleados, employeeResponse.empleado ];

            dispatch({ type: CREATE_EMPLOYEE, payload: { employeeResponse, employeeListResponse } })
        }   
        catch(err)
        {
            dispatch({ type: CREATE_EMPLOYEE_ERROR, payload: { employeeResponse, employeeListResponse } })
        } 
        return employeeResponse;
    }

    const updateEmployee = async function(employee: EmpleadoCreate, employeeListResponse: EmployeeListResponse, sessionId: string) 
    {
        let employeeResponse: EmployeeResponse = initialState.employeeResponse;
        try
        {
            sendSessionIdAuthorization(request, sessionId);
            const sendRequest = await request.put("/tec/employee/update", employee);
            employeeResponse = sendRequest.data;

            if(employeeResponse.strResponseCode != SUCCESS)
                throw new Error(employeeResponse.strResponseMessage);
            
            employeeListResponse.empleados = employeeListResponse.empleados.map( empleado => empleado.idEmpleado == employeeResponse.empleado.idEmpleado ?  employeeResponse.empleado: empleado  );

            dispatch({ type: CREATE_EMPLOYEE, payload: { employeeResponse, employeeListResponse } })
        }   
        catch(err)
        {
            dispatch({ type: CREATE_EMPLOYEE_ERROR, payload: { employeeResponse, employeeListResponse } })
        } 
        return employeeResponse;
    }

    const getEmployee = function (idEmpleado: number)
    {
        dispatch({ type: GET_EMPLOYEE_SELECT, payload: { idEmpleado } });
    }

    return (
        <EmployeeContext.Provider
            value={{
                employeeListResponse: state.employeeListResponse,
                employeeResponse: state.employeeResponse,
                employee: state.employee,
                getEmployees,
                createEmployee,
                updateEmployee,
                getEmployee
            }}
        >
            { props.children }
        </EmployeeContext.Provider>
    );

}

export default EmployeeAction;