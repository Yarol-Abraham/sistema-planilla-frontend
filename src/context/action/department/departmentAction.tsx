import  { useReducer } from 'react';
import { initialState, propsAction } from "../../models/department/departmentProps";

import DepartmentContext from "../../DepartmentContext";
import DepartmentReducer from '../../reducer/department/departmentReducer';

import  request, { sendSessionIdAuthorization } from "../../../config/axios";
import { SUCCESS } from '../../../utils/Methods';
import { CREATE_DEPARTMENT, CREATE_DEPARTMENT_ERROR, GET_DEPARTMENT, GET_DEPARTMENT_ERROR, GET_DEPARTMENT_SELECT } from '../../types/department/departmentTypes';
import { DeparmentListResponse, DepartamentoCreate, DepartmentResonse } from '../../models/department/department';

const DepartmentAction: React.FC<propsAction> = function(props)
{

    const [ state, dispatch ] = useReducer(DepartmentReducer, initialState);

    const getDepartments = async function(sessionId: string) 
    {
        let departmentListResponse = initialState.departmentListResponse;

        try{
            sendSessionIdAuthorization(request, sessionId);
            const sendRequest = await request.get(`/tec/department/list`);
            departmentListResponse = sendRequest.data;

            if(departmentListResponse.strResponseCode != SUCCESS)
                throw new Error(departmentListResponse.strResponseMessage);

            dispatch({ type: GET_DEPARTMENT, payload: { departmentListResponse } });
            
        }
        catch(err)
        {
            dispatch({ type: GET_DEPARTMENT_ERROR, payload: { departmentListResponse } });
        }
    }

    const createDepartment = async function(departamento: DepartamentoCreate, departmentListResponse: DeparmentListResponse, sessionId:string) 
    {
        let departmentResponse: DepartmentResonse = initialState.departmentResponse;
        try
        {
            sendSessionIdAuthorization(request, sessionId);
            const sendRequest = await request.post("/tec/department/create", departamento);
            departmentResponse = sendRequest.data;

            if(departmentResponse.strResponseCode != SUCCESS)
                throw new Error(departmentResponse.strResponseMessage);
            
            departmentListResponse.departamentos = [ ...departmentListResponse.departamentos, departmentResponse.departamento ];

            dispatch({ type: CREATE_DEPARTMENT, payload: { departmentResponse, departmentListResponse } })
        }   
        catch(err)
        {
            dispatch({ type: CREATE_DEPARTMENT_ERROR, payload: { departmentResponse, departmentListResponse } })
        } 
        return departmentResponse;
    }

    const updateDepartment = async function(departamento: DepartamentoCreate, departmentListResponse: DeparmentListResponse, sessionId:string) 
    {
        let departmentResponse: DepartmentResonse = initialState.departmentResponse;
        try
        {
            sendSessionIdAuthorization(request, sessionId);
            const sendRequest = await request.put("/tec/department/update", departamento);
            departmentResponse = sendRequest.data;

            if(departmentResponse.strResponseCode != SUCCESS)
                throw new Error(departmentResponse.strResponseMessage);
            
                departmentListResponse.departamentos = departmentListResponse.departamentos.map( departamento => departamento.idDepartamento == departmentResponse.departamento.idDepartamento ?  departmentResponse.departamento: departamento  );

            dispatch({ type: CREATE_DEPARTMENT, payload: { departmentResponse, departmentListResponse } })
        }   
        catch(err)
        {
            dispatch({ type: CREATE_DEPARTMENT_ERROR, payload: { departmentResponse, departmentListResponse } })
        } 
        return departmentResponse;
    }
    
    const getDepartment = function(idDepartamento: number)
    {
        dispatch({ type: GET_DEPARTMENT_SELECT, payload: { idDepartamento } });
    }

    return (
        <DepartmentContext.Provider
            value={{
                departmentListResponse: state.departmentListResponse,
                departmentResponse: state.departmentResponse,
                department: state.department,
                getDepartments,
                createDepartment,
                updateDepartment,
                getDepartment
            }}
        >
            { props.children }
        </DepartmentContext.Provider>
    );

}

export default DepartmentAction;