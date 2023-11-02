import { Role } from "../../models/role/role";
import { props } from "../../models/role/roleProps";
import { ACTION, ADD_ROLE, ADD_ROLE_ERROR, GET_OPTIONS_ASSIGN, GET_OPTIONS_ASSIGN_ERROR, GET_OPTIONS_UNASSIGN, GET_OPTIONS_UNASSIGN_ERROR, GET_ROLE, GET_ROLES_ASSIGN, GET_ROLES_ASSIGN_ERROR, GET_ROLES_UNASSIGNED, GET_ROLES_UNASSIGNED_ERROR, ROLE_FAIL, ROLE_LIST_FAIL, ROLE_LIST_SUCCESS, ROLE_SUCCESS } from "../../types/role/roleTypes";

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
        
        case GET_ROLES_ASSIGN_ERROR:
        case GET_ROLES_ASSIGN:
            return {
                ...state,
                roleListAssignResponse: action.payload.roleListAssignResponse
            }

        case GET_ROLES_UNASSIGNED_ERROR:
        case GET_ROLES_UNASSIGNED:
            return {
                ...state,
                roleListUnassignResponse: action.payload.roleListUnassignResponse
            }
        
        case ADD_ROLE:
        case ADD_ROLE_ERROR:
            return {
                ...state,
                roleGrantResponse: action.payload.roleGrantResponse
            }
        
        case GET_OPTIONS_UNASSIGN:
        case GET_OPTIONS_UNASSIGN_ERROR:
            return {
                ...state,
                roleListOptionUnassignResponse: action.payload.roleListOptionUnassignResponse
            }

        case GET_OPTIONS_ASSIGN:
        case GET_OPTIONS_ASSIGN_ERROR:
            return {
                ...state,
                roleListOptionAssignResponse: action.payload.roleListOptionAssignResponse
            }

        default:
            return state;
    }
}

export default RoleRedcucer;