import  { useReducer } from 'react';
import { initialState, propsAction } from "../../models/department/departmentProps";

import DepartmentContext from "../../DepartmentContext";
import DepartmentReducer from '../../reducer/department/departmentReducer';

import  request, { sendSessionIdAuthorization } from "../../../config/axios";
import { SUCCESS } from '../../../utils/Methods';
import { GET_DEPARTMENT, GET_DEPARTMENT_ERROR } from '../../types/department/departmentTypes';

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

    return (
        <DepartmentContext.Provider
            value={{
                departmentListResponse: state.departmentListResponse,
                getDepartments
            }}
        >
            { props.children }
        </DepartmentContext.Provider>
    );

}

export default DepartmentAction;