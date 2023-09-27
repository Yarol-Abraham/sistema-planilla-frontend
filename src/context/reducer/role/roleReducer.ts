import { props } from "../../models/role/roleProps";
import { ACTION, ROLE_FAIL, ROLE_LIST_FAIL, ROLE_LIST_SUCCESS, ROLE_SUCCESS } from "../../types/role/roleTypes";


const RoleRedcucer: React.Reducer<props, ACTION> = (state: props, action:ACTION)=> 
{

    switch (action.type) 
    {
        case ROLE_SUCCESS:
            return {
                ...state,
                roleResponse: action.payload.roleResponse,
                roleListResponse: action.payload.roleListResponse
            }

        case ROLE_FAIL:
            return {
                ...state,
                roleResponse: action.payload.roleResponse
            }
        
        case ROLE_LIST_SUCCESS:
        case ROLE_LIST_FAIL: 
            return {
                ...state,
                roleListResponse: action.payload.roleListResponse
            }

        default:
            return state;
    }
}

export default RoleRedcucer;