import { ReactNode, useReducer } from "react";

import UserContext from "../../UserContext";
import UserReducer from "../../reducer/user/userReducer";
import { initialState } from "../../models/user/userProps";
import { UsuarioResponse } from "../../models/sessionInformation/sessionInformation";
import request, { sendSessionIdAuthorization } from "../../../config/axios";
import { ListUsuarioResponse, UsuarioCreate } from "../../models/user/user";
import { SUCCESS } from "../../../utils/Methods";
import { USER_FAIL, USER_SUCCESS, DISABLE_FAIL, DISABLE_USER, GET_USER, LIST_USER_FAIL, LIST_USER_SUCCESS, METHOD } from "../../types/user/userTypes";
import { AxiosResponse } from "axios";

interface props {
    children: ReactNode
}

const UserAction: React.FC<props> = function(props)
{

    const [ state, dispatch ] = useReducer(UserReducer, initialState);

    const factoryCreateAndUpdate = async ( usuarioCreate: UsuarioCreate, listUsuarioResponse: ListUsuarioResponse, SessionId: string, method: string) => 
    {
        
        let usuarioResponse: UsuarioResponse = initialState.usuarioResponse;
        try
        {
            sendSessionIdAuthorization(request, SessionId);
            const sendRequest = await request.post(`/tec/user/${method.toLocaleLowerCase()}`, usuarioCreate);
            usuarioResponse =  sendRequest.data;
           
            if(usuarioResponse.strResponseCode != SUCCESS) 
                throw new Error(usuarioResponse.strResponseMessage);

            if(usuarioResponse.strResponseCode == SUCCESS)
            {
                if(method == METHOD.create)
                {
                    listUsuarioResponse.usuarios = [ ...listUsuarioResponse.usuarios, usuarioResponse.entUsuario];
                }
                else if(method == METHOD.update)
                {
                    listUsuarioResponse.usuarios = listUsuarioResponse.usuarios.map(usuario => usuario.idUsuario == usuarioResponse.entUsuario.idUsuario ? usuarioResponse.entUsuario : usuario );
                }
            }
            dispatch({ type: USER_SUCCESS, payload: { usuarioResponse, listUsuarioResponse } });
        }
        catch(error)
        {
            dispatch({ type: USER_FAIL, payload: { usuarioResponse } });
        }
        return usuarioResponse;    
    }

    const createUser = async function(usuarioCreate: UsuarioCreate, listUsuarioResponse: ListUsuarioResponse, SessionId: string) : Promise<UsuarioResponse> 
    {
        return factoryCreateAndUpdate(usuarioCreate, listUsuarioResponse, SessionId, METHOD.create);
    }

    const toUporDown = async function (listUsuarioResponse: ListUsuarioResponse, response: AxiosResponse)
    {
        let usuarioResponse: UsuarioResponse = initialState.usuarioResponse;
        try{
           
            usuarioResponse = response.data;

            if(usuarioResponse.strResponseCode != SUCCESS)
                throw new Error(usuarioResponse.strResponseMessage);

            listUsuarioResponse.usuarios =  listUsuarioResponse.usuarios.map( el => el.idUsuario == usuarioResponse.entUsuario.idUsuario ? usuarioResponse.entUsuario : el );
          
            dispatch({ type: DISABLE_USER, payload: { usuarioResponse, listUsuarioResponse } });
            return usuarioResponse;
        }   
        catch(error)
        {   
            dispatch({ type: DISABLE_FAIL, payload: { usuarioResponse } });
            return usuarioResponse;
        }  
    }

    const deleteUser = async function(idUsuario: string, listUsuarioResponse: ListUsuarioResponse, SessionId: string) 
    {
        sendSessionIdAuthorization(request, SessionId);
        const sendRequest =  await request.delete(`/tec/user/delete/`+idUsuario);
       return (await toUporDown(listUsuarioResponse, sendRequest)).strResponseCode;
    }

    const updateUpUser = async function(idUsuario: string, listUsuarioResponse: ListUsuarioResponse, SessionId: string) 
    {
        sendSessionIdAuthorization(request, SessionId);
        const sendRequest =  await request.put(`/tec/user/release/`+idUsuario);
       return (await toUporDown(listUsuarioResponse, sendRequest)).strResponseCode;
    }

    const updateUser = async function(usuarioCreate: UsuarioCreate, listUsuarioResponse: ListUsuarioResponse, SessionId: string) 
    {
        return factoryCreateAndUpdate(usuarioCreate, listUsuarioResponse, SessionId, METHOD.update);
    }

    const listuser = async function(SessionId: string) 
    {
        let listUsuarioResponse: ListUsuarioResponse = initialState.listUsuarioResponse;
        try
        {
            sendSessionIdAuthorization(request, SessionId);
            const sendRequest = await request.get("/tec/user/list");
            listUsuarioResponse = sendRequest.data;
            
            if(listUsuarioResponse.strResponseCode != SUCCESS) 
                throw new Error(listUsuarioResponse.strResponseMessage);

            dispatch({ type: LIST_USER_SUCCESS, payload: { listUsuarioResponse } });
        }   
        catch(error)
        { 
            dispatch({ type: LIST_USER_FAIL, payload: { listUsuarioResponse } });
        } 
    }

    const getUser = function(idUsuario: string)
    {
        dispatch({ type: GET_USER, payload: { idUsuario } });
    }
    
    return (
        <UserContext.Provider
            value={{
                usuario: state.usuario,
                usuarioResponse: state.usuarioResponse,
                listUsuarioResponse: state.listUsuarioResponse,
                createUser,
                deleteUser,
                updateUpUser,
                updateUser,
                getUser,
                listuser
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserAction;