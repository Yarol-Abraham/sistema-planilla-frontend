import { Departamento } from "../../models/department/department";
import { initialState, props } from "../../models/department/departmentProps";
import { ACTION, CREATE_DEPARTMENT, CREATE_DEPARTMENT_ERROR, GET_DEPARTMENT, GET_DEPARTMENT_ERROR, GET_DEPARTMENT_SELECT } from "../../types/department/departmentTypes";


const DepartmentReducer: React.Reducer<props, ACTION> = (state: props, action:ACTION)=> 
{
    switch(action.type)
    {
        case GET_DEPARTMENT:
        case GET_DEPARTMENT_ERROR: 
            return {
                ...state,
                departmentListResponse: action.payload.departmentListResponse
            }

        case CREATE_DEPARTMENT:
        case CREATE_DEPARTMENT_ERROR: 
            return {
                ...state,
                departmentListResponse: action.payload.departmentListResponse,
                departmentResponse: action.payload.departmentResponse
            }
        
        case GET_DEPARTMENT_SELECT:
            let peopleFilter = state.departmentListResponse.departamentos.filter( departamento => departamento.idDepartamento == action.payload.idDepartamento);
            let department: Departamento = peopleFilter.length > 0 ? peopleFilter[0] : initialState.department;
            return {
                ...state,
                department
            }
                

        default: 
            return state;
    }
}

export default DepartmentReducer;