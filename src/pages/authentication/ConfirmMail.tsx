import { Template } from "../../components/authentication/Template";
import {Button} from "reactstrap";

export default function ConfirmMail() 
{
  return (
   <Template>
         <img src={"/src/assets/images/mail.png"} alt="Mail Icon"/>
            <h1 className="mt-3 mb-0">Éxito !</h1>
            <p>Se ha enviado un correo electrónico a youremail@domain.com. Compruebe si ha recibido un correo electrónico de la empresa y haga clic en el enlace incluido para restablecer su contraseña.</p>
            <div className={"d-inline-block w-100"}>
                <Button color={"primary"} className={"mt-3"} >Restablecer Contraseña</Button>
            </div>
   </Template>
  );
}
