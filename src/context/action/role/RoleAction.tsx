import { useReducer } from "react";

import RoleContext from "../../RoleContext";
import RoleRedcucer from "../../reducer/role/roleReducer";
import { propsAction, initialState } from "../../models/role/roleProps";
import { Role, RoleListResponse, RoleResponse } from "../../models/role/role";
import  request, { sendSessionIdAuthorization } from "../../../config/axios";
import { SUCCESS } from "../../../utils/Methods";
import { GET_ROLE, ROLE_FAIL, ROLE_LIST_FAIL, ROLE_LIST_SUCCESS, ROLE_SUCCESS, METHOD, GET_ROLES_ASSIGN, GET_ROLES_ASSIGN_ERROR, GET_ROLES_UNASSIGNED, GET_ROLES_UNASSIGNED_ERROR, ADD_ROLE, ADD_ROLE_ERROR } from "../../types/role/roleTypes";
import { RoleAssign } from "../../models/role/role";

const RoleAction: React.FC<propsAction> = function(props)
{

    const [ state, dispatch] = useReducer(RoleRedcucer, initialState);

    const factoryCreateAndUpdate = async function(role: Role, roleListResponse: RoleListResponse, sessionId: string, method: string)
    {
        let roleResponse: RoleResponse = initialState.roleResponse;

        try {
            sendSessionIdAuthorization(request, sessionId);
            const sendRequest = await request.post("/tec/role/"+method.toLowerCase(), role);
            roleResponse = sendRequest.data;

            if(roleResponse.strResponseCode != SUCCESS)
                throw new Error(roleResponse.strResponseMessage);

            if(method == METHOD.create)
            {
                roleListResponse.roles = [ ...roleListResponse.roles, roleResponse.role ];
            }
            else if(method == METHOD.update) 
            {
                roleListResponse.roles = roleListResponse.roles.map( role => role.idRole == roleResponse.role.idRole ? roleResponse.role: role  );
            }

            dispatch({ type: ROLE_SUCCESS,  payload: { roleResponse, roleListResponse } });

        }
        catch(error)
        {
            console.log(error);
            dispatch({ type: ROLE_FAIL, payload: { roleResponse }});

        }
        return roleResponse;

    }

    const createRol = async function(role: Role, roleListResponse: RoleListResponse, sessionId: string) : Promise<RoleResponse> 
    {
       return factoryCreateAndUpdate(role, roleListResponse, sessionId, METHOD.create);
    }   

    const getRols = async function(sessionId: string)
    {
        let roleListResponse: RoleListResponse = initialState.roleListResponse;
        
        try
        {
            sendSessionIdAuthorization(request, sessionId);
            const sendRequest = await request.get("/tec/role/list");
            roleListResponse = sendRequest.data;
            
            if(roleListResponse.strResponseCode != SUCCESS)
                throw new Error(roleListResponse.strResponseMessage);
            
            dispatch({ type: ROLE_LIST_SUCCESS, payload: { roleListResponse } });
            
        }
        catch(error: any)
        {
            dispatch({ type: ROLE_LIST_FAIL, payload: { roleListResponse } });
        }
    }

    const getRole = function (idRole: number)
    {
        dispatch({ type: GET_ROLE, payload: { idRole } });
    }
     
    const updateRole = async function(role: Role, roleListResponse: RoleListResponse, sessionId: string) : Promise<RoleResponse> 
    {
        return factoryCreateAndUpdate(role, roleListResponse, sessionId, METHOD.update);
    }

    const getAssignedRoles = async function(idUsuario: string, sessionId: string) 
    {
        let roleListAssignResponse: RoleListResponse = initialState.roleListResponse;
        
        try
        {
            sendSessionIdAuthorization(request, sessionId);
            const sendRequest = await request.get(`/tec/role/user/assigned/${idUsuario}`);
            roleListAssignResponse = sendRequest.data;
            
            if(roleListAssignResponse.strResponseCode != SUCCESS)
                throw new Error(roleListAssignResponse.strResponseMessage);
            
            dispatch({ type: GET_ROLES_ASSIGN, payload: { roleListAssignResponse } });
            
        }
        catch(error: any)
        {
            dispatch({ type: GET_ROLES_ASSIGN_ERROR, payload: { roleListAssignResponse } });
        }
    }

    const getUnassignedRoles = async function (idUsuario: string, sessionId: string) 
    {
        let roleListUnassignResponse: RoleListResponse = initialState.roleListResponse;
        
        try
        {
            sendSessionIdAuthorization(request, sessionId);
            const sendRequest = await request.get(`/tec/role/user/unassigned/${idUsuario}`);
            roleListUnassignResponse = sendRequest.data;
            
            if(roleListUnassignResponse.strResponseCode != SUCCESS)
                throw new Error(roleListUnassignResponse.strResponseMessage);
            
            dispatch({ type: GET_ROLES_UNASSIGNED, payload: { roleListUnassignResponse } });
            
        }
        catch(error: any)
        {
            dispatch({ type: GET_ROLES_UNASSIGNED_ERROR, payload: { roleListUnassignResponse } });
        }
    }

    const grantPermission = async function(roles: Array<RoleAssign>, sessionId: string) 
    {
        let roleGrantResponse: RoleResponse = initialState.roleGrantResponse;
        
        try
        {
            sendSessionIdAuthorization(request, sessionId);
            const sendRequest = await request.post(`/tec/role/user/assign`, roles);
            roleGrantResponse = sendRequest.data;

            if(roleGrantResponse.strResponseCode != SUCCESS)
                throw new Error(roleGrantResponse.strResponseMessage);

            dispatch({ type: ADD_ROLE, payload: { roleGrantResponse } });
        }
        catch(err)
        {
            dispatch({ type: ADD_ROLE_ERROR, payload: { roleGrantResponse } });
        }
        return roleGrantResponse;
    }

    const notgrantPermission = async function(roles: Array<RoleAssign>, sessionId: string) 
    {
        let roleGrantResponse: RoleResponse = initialState.roleGrantResponse;
        
        try
        {
            sendSessionIdAuthorization(request, sessionId);
            const sendRequest = await request.post(`/tec/role/user/unassign`, roles);
            roleGrantResponse = sendRequest.data;

            if(roleGrantResponse.strResponseCode != SUCCESS)
                throw new Error(roleGrantResponse.strResponseMessage);

            dispatch({ type: ADD_ROLE, payload: { roleGrantResponse } });
        }
        catch(err)
        {
            dispatch({ type: ADD_ROLE_ERROR, payload: { roleGrantResponse } });
        }
        return roleGrantResponse;
    }

    return (
        <RoleContext.Provider
            value={{
                role: state.role,
                roleResponse: state.roleResponse,
                roleGrantResponse: state.roleGrantResponse,
                roleListResponse: state.roleListResponse,
                roleListAssignResponse:  state.roleListAssignResponse,
                roleListUnassignResponse: state.roleListUnassignResponse,
                createRol,
                getRols,
                getRole,
                updateRole,
                getAssignedRoles,
                getUnassignedRoles,
                grantPermission,
                notgrantPermission
            }}
        >
            {props.children}
        </RoleContext.Provider>
    )

}

export default RoleAction;