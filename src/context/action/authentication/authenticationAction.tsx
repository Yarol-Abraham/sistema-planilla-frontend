import { ReactNode, useEffect, useReducer } from "react";

import { AuthenticationContext } from "../../AuthenticationContext";
import AuthenticationReducer from "../../reducer/authentication/authenticationReducer";
import { initialState } from "../../models/sessionInformation/sessionInformationProps";
import { SessionInformationCredential, SessionInformationResponse, UsuarioResponse } from "../../models/sessionInformation/sessionInformation";
import { GET_PERFIL, SEND_EMAIL_ERROR, SEND_EMAIL_SUCCESS, SESSIONINFORMATION_FAIL, SESSIONINFORMATION_SUCCESS, UPDATE_PERFIL } from "../../types/authentication/authenticationType";
import { SUCCESS, ERROR } from "../../../utils/Methods";

import request, { sendSessionIdAuthorization } from "../../../config/axios";
import { EmailResponse } from "../../models/email/email";

interface props {
    children: ReactNode
}

const AuthenticationAction: React.FC<props> = (props: props)  =>
{
    const [state, dispatch] = useReducer(AuthenticationReducer, initialState);
    const IGNORE_PATH: Array<String> = [ '/auth/login', '/auth/recover-password', '/auth/confirm-password', '/auth/confirm-mail' ];

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

                if(sessionInformationResponse.listRoles.length > 0)
                {    
                    localStorage.setItem("sessionInfomation", JSON.stringify(sessionInformationResponse));
                    dispatch({
                        type: SESSIONINFORMATION_SUCCESS,
                        payload: {
                            sessionInformationResponse
                        }
                    });
                }
                else {
                    sessionInformationResponse.strResponseCode = "-1";
                    sessionInformationResponse.strResponseMessage = "ROL NO DEFINIDO, todavia no tienes un rol asignado, consulta a soporte@tec.com";
                    dispatch({
                        type: SESSIONINFORMATION_FAIL,
                        payload: {
                            sessionInformationResponse
                        }
                    });
                }
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
            console.log("perfil: ", error);
        }
    }

    // actualizar mis datos del perfil
    const updatePerfil = async function(usuarioResponse: UsuarioResponse, sessionInformationResponse: SessionInformationResponse): Promise<UsuarioResponse>
    {
        let getResponse: UsuarioResponse = initialState.usuarioResponse;
        try{
            // idUsuario
            sendSessionIdAuthorization(request, sessionInformationResponse.strSessionId);
            const sendRequest = await request.post("/tec/user/update", {  ...usuarioResponse.entUsuario, idUsuario: sessionInformationResponse.strIdUsuario  });
            getResponse = sendRequest.data;
            
            dispatch({
                type: UPDATE_PERFIL,
                payload: {
                    usuarioResponse: getResponse
                }
            });

        }catch(error)
        {
            console.log(error);
            getResponse.strResponseCode = ERROR;
            getResponse.strResponseMessage = "ERROR AL ACTUALIZAR DATOS, VUELVE A INTENTARLO MAS TARDE";
            dispatch({
                type: UPDATE_PERFIL,
                payload: {
                    usuarioResponse: getResponse
                }
            });
        }
        return getResponse;
    } 

    const sendEmailResetPassword =async function(email: string)
    {
        let emailResponse: EmailResponse = initialState.emailResponse;
        try{
            let sendRequest = await request.get(`/tec/email/recovery/password?email=${email}`);
            emailResponse = sendRequest.data;

            if(emailResponse.strResponseCode != SUCCESS)
                throw new Error(emailResponse.strResponseMessage);

            dispatch({ type: SEND_EMAIL_SUCCESS, payload: { emailResponse }});
        }
        catch(err)
        {
            console.log("Error: " + err);
            dispatch({ type: SEND_EMAIL_ERROR, payload: { emailResponse }})
        }
        return emailResponse;
    }

    const getValidateNewPassword = async function(token: string) 
    {
        let emailResponse: EmailResponse = initialState.emailResponse;
        try{
            let sendRequest = await request.get(`/tec/email/alert/newpassword?token=${token}`);
            emailResponse = sendRequest.data;

            if(emailResponse.strResponseCode != SUCCESS)
                throw new Error(emailResponse.strResponseMessage);

            dispatch({ type: SEND_EMAIL_SUCCESS, payload: { emailResponse }});
        }
        catch(err)
        {
            console.log("Error: " + err);
            dispatch({ type: SEND_EMAIL_ERROR, payload: { emailResponse }})
        }
        return emailResponse;
    }

    const getConfirmPassword = async (token: string) => 
    {
        let emailResponse: EmailResponse = initialState.emailResponse;
        try{
            let sendRequest = await request.get(`/tec/email/confirm/newpassword?token=${token}`);
            emailResponse = sendRequest.data;

            if(emailResponse.strResponseCode != SUCCESS)
                throw new Error(emailResponse.strResponseMessage);

            dispatch({ type: SEND_EMAIL_SUCCESS, payload: { emailResponse }});
        }
        catch(err)
        {
            console.log("Error: " + err);
            dispatch({ type: SEND_EMAIL_ERROR, payload: { emailResponse }})
        }
        return emailResponse;
    }

    useEffect(()=> {
        if(!IGNORE_PATH.includes(window.location.pathname)) getSessionInformation();
    }, [])

    return (
        <AuthenticationContext.Provider
            value={{
                emailResponse: state.emailResponse,
                sessionInformationResponse: state.sessionInformationResponse,
                sessionInformationCredential: state.sessionInformationCredential,
                usuarioResponse: state.usuarioResponse,
                getSessionInformation,
                postSessionInformation,
                selectRole,
                getInformationPerfil,
                updatePerfil,
                sendEmailResetPassword,
                getValidateNewPassword,
                getConfirmPassword
            }}
        >
            {props.children}
        </AuthenticationContext.Provider>
    );

}


export default AuthenticationAction;
