import { useReducer } from "react";

import RoleContext from "../../RoleContext";
import RoleRedcucer from "../../reducer/role/roleReducer";
import { propsAction, initialState } from "../../models/role/roleProps";
import { Role, RoleListResponse, RoleResponse } from "../../models/role/role";
import  request, { sendSessionIdAuthorization } from "../../../config/axios";
import { SUCCESS } from "../../../utils/Methods";
import { GET_ROLE, ROLE_FAIL, ROLE_LIST_FAIL, ROLE_LIST_SUCCESS, ROLE_SUCCESS, METHOD } from "../../types/role/roleTypes";

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

    return (
        <RoleContext.Provider
            value={{
                role: state.role,
                roleResponse: state.roleResponse,
                roleListResponse: state.roleListResponse,
                createRol,
                getRols,
                getRole,
                updateRole
            }}
        >
            {props.children}
        </RoleContext.Provider>
    )

}

export default RoleAction;