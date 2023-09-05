
import * as React from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';

import Layout from '../../layout/Layout';

interface IAppProps {}

const Create: React.FunctionComponent<IAppProps> = () => 
{
  return (
    <>
        <Layout>
          <Row  className="bg-white" >
            <Col className="p-4"  md={12} >
                <Form>
                    <Row >
                        <Col md={12} className="mb-3">
                            <img src="/src/assets/images/perfil.jpg" className="img-thumbnail" alt="..." style={{ width: "10rem", height: "10rem" }} />
                        </Col>
                        <Col md={6} className="mb-3">
                            <Label for="validationDefault01">Nombre</Label>
                            <Input type="text" className="form-control" id="validationDefault01" defaultValue={"Ingresar Nombre"} required />
                        </Col>
                        <Col md={6} className="mb-3">
                            <Label for="validationDefault02">Apellido</Label>
                            <Input type="text" className="form-control" id="validationDefault02" defaultValue={"Ingresar Apellido"}  required />
                        </Col>
                        <Col md={6} className="mb-3">
                            <FormGroup className="form-group">
                                <Label htmlFor="exampleInputdate">Fecha de Nacimiento</Label>
                                <Input type="date" className="form-control" id="exampleInputdate" defaultValue="2019-12-18" bsSize="sm" />
                            </FormGroup>
                        </Col>
                        <Col md={6} className="mb-3">
                            <FormGroup className="form-group">
                                <Label>Genero</Label>
                                <Input type={"select"} className="form-control " style={{ height: '45px' }}>
                                    <option defaultValue="">-- Seleccionar --</option>
                                    <option defaultValue="1">Masculino</option>
                                    <option defaultValue="2">Femenino</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={6} className="mb-3">
                            <FormGroup  className="form-group">
                                <Label htmlFor="exampleInputEmail3">Correo Electr&otilde;nico</Label>
                                <Input type="email" className="form-control" id="exampleInputEmail3" placeholder="Ingresar Correo" />
                            </FormGroup>
                        </Col>
                        <Col md={6} className="mb-3">
                            <FormGroup  className="form-group">
                                <Label htmlFor="telefono">Telefono</Label>
                                <Input type="number" className="form-control" id="telefono" placeholder="Telefono" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Col md={6} className='mb-3'>
                        <FormGroup className="form-group">
                            <Label>Sucursal</Label>
                            <Input type={"select"} className="form-control " style={{ height: '45px' }}>
                                <option defaultValue="">-- Seleccionar --</option>
                                <option defaultValue="1">Sucursal 1</option>
                                <option defaultValue="2">Sucursal 2</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <FormGroup className="form-group">
                        <Button color={"primary"} type="submit">Crear</Button>
                    </FormGroup>
                </Form>
            </Col>
          </Row>
    </Layout>


    </>
  );
};

export default Create;
