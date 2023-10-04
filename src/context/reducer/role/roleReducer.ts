import { Role } from "../../models/role/role";
import { props } from "../../models/role/roleProps";
import { ACTION, GET_ROLE, ROLE_FAIL, ROLE_LIST_FAIL, ROLE_LIST_SUCCESS, ROLE_SUCCESS } from "../../types/role/roleTypes";

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

        case GET_ROLE:
            let roleFilter = state.roleListResponse.roles.filter( role => role.idRole == action.payload.idRole);
            let role: Role = roleFilter.length > 0 ? roleFilter[0] : { idRole: 0, nombre: "" };
            return {
                ...state,
                role
            }

        default:
            return state;
    }
}

export default RoleRedcucer;