import { ReactNode, useEffect, useReducer } from "react";

import { AuthenticationContext } from "../AuthenticationContext";
import AuthenticationReducer from "../reducer/authenticationReducer";
import { initialState } from "../inteface/sessionInformation/sessionInformationProps";
import { SessionInformationCredential, SessionInformationResponse, UsuarioResponse } from "../inteface/sessionInformation/sessionInformation";
import { GET_PERFIL, SESSIONINFORMATION_FAIL, SESSIONINFORMATION_SUCCESS } from "../types/authenticationType";
import { SUCCESS, ERROR } from "../../utils/Methods";

import request, { sendSessionIdAuthorization } from "../../config/axios";

interface props {
    children: ReactNode
}

const AuthenticationAction: React.FC<props> = (props: props)  =>
{
    const [state, dispatch] = useReducer(AuthenticationReducer, initialState);
    const IGNORE_PATH: Array<String> = [ '/auth/login' ];

    // redireccionar a login
    const redireccionar = function()
    {
        let origin = window.location.origin;
        window.location.replace(origin+IGNORE_PATH[0]);
    }

    // verificar sesion de usuario
    const getSessionInformation = async function ()
    {
        let sessionInfomationObject: SessionInformationResponse = initialState.sessionInformationResponse;
        try{
            
            const sessionInfomation = localStorage.getItem("sessionInfomation");
            if(sessionInfomation != null)
            {
                sessionInfomationObject = JSON.parse(sessionInfomation); 
                if(sessionInfomationObject.strSessionId == undefined ) redireccionar();
                
                sendSessionIdAuthorization(request, sessionInfomationObject.strSessionId);
                await request.get("/tec/user/information");
                

                dispatch({
                    type: SESSIONINFORMATION_SUCCESS,
                    payload: {
                        sessionInformationResponse: sessionInfomationObject
                    }
                });

                return;
            }
            redireccionar();
        }catch(error: any)
        {
            console.log(error);
            
            sessionInfomationObject =  initialState.sessionInformationResponse;
             if(error.code == 'ERR_NETWORK' || error.response.data.status == 403)
             {
                sessionInfomationObject.strResponseCode = ERROR;
                sessionInfomationObject.strResponseMessage = "SESIÓN CADUCADA, VUELVE A INICIAR SESIÓN";
                dispatch({
                    type: SESSIONINFORMATION_FAIL,
                    payload: {
                        sessionInformationResponse: initialState.sessionInformationResponse
                    }
                });
                
                localStorage.removeItem("sessionInfomation");

                setTimeout(()=> {
                    redireccionar();
                }, 5000)
             }
             else{
                
                localStorage.removeItem("sessionInfomation");
               redireccionar();
             }   
            
        }
    }

    // iniciar sesión
    const postSessionInformation = async function(sessionInformationCredential: SessionInformationCredential): Promise<SessionInformationResponse>
    {
        let sessionInformationResponse: SessionInformationResponse = initialState.sessionInformationResponse;
        try {
            
            const sendRequest = await request.post("auth/login", sessionInformationCredential);
            sessionInformationResponse = sendRequest.data;

            if(sessionInformationResponse.strResponseCode === "00")
            {
                localStorage.setItem("sessionInfomation", JSON.stringify(sessionInformationResponse));
                dispatch({
                    type: SESSIONINFORMATION_SUCCESS,
                    payload: {
                        sessionInformationResponse
                    }
                });
            }
    
        } catch (error) {
            console.log("error en: AuthenticationAction.postSessionInformation() " + error);
            sessionInformationResponse.strResponseCode = "-1";
            sessionInformationResponse.strResponseMessage = "LO SENTIMOS, SERVICIO NO DISPONIBLE";
            dispatch({
                type: SESSIONINFORMATION_FAIL,
                payload: {
                    sessionInformationResponse
                }
            });
        }
        return sessionInformationResponse;
    }
    
    // seleccionar rol
    const selectRole = function(rol: number) : string
    {
        try{
            let sessionInformationResponse = JSON.parse( localStorage.getItem("sessionInfomation") || '{}');
            
            if(sessionInformationResponse.strSessionId == undefined) redireccionar();
            
            sessionInformationResponse.intRoleSelect = rol;
            
            localStorage.setItem("sessionInfomation", JSON.stringify(sessionInformationResponse));
            
            dispatch({
                type: SESSIONINFORMATION_SUCCESS,
                payload: {
                    sessionInformationResponse
                }
            });

            return SUCCESS;
        }
        catch(error)
        {
            redireccionar();
        }
        return ERROR;
    }

    // obtener datos de sesion
    const getInformationPerfil = async function(sessionInformationResponse: SessionInformationResponse)
    {
        try{
            sendSessionIdAuthorization(request, sessionInformationResponse.strSessionId);
            const sendRequest = await request.get("/tec/user/perfil");
            let usuarioResponse: UsuarioResponse = sendRequest.data;

            dispatch({
                type: GET_PERFIL,
                payload: {
                    usuarioResponse
                }
            });

        }
        catch(error)
        {
            console.log(error);
        }
    }

    // actualizar mis datos del perfil
    const updatePerfil = function()
    {
        try{

        }catch(error)
        {

        }
    } 

    // mostrar lista de usuarios


    // mostrar lista de roles


    useEffect(()=> {
        if(!IGNORE_PATH.includes(window.location.pathname)) getSessionInformation();
    }, [])

    return (
        <AuthenticationContext.Provider
            value={{
                sessionInformationResponse: state.sessionInformationResponse,
                sessionInformationCredential: state.sessionInformationCredential,
                usuarioResponse: state.usuarioResponse,
                getSessionInformation,
                postSessionInformation,
                selectRole,
                getInformationPerfil
            }}
        >
            {props.children}
        </AuthenticationContext.Provider>
    );

}


export default AuthenticationAction;
