import { useEffect, useState } from "react";
import { Template } from "../../components/authentication/Template";

export default function ConfirmMail() 
{
  const [email, setEmail] = useState("");
  const getParamToken = function()
  {        
      const urlSearchParams = new URLSearchParams(window.location.search);
      const email = urlSearchParams.get("email");
      if(email)
        setEmail(email);
  }

  useEffect(()=> { getParamToken();  }, [])

  return (
   <Template>
         <img src={"/src/assets/images/mail.png"} alt="Mail Icon"/>
            <h1 className="mt-3 mb-0">Éxito !</h1>
            <p>Se ha enviado un correo electrónico a <strong className="fs-5">{email}</strong>. Compruebe si ha recibido un correo electrónico de la empresa y haga clic en el enlace incluido para restablecer su contraseña.</p>
   </Template>
  );
}
