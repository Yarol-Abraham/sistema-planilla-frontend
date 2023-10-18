
import { useEffect, useState } from "react";
import { Template } from "../../components/authentication/Template";
import {Button, FormGroup} from "reactstrap";
import { useAuthenticationAction } from "../../hooks/UseAuthentication";
import { ERROR } from "../../utils/Methods";
import { useNavigate } from "react-router-dom";

export default function ConfirmNewPassword() 
{
    const { getValidateNewPassword, getConfirmPassword } = useAuthenticationAction();
    const navigate = useNavigate();

    const [ password, setPassword ] = useState("");
    const [ code, setCode ] = useState("");
    const [ token, setToken ] = useState("");
    const [ isLogin, setIsLogin ] = useState(false);
    const [ message, setMessage ] = useState("");
    const [ success, setSuccess ] = useState("");

    const getParamToken = async function()
    {        
        const urlSearchParams = new URLSearchParams(window.location.search);
        const token = urlSearchParams.get("token");
        if(token)
        {
            let result: any = await getValidateNewPassword(token);
            setToken(token);
            setPassword(result.strResponseMessage);
            setCode(result.strResponseCode);
        }
    }

    const handlerSubmit = function(e: any) 
    {
        e.preventDefault();

        if(token.trim() == "")
        {
            alert("token inválido");
            return;
        }
        setIsLogin(true);
        
        setTimeout( async ()=> {
          
            let result: any = await getConfirmPassword(token);
            setMessage(result.strResponseMessage);
            setSuccess(result.strResponseCode);
            setIsLogin(false);
        }, 1500);

    }

    const backLogin =()=> navigate("/auth/login");

    useEffect(()=>{ getParamToken() }, [])

  return (
   <Template
    title={  code == ERROR ?  "" : "Confirmación"}
    descripcion={ code == ERROR ?  "" : "Ya casi, ahora puedes ver la nueva contraseña generada, presiona en el boton confirmar para finalizar el proceso."}
   >
     {
        code == ERROR ? (
            <div className="alert alert-warning" role="alert">
                <p className="p-0 text-center mb-0">{password}</p>
            </div>
        ) : (
            <form className={"mt-4"} onSubmit={handlerSubmit}>
               {
                success.trim() != "" ? (
                    <div className={`alert alert-${ success == ERROR ? "danger" : "success" }`}>
                        <p className="mb-0">{message}</p>
                        <Button  color={"success"} onClick={backLogin}>Iniciar Sesion</Button>
                    </div>
                ): (
                   <>
                     <FormGroup>
                        <p className="fs-4 border border-radius p-3 text-center text-black fw-bold">{password}</p>
                    </FormGroup>
                    <div className={"d-flex justify-content-end w-100"}>
                        <Button color={"primary"} className={`float-right  ${ !isLogin ? "" : " d-none "}`} >Confirmar</Button>
                        {
                            isLogin &&
                            <img className='h-100' src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>
                   </>
                )
               }
            </form>
        )
     }
   </Template>
  );
}
