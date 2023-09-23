import React, { useState, useEffect } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap';
import Layout from '../../layout/Layout';

import { MODE_ACTION } from '../../models/perfil/CreateModal';
import CreateModal from "../../components/perfil/Modal";

import { useAuthenticationAction } from '../../hooks/UseAuthentication';

export default function Perfil() {

    const { getInformationPerfil, sessionInformationResponse, usuarioResponse  } = useAuthenticationAction();

    const [isOpen, setisOpen] = useState(false);
    const toggle = () => setisOpen(!isOpen);
      
    useEffect(()=> {
        if(sessionInformationResponse.strSessionId != undefined && sessionInformationResponse.strSessionId != "" ) 
        {
            getInformationPerfil(sessionInformationResponse);
        }
     }, [sessionInformationResponse])


    return (
        <Layout>
            <Container>
                <Row>
                    <Col lg={6}>
                        <Card className={'iq-card custom-zindex'}>
                            <CardHeader>
                                <h3 className='mx-2 fw-bold'>Mi perfil</h3>
                            </CardHeader>
                            <CardBody className={'iq-card-body '}>
                            <Row>
                            <Col lg={5}>
                                <FormGroup>
                                    <Label for='nombre'>Nombre</Label>
                                    <Input
                                        type='text'
                                        name='nombre'
                                        id='nombre'
                                        value={ usuarioResponse.entUsuario.nombre}
                                       
                                        disabled
                                    />
                                </FormGroup>
                                </Col >
                                <Col lg={5}>
                                <FormGroup>
                                    <Label for='apellido'>Apellido</Label>
                                    <Input
                                        type='text'
                                        name='apellido'
                                        id='apellido'
                                        value={ usuarioResponse.entUsuario.apellido}
                                       
                                        disabled
                                    />
                                </FormGroup>
                                </Col >
                                </Row> 
                                <Row> 
                                <Col lg={5}>
                                <FormGroup>
                                    <Label for='correo'>Correo</Label>
                                    <Input
                                        type='email'
                                        name='correo'
                                        id='correo'
                                        value={ usuarioResponse.entUsuario.correoElectronico}
                                       
                                        disabled
                                    />
                                </FormGroup>
                                </Col>
                            <Col lg={5}>
                        <FormGroup>
                            <Label for='telefono'>Teléfono</Label>
                            <Input
                                type='tel'
                                name='telefono'
                                id='telefono'
                                value={usuarioResponse.entUsuario.telefonoMovil}
                               
                                disabled
                            />
                        </FormGroup>
                    </Col>
                    </Row> 
                    <Row>
                    <Col lg={5}>
                                <FormGroup>
                                    <Label for='fechaNacimiento'>Fecha de Nacimiento</Label>
                                    <Input
                                        type='date'
                                        name='fechaNacimiento'
                                        id='fechaNacimiento'
                                        value={ usuarioResponse.entUsuario.fechaNacimiento}
                                       
                                        disabled
                                    />
                                </FormGroup>
                    </Col>
                    <Col lg={5}>
                        <FormGroup>
                            <Label for='genero'>Género</Label>
                            <Input
                                type='select'
                                name='genero'
                                id='genero'
                                value={ usuarioResponse.entUsuario.idGenero}
                               
                                disabled
                            >
                                <option value='masculino'>Masculino</option>
                                <option value='femenino'>Femenino</option>
                                <option value='otro'>Otro</option>
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>

                <Row className="justify-content-end">
                    <Col lg={6}>
                        <Button color="primary" onClick={toggle}>Editar</Button>
                        <CreateModal isOpen={isOpen} toggleF={toggle} mode={MODE_ACTION.UPDATE} />
                    </Col>
                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    
                    <Col lg={6}>
                     <div className="text-center mt-4">
             <img src="/src/assets/images/usuario.png" className="img-thumbnail" alt="..." style={{ width: "10rem", height: "10rem" }} />
             <br />
                   <Button color="primary" className="mt-2">Choose File</Button>
                   </div>
                  </Col>

                </Row>
                
            </Container>
        </Layout>
    );
}
