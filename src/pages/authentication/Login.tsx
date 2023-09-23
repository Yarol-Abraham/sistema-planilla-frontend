
import { useState  } from 'react';
import { Template } from '../../components/authentication/Template';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useAuthenticationAction } from '../../hooks/UseAuthentication';
import { SessionInformationCredential } from '../../context/inteface/sessionInformation';

import { SUCCESS } from '../../utils/Methods';

export default function Login() 
{
  const { postSessionInformation, selectRole } = useAuthenticationAction();
  
  const navigate = useNavigate();

  const [ submitted, setSubmitted ] = useState(false);
  const [ isLogin, setIsLogin ] = useState(false);
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");

  const [ messageResponse, setMessageResponse ] = useState("");
 
  function handleChange(params:string, e: any) 
  {
    if(params === 'username') setUsername(e.target.value);
    if(params === 'password') setPassword(e.target.value);
  }

  async function handleSubmit(e: any)
  {
    e.preventDefault();
    
    setMessageResponse("");

    if((username == "" || username == null) || (password == "" || password == null) )
    {
      setSubmitted(!submitted);
      return;
    }

    setIsLogin(!isLogin);
    setSubmitted(!submitted);

    const sessionInformationCredentials: SessionInformationCredential = {
      correoElectronico: username,
      password: password
    }

    const sessionInformationResponse: any = await postSessionInformation(sessionInformationCredentials);
  
    setTimeout(()=> {
      setIsLogin(false);
      if(sessionInformationResponse.strResponseCode == SUCCESS)
      {
        if(sessionInformationResponse.listRoles.length > 1)
        {
          navigate("/auth/role");
        } 
        else{
          if(sessionInformationResponse.listRoles.length > 0)
          {
            selectRole(sessionInformationResponse.listRoles[0].idRole);
            navigate("/");
          }
          else{
            setMessageResponse("ROL NO DEFINIDO, todavia no tienes un rol asignado, consulta a soporte@tec.com");
            setTimeout(()=>setMessageResponse(""), 4000);
          }
        }
      }
      else{
        setMessageResponse(sessionInformationResponse.strResponseMessage);
      }
    }, 2000)
    
  }
  return (
    <>
      <Template 
          title={"Iniciar sesión"} 
          descripcion={"Ingrese su dirección de correo electrónico y contraseña para acceder al panel de administración."}
        >
        { 
          messageResponse != "" && <div className='alert alert-danger m-0 p-0' role='alert'>
            <span className='p-1 m-1'>{messageResponse}</span>
          </div>
        }
       <form name="form" onSubmit={handleSubmit} className="mt-4">
              <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                  <label htmlFor="username">Correo electrónico</label>
                  <input type="text" className="form-control mb-0" name="username" value={username} onChange={(e)=> handleChange("username", e)} />
                  {submitted && !username &&
                      <div className="help-block">El correo electr&otilde;nico es requerido</div>
                  }
              </div>
              <div className={'mb-1 form-group' + (submitted && !password ? ' has-error' : '')}>
                  <div className='d-flex justify-content-between'>
                    <label htmlFor="password">Contrase&ntilde;a</label>
                    <Link to="/auth/recover-password">¿Has olvidado tu contraseña?</Link>
                  </div>
                  <input type="password" className="form-control mb-0" name="password" value={password} onChange={(e) => handleChange("password", e) } />
                  {submitted && !password &&
                      <div className="help-block">La contrase&ntilde;a es requerida</div>
                  }
              </div>
              <div className="d-flex justify-content-end align-items-center ">
                  <button type="submit" className={`btn btn-primary ${ !isLogin ? "" : " d-none "}`} >Ingresar</button>
                  {
                    isLogin &&
                    <img className='h-100' src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                  }
              </div>                    
          </form>
      </Template>
    </>
  );
}
