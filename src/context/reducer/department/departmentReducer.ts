import { props } from "../../models/department/departmentProps";
import { ACTION, GET_DEPARTMENT, GET_DEPARTMENT_ERROR } from "../../types/department/departmentTypes";


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

        default: 
            return state;
    }
}

export default DepartmentReducer;