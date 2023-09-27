import { ReactNode, useReducer } from "react";

import UserContext from "../../UserContext";
import UserReducer from "../../reducer/user/userReducer";
import { initialState } from "../../models/user/userProps";
import { UsuarioResponse } from "../../models/sessionInformation/sessionInformation";
import request, { sendSessionIdAuthorization } from "../../../config/axios";
import { ListUsuarioResponse, UsuarioCreate } from "../../models/user/user";
import { SUCCESS } from "../../../utils/Methods";
import { CREATE_FAIL, CREATE_SUCCESS, DISABLE_FAIL, DISABLE_USER, LIST_USER_FAIL, LIST_USER_SUCCESS } from "../../types/user/userTypes";

interface props {
    children: ReactNode
}

const UserAction: React.FC<props> = function(props)
{

    const [ state, dispatch ] = useReducer(UserReducer, initialState);

    const createUser = async function( usuarioCreate: UsuarioCreate, listUsuarioResponse: ListUsuarioResponse, SessionId: string) : Promise<UsuarioResponse> 
    {
        let usuarioResponse: UsuarioResponse = initialState.usuarioResponse;
        try
        {
            sendSessionIdAuthorization(request, SessionId);
            const sendRequest = await request.post("/tec/user/create", usuarioCreate);
            usuarioResponse =  sendRequest.data;
            listUsuarioResponse.usuarios = [ ...listUsuarioResponse.usuarios, usuarioResponse.entUsuario];
            if(usuarioResponse.strResponseCode == SUCCESS)
            {
                dispatch({
                    type: CREATE_SUCCESS,
                    payload: {
                        usuarioResponse,
                        listUsuarioResponse
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

    const deleteUser = async function(idUsuario: string, listUsuarioResponse: ListUsuarioResponse, SessionId: string) 
    {
        let usuarioResponse: UsuarioResponse = initialState.usuarioResponse;
        try{
            sendSessionIdAuthorization(request, SessionId);
            const sendRequest = await request.delete("/tec/user/delete/"+idUsuario);
            usuarioResponse = sendRequest.data;
            // listUsuarioResponse.usuarios = [ ...listUsuarioResponse.usuarios, usuarioResponse.entUsuario  ]
            listUsuarioResponse.usuarios =  listUsuarioResponse.usuarios.map( el => el.idUsuario == usuarioResponse.entUsuario.idUsuario ? usuarioResponse.entUsuario : el );
            if(usuarioResponse.strResponseCode == SUCCESS)
            {
                dispatch({
                    type: DISABLE_USER,
                    payload: {
                        usuarioResponse,
                        listUsuarioResponse
                    }
                });
            }
            else{
                
                dispatch({
                    type: DISABLE_FAIL,
                    payload: {
                        usuarioResponse
                    }
                });
            }
        }   
        catch(error)
        {   
            console.log(error);
            dispatch({
                type: DISABLE_FAIL,
                payload: {
                    usuarioResponse
                }
            });
        } 
    }

    const listuser = async function(SessionId: string) 
    {
        let listUsuarioResponse: ListUsuarioResponse = initialState.listUsuarioResponse;
        try
        {
            sendSessionIdAuthorization(request, SessionId);
            const sendRequest = await request.get("/tec/user/list");
            listUsuarioResponse = sendRequest.data;
            if(listUsuarioResponse.strResponseCode == SUCCESS)
            {
                dispatch({
                    type: LIST_USER_SUCCESS,
                    payload: {
                        listUsuarioResponse
                    }
                });
            }
            else{
                dispatch({
                    type: LIST_USER_FAIL,
                    payload: {
                        listUsuarioResponse
                    }
                });
            }
        }   
        catch(error)
        {
            console.log(error);
            dispatch({
                type: LIST_USER_FAIL,
                payload: {
                    listUsuarioResponse
                }
            });
        } 
    }

    return (
        <UserContext.Provider
            value={{
                usuarioResponse: state.usuarioResponse,
                listUsuarioResponse: state.listUsuarioResponse,
                createUser,
                deleteUser,
                listuser
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserAction;