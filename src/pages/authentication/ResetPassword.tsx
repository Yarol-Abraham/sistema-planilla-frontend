import { Link } from "react-router-dom";
import { Template } from "../../components/authentication/Template";
import {Button, FormGroup, Input, Label} from "reactstrap";

export default function ResetPassword() 
{
  return (
   <Template
    title={"Restablecer contraseña"}
    descripcion={"Introduzca su dirección de correo electrónico y le enviaremos un mensaje con instrucciones para restablecer su contraseña."}
   >
      <form className={"mt-4"}>
          <FormGroup>
              <Label for={"exampleInputEmail1"}>Correo electrónico</Label>
              <Input type={"email"} className={"mb-0"} id={"exampleInputEmail1"} placeholder={"Introducir correo electrónico"} />
          </FormGroup>
          <div className={"d-inline-block w-100"}>
              <Button color={"primary"} className={"float-right"} >Restablecer contraseña</Button>
          </div>
          <div className="sign-info">
                <span className="dark-color d-inline-block line-height-2">¿Ingresar por pregunta de usuario? 
                    {/* <Link to="/"> Click aqui</Link> */}
                    <a href="#">  Click aqui </a>
                </span>
            </div>
      </form>
   </Template>
  );
}
