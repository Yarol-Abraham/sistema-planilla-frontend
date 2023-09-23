import { ReactNode, useEffect, useReducer } from "react";

import { AuthenticationContext } from "../AuthenticationContext";
import AuthenticationReducer from "../reducer/authenticationReducer";
import { initialState } from "../inteface/sessionInformationProps";
import { SessionInformationCredential, SessionInformationResponse } from "../inteface/sessionInformation";
import { SESSIONINFORMATION_SUCCESS } from "../types/authenticationType";
import { SUCCESS, ERROR } from "../../utils/Methods";

import request from "../../config/axios";

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
    const getSessionInformation = function ()
    {
        try{
            
            const sessionInfomation = localStorage.getItem("sessionInfomation");
            if(sessionInfomation != null)
            {
                const sessionInfomationObject: SessionInformationResponse = JSON.parse(sessionInfomation); 
                if(sessionInfomationObject.strSessionId == undefined) redireccionar();
                
                dispatch({
                    type: SESSIONINFORMATION_SUCCESS,
                    payload: {
                        sessionInformationResponse: sessionInfomationObject
                    }
                });

                return;
            }
            redireccionar();
        }catch(error)
        {
            redireccionar();
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

    useEffect(()=> {
        if(!IGNORE_PATH.includes(window.location.pathname)) getSessionInformation();
    }, [])

    return (
        <AuthenticationContext.Provider
            value={{
                sessionInformationResponse: state.sessionInformationResponse,
                sessionInformationCredential: state.sessionInformationCredential,
                getSessionInformation,
                postSessionInformation,
                selectRole
            }}
        >
            {props.children}
        </AuthenticationContext.Provider>
    );

}


export default AuthenticationAction;
