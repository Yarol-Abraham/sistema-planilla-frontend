import { ReactNode, useReducer } from "react";

import RoleContext from "../../RoleContext";
import RoleRedcucer from "../../reducer/role/roleReducer";
import { initialState } from "../../models/role/roleProps";
import { Role, RoleListResponse, RoleResponse } from "../../models/role/role";
import  request, { sendSessionIdAuthorization } from "../../../config/axios";
import { SUCCESS } from "../../../utils/Methods";
import { ROLE_FAIL, ROLE_LIST_FAIL, ROLE_LIST_SUCCESS, ROLE_SUCCESS } from "../../types/role/roleTypes";

interface props {
    children: ReactNode
}

const RoleAction: React.FC<props> = function(props)
{

    const [ state, dispatch] = useReducer(RoleRedcucer, initialState);

    const createRol = async function(role: Role, roleListResponse: RoleListResponse, sessionId: string) : Promise<RoleResponse> 
    {
        let roleResponse: RoleResponse = initialState.roleResponse;

        try {
            sendSessionIdAuthorization(request, sessionId);
            const sendRequest = await request.post("/tec/role/create", role);
            roleResponse = sendRequest.data;

            roleListResponse.roles = [ ...roleListResponse.roles , role ];

            if(roleResponse.strResponseCode == SUCCESS)
            {
                dispatch({
                    type: ROLE_SUCCESS,
                    payload: {
                        roleResponse,
                        roleListResponse
                    }
                });
            }
            else 
            {
                dispatch({
                    type: ROLE_FAIL,
                    payload: {
                        roleResponse
                    }
                });
            }

        }
        catch(error)
        {
            console.log(error);
            
            dispatch({
                type: ROLE_FAIL,
                payload: {
                    roleResponse
                }
            });
        }
        return roleResponse;
    }   

    const getRols = async function(sessionId: string)
    {
        let roleListResponse: RoleListResponse = initialState.roleListResponse;
        try
        {
            sendSessionIdAuthorization(request, sessionId);
            const sendRequest = await request.get("/tec/role/list");
            roleListResponse = sendRequest.data;
            
            if(roleListResponse.strResponseCode == SUCCESS)
            {
                dispatch({
                    type: ROLE_LIST_SUCCESS,
                    payload: {
                        roleListResponse
                    }
                });
            }
            else 
            {
                dispatch({
                    type: ROLE_LIST_FAIL,
                    payload: {
                        roleListResponse
                    }
                });
            }

        }
        catch(error)
        {
            console.log(error);
            dispatch({
                type: ROLE_LIST_FAIL,
                payload: {
                    roleListResponse
                }
            });
        }
    }

    return (
        <RoleContext.Provider
            value={{
                roleResponse: state.roleResponse,
                roleListResponse: state.roleListResponse,
                createRol,
                getRols
            }}
        >
            {props.children}
        </RoleContext.Provider>
    )

}

export default RoleAction;