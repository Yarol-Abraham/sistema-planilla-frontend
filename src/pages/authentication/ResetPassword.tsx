
import { useState } from 'react';
import { Template } from "../../components/authentication/Template";
import {Button, FormGroup, Input, Label} from "reactstrap";
import { useAuthenticationAction } from '../../hooks/UseAuthentication';
import { useNavigate } from 'react-router-dom';
import { SUCCESS } from '../../utils/Methods';

export default function ResetPassword() 
{
    const navigate = useNavigate();

    const { sendEmailResetPassword }  = useAuthenticationAction();

    const [ email, setEmail ] = useState("");
    const [ validateEmail, setValidateEmail ] = useState(false);
    const [ message, setMessage ] = useState("El campo no puede ir vacío");
    const [ isLogin, setIsLogin ] = useState(false);

    const handleSubmit = async function(e: any) 
    {
        e.preventDefault();
        
        setIsLogin(true);

        if(email.trim() == "")
        {
            setValidateEmail(true);
            return;
        }
        
        let result: any = await sendEmailResetPassword(email);

       setTimeout(()=> {
            if(result.strResponseCode == SUCCESS)
            {
                navigate(`/auth/confirm-mail?email=${email}`);
            }else
            {
                setValidateEmail(true);
                setMessage(result.strResponseMessage);
            }
            setIsLogin(!isLogin);

            setTimeout(()=> {
                setValidateEmail(false);
                setMessage("El campo no puede ir vacío");
            }, 5000);

       }, 1500);

    }

  return (
   <Template
    title={"Restablecer contraseña"}
    descripcion={"Introduzca su dirección de correo electrónico y le enviaremos un mensaje con instrucciones para restablecer su contraseña."}
   >
      <form className={"mt-4"} onSubmit={handleSubmit}>
          <FormGroup>
              <Label for={"exampleInputEmail1"}>Correo electrónico</Label>
              <Input 
                type={"email"} 
                className={"mb-0"} 
                id={"exampleInputEmail1"}
                onChange={(e)=> setEmail(e.target.value) } 
                placeholder={"Introducir correo electrónico"} 
            />
           { validateEmail && <span className='text-danger p-0 mx-2'>{message}</span> }
          </FormGroup>
          <div className={"d-inline-block w-100"}>
              <Button color={"primary"} className={`float-right  ${ !isLogin ? "" : " d-none "}`} >Restablecer contraseña</Button>
              {
                isLogin &&
                <img className='h-100' src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            }
          </div>
          <div className="sign-info">
                <span className="dark-color d-inline-block line-height-2">¿Ingresar por pregunta de usuario? 
                    <a href="#">  Click aqui </a>
                </span>
            </div>
      </form>
   </Template>
  );
}
