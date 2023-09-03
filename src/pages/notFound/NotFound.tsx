import { NavLink } from 'react-router-dom';
import {Col, Container, Row} from "reactstrap";

export default function NotFound() 
{
  return (
    <Container fluid className={"p-0"}>
        <Row className="g-0">
            <Col md={12} className={"text-center"}>
                <div className={"iq-error"}>
                    <h1>400</h1>
                    <h4 className={"mb-0"}>Oops! No encotramos la pagina que buscas.</h4>
                    <p>La página solicitada no existe.</p>
                     <NavLink to={"/"} className={"btn btn-primary mt-3"}>
                        <i className={"ri-home-4-line"} /> Regresar
                    </NavLink> 

                </div>
            </Col>
        </Row>
    </Container>
  );
}
