import { Template } from "../../components/authentication/Template";
import {Button, FormGroup, Input, Label} from "reactstrap";

export default function Role() 
{
  return (
   <Template>
        <img src={"/src/assets/images/usuario.png"} className={"rounded-circle"} alt="user Icon"/>
        <h4 className="mt-3 mb-0">Hola ! Yarol Abraham</h4>
        <p>Antes de continuar, Seleccionar el rol que quieres ingresar.</p>
        <form className={"mt-4"}>
            <FormGroup >
                <Label for={"select"}>¿Como quieres ingresar?</Label>
                   <Input type={"select"} className="form-control mb-3">
                        <option defaultValue="1">Administrador</option>
                        <option defaultValue="2">Recursos Humanos</option>
                        <option defaultValue="3">Finanzas</option>
                    </Input>
            </FormGroup>
            <div className={"d-inline-block w-100"}>
                <Button color={"primary"} className={"float-right"} >Iniciar Sesión</Button>
            </div>
        </form>
   </Template>
  );
}
