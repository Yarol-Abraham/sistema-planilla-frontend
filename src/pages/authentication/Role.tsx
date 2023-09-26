import { Template } from "../../components/authentication/Template";
import {Button, FormGroup, Input, Label} from "reactstrap";
import { useAuthenticationAction } from "../../hooks/UseAuthentication";
import { useState } from "react";
import { ListRole } from "../../context/models/sessionInformation/sessionInformation";
import { SUCCESS } from "../../utils/Methods";
import { useNavigate } from 'react-router-dom';

export default function Role() 
{
    const { sessionInformationResponse, selectRole } = useAuthenticationAction();
    
    const navigate = useNavigate();

    const [ role, setRole ] = useState(0);
    const [ message, setMessage ] = useState("");
   
    const handleRole = ()=> 
    {
        console.log("role: " +( role > 0));
        if(role > 0)
        {
            let matchRole: ListRole[] = sessionInformationResponse.listRoles.filter(el => el.idRole == role);
            if(matchRole.length > 0)
            {
                let result = selectRole(matchRole[0].idRole);
                if(result == SUCCESS)
                {
                    navigate("/");
                }
                else{
                    setMessage("ERROR AL SELECCIONAR UN ROL, VUELVE A INTENTARLO");
                }
            }
            else
            {
                setMessage("NO SE HA SELECCIONADO UN ROL O EL ROL ES INVÁLIDO");
            }
        }
        else {
            setMessage("NO SE HA SELECCIONADO UN ROL O EL ROL ES INVÁLIDO");
        }
     
        setTimeout(()=> { setMessage(""); }, 3000);
        
    };
    
    return (
    <Template>
        <img src={"/src/assets/images/usuario.png"} className={"rounded-circle"} alt="user Icon"/>
        <h4 className="mt-3 mb-0">Hola ! {sessionInformationResponse.strNombre}</h4>
        <p>Antes de continuar, Seleccionar el rol que quieres ingresar.</p>
        <form className={"mt-4"}>
        { 
          message != "" && <div className='alert alert-danger m-0 p-0' role='alert'>
            <span className='p-1 m-1'>{message}</span>
          </div>
        }
            <FormGroup >
                <Label for={"select"}>¿Como quieres ingresar?</Label>
                    <Input 
                        type={"select"} 
                        id="select" 
                        name="select" 
                        onChange={(e)=> setRole(+e.target.value) }
                        className="form-control mb-3"
                    >
                        <option value={0}> -- Seleccionar -- </option>
                        {
                            sessionInformationResponse.listRoles?.map(el => (
                                <option key={el.idRole} value={el.idRole} >{el.nombre}</option>
                            ))
                        }
                    </Input>
            </FormGroup>
            <div className={"d-inline-block w-100"}>
                <Button color={"primary"} className={"float-right"} onClick={handleRole} >Iniciar Sesión</Button>
            </div>
        </form>
    </Template>
);
}
