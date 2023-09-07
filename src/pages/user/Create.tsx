
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
import { Form } from 'react-router-dom';

interface IAppProps {}

const Create: FunctionComponent<IAppProps> = () => 
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
                                    //   this.props.addTaskAction(values);

                                    //    this.toggleModal();
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
            </Container>
            {/* <Row  className="bg-white" >
            <h4 className="mb-3 bg-light p-2 rounded-2">Nuevo Usuario</h4>
                <Col className="p-4"  md={12} >
                    <Form>
                        <Row >

                            <Col md={6} className="mb-3">
                                <img src="/src/assets/images/usuario_create.png" className="img-thumbnail" alt="..." style={{ width: "10rem", height: "10rem" }} />
                            </Col>
                            
                            <Col></Col>

                            <Col md={6} className="mb-3">
                                <FormGroup className="form-group">
                                    <Input type="file" className="custom-file-input" id="customFile" style={{ height: '55px' }} />
                                </FormGroup>
                            </Col>

                            <Col></Col>
                            
                            <Col md={6} className="mb-3">
                                <FormGroup>
                                    <Label for="validationDefault01">Nombre</Label>
                                    <Input type="text" className="form-control" id="validationDefault01" defaultValue={"Ingresar Nombre"} required />
                                </FormGroup>
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
            </Row> */}
        </Layout>


        </>
    );
};

export default Create;
