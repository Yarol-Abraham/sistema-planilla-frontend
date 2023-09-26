import { ReactNode, useReducer } from "react";

import UserContext from "../../UserContext";
import UserReducer from "../../reducer/user/userReducer";
import { initialState } from "../../models/user/userProps";
import { UsuarioResponse } from "../../models/sessionInformation/sessionInformation";
import request, { sendSessionIdAuthorization } from "../../../config/axios";
import { UsuarioCreate } from "../../models/user/user";
import { SUCCESS } from "../../../utils/Methods";
import { CREATE_FAIL, CREATE_SUCCESS } from "../../types/user/userTypes";

interface props {
    children: ReactNode
}

const UserAction: React.FC<props> = function(props)
{

    const [ state, dispatch ] = useReducer(UserReducer, initialState);

    const createUser = async function( usuarioCreate: UsuarioCreate, SessionId: string) : Promise<UsuarioResponse> 
    {
        let usuarioResponse: UsuarioResponse = initialState.usuarioResponse;
        try
        {
            sendSessionIdAuthorization(request, SessionId);
            const sendRequest = await request.post("/tec/user/create", usuarioCreate);
            usuarioResponse =  sendRequest.data;

            if(usuarioResponse.strResponseCode == SUCCESS)
            {
                dispatch({
                    type: CREATE_SUCCESS,
                    payload: {
                        usuarioResponse
                    }
                });
            }
            else{
                
                dispatch({
                    type: CREATE_FAIL,
                    payload: {
                        usuarioResponse
                    }
                });
            }

        }
        catch(error){
            console.log(error);
            
            dispatch({
                type: CREATE_FAIL,
                payload: {
                    usuarioResponse
                }
            });
        }
        return usuarioResponse;
    }

    return (
        <UserContext.Provider
            value={{
                usuarioCreate: state.usuarioCreate,
                usuarioResponse: state.usuarioResponse,
                createUser
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserAction;