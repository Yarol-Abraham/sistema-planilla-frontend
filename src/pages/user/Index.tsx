
import { FunctionComponent, useState } from 'react';
import { 
    Button,
    Card, 
    CardBody, 
    Col, 
    Container, 
    FormGroup, 
    Input, 
    Label, 
    Modal, 
    ModalBody, 
    ModalFooter, 
    ModalHeader,
     Row } from 'reactstrap';

import Layout from '../../layout/Layout';

import { Formik } from 'formik';
import * as Yup from "yup";
import ListData from './DataTable';

interface IAppProps {}

const User: FunctionComponent<IAppProps> = () => 
{

    const [ isOpen, setisOpen ] = useState(false);
    const toggle = ()=> setisOpen(!isOpen);
    return (
        <>
            <Layout>
                <Container>
                    <Row>
                        <Col lg={12}>
                            <Card className={"iq-card"}>
                                <CardBody className={"iq-card-body"}>
                                    <div className="d-flex justify-content-between align-items-center flex-wrap flex-column-reverse flex-md-row">
                                    
                                        <Col className='iq-todo-page col-12 col-md-8 col-lg-6'>
                                        <form className="position-relative">
                                            <div className="form-group mb-0">
                                                <input type="text" className="form-control todo-search" id="exampleInputEmail002"  placeholder="Search" />
                                                <a className="search-link" href="#"><i className="ri-search-line"></i></a>
                                            </div>
                                        </form>
                                        </Col>
                                        
                                        <Col  className={"d-flex justify-content-end mb-2 mb-md-0 col-12 col-md-4 col-lg-6"}>
                                            <div className=" todo-notification d-flex align-items-center">
                                            <button type="button" className="btn iq-bg-primary iq-waves-effect btn-lg" onClick={toggle} >
                                                    Agregar Usuario
                                                </button>
                                            </div>
                                        </Col>
                                    </div>
                                </CardBody>
                            </Card>
                            <Card className={"iq-card"}>
                            
                            </Card>
                        </Col>

                        <Modal isOpen={isOpen} toggle={toggle} className="modal-lg">
                            <ModalHeader toggle={toggle}>Nuevo Usuario</ModalHeader>
                            
                                <Formik
                                    initialValues={{ id: 1, title: '', userId: 1, categoryId: 1, priority: ''  }}
                                    onSubmit={async values => {
                                        await new Promise(resolve => setTimeout(resolve, 500));
                                        values.id = 1;
                                    }}
                                    validationSchema={
                                        Yup.object().shape({
                                            title: Yup.string().required("Required")
                                        })
                                    }
                                    >
                                    {({
                                    values,
                                    handleSubmit
                                }) => (
                                    <form noValidate onSubmit={handleSubmit}>
                                        <ModalBody>
                                        <Row >
                                            <Col md={6} className="mb-2">
                                                <img src="/src/assets/images/usuario_create.png" className="img-thumbnail" alt="..." style={{ width: "10rem", height: "10rem" }} />
                                            </Col>
                                            
                                            <Col></Col>
                                            <Col></Col>

                                            <Col md={6} >
                                                <FormGroup>
                                                    <Label for="validationDefault01" className='mb-1'>Nombre</Label>
                                                    <Input  type="text" id="validationDefault01" defaultValue={"Ingresar Nombre"}  style={{ height: '40px' }} required />
                                                </FormGroup>
                                            </Col>

                                            <Col md={6} >
                                                <FormGroup>
                                                    <Label for="validationDefault02" className='mb-1'>Apellido</Label>
                                                    <Input type="text" id="validationDefault02" defaultValue={"Ingresar Apellido"} style={{ height: '40px' }}  required />
                                                </FormGroup>    
                                            </Col>
                                            <Col md={6} >
                                                <FormGroup>
                                                    <Label htmlFor="exampleInputdate" className='mb-1'>Fecha de Nacimiento</Label>
                                                    <Input type="date" id="exampleInputdate" defaultValue="2019-12-18" style={{ height: '40px' }} />
                                                </FormGroup>
                                            </Col>
                                            <Col md={6} >
                                                <FormGroup>
                                                    <Label className='mb-1'>Genero</Label>
                                                    <Input type={"select"} style={{ height: '40px' }}>
                                                        <option defaultValue="">-- Seleccionar --</option>
                                                        <option defaultValue="1">Masculino</option>
                                                        <option defaultValue="2">Femenino</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col md={6} >
                                                <FormGroup >
                                                    <Label htmlFor="exampleInputEmail3" className='mb-1'>Correo Electr&otilde;nico</Label>
                                                    <Input type="email"  id="exampleInputEmail3" style={{ height: '40px' }} placeholder="Ingresar Correo" />
                                                </FormGroup>
                                            </Col>
                                            <Col md={6} >
                                                <FormGroup >
                                                    <Label htmlFor="telefono" className='mb-1'>Telefono</Label>
                                                    <Input type="number" id="telefono" placeholder="Telefono"  style={{ height: '40px' }} />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Col md={6} >
                                            <FormGroup className="form-group" >
                                                <Label className='mb-1'>Sucursal</Label>
                                                <Input type={"select"}  style={{ height: '40px' }}>
                                                    <option defaultValue="">-- Seleccionar --</option>
                                                    <option defaultValue="1">Sucursal 1</option>
                                                    <option defaultValue="2">Sucursal 2</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" onClick={ toggle }>Guardar Cambios</Button>{' '}
                                            <Button color="secondary" onClick={ toggle }>Cancelar</Button>
                                        </ModalFooter>
                                    </form>
                                )}
                                </Formik>               
                        </Modal>
                    </Row>
                    <Row>
                        <ListData />
                    </Row>
                </Container>    
            </Layout>
        </>
    );
};

export default User;
