import { FunctionComponent } from "react";

import { 
    Button, 
    Col, 
    FormGroup, 
    Input, 
    Label, 
    Modal, 
    ModalBody, 
    ModalFooter, 
    ModalHeader,
    Row 
} from 'reactstrap';

import { Formik } from 'formik';
import * as Yup from "yup";

import { ICreateModal, MODE_ACTION } from "../../models/user/CreateModal";


const CreateModal: FunctionComponent<ICreateModal> = (props)=> 
{
    const { isOpen, toggleF, mode } = props; 
    


    return (
        <Modal isOpen={isOpen} toggle={()=> toggleF()} className="modal-lg">
            <ModalHeader toggle={()=> toggleF()}>{mode == MODE_ACTION.CREATE ? 'Nuevo' : 'Actualizar'  }</ModalHeader>
        
            <Formik
                initialValues={{ 
                    id: 1,
                    nombre: '', 
                    apellido: '', 
                   idGenero: '0', 
                    correoElectronico: '',
                    telefonoMovil: '',
                    fechaNacimiento: '',
                    idSucursal: '0'  }}
                onSubmit={async values => {
                    console.log("guardando datos " + values);
                    await new Promise(resolve => setTimeout(resolve, 500));
                    values.id = 1;
                }}
                validationSchema={
                    Yup.object().shape({
                        nombre: Yup.string().required("Required"),
                        apellido: Yup.string().required("Required"),
                       // idGenero: Yup.string().required("Required"), TODO: PENDIENTE
                        correoElectronico: Yup.string().required("Required"),
                        telefonoMovil: Yup.string().required("Required"),
                        fechaNacimiento: Yup.string().required("Required")
                      //  idSucursal: Yup.string().required("Required") TODO: PENDIENTE
                    })
                }
                >
                {({
                values,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting
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
                                <Label for="nombre" className='mb-1'>Nombre</Label>
                                <Input  
                                    type="text"
                                     id="nombre" 
                                     className={' '+
                                     (errors.nombre ? 'is-invalid' : '')}
                                     required
                                     placeholder="Ingresar Nombre"
                                     onChange={handleChange}
                                     onBlur={handleBlur}
                                     value={values.nombre}
                                     style={{ height: '40px' }} 
                                />
                                <div className="invalid-feedback">
                                    <span>El nombre es requerido</span>
                                </div>
                            </FormGroup>
                        </Col>

                        <Col md={6} >
                            <FormGroup>
                                <Label for="apellido" className='mb-1'>Apellido</Label>
                                <Input 
                                    type="text"
                                     id="apellido" 
                                     className={' '+
                                     (errors.apellido ? 'is-invalid' : '')}
                                     required
                                     placeholder="Ingresar Apellido"
                                     onChange={handleChange}
                                     onBlur={handleBlur}
                                     value={values.apellido}
                                     style={{ height: '40px' }}  
                                />
                                 <div className="invalid-feedback">
                                    <span>El apellido es requerido</span>
                                </div>
                            </FormGroup>    
                        </Col>
                        <Col md={6} >
                            <FormGroup>
                                <Label htmlFor="fechaNacimiento" className='mb-1'>Fecha de Nacimiento</Label>
                                <Input 
                                    type="date" 
                                    id="fechaNacimiento" 
                                    className={' '+
                                    (errors.fechaNacimiento ? 'is-invalid' : '')}
                                    required
                                    placeholder="Ingresar Fecha de Nacimiento"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.fechaNacimiento}
                                    style={{ height: '40px' }}  
                               />
                                <div className="invalid-feedback">
                                   <span>La fecha de nacimiento es requerido</span>
                               </div>
                            </FormGroup>
                        </Col>
                        <Col md={6} >
                            <FormGroup>
                                <Label className='mb-1'>Genero</Label>
                                <Input 
                                    type={"select"} 
                                    id="idGenero" 
                                    className={' '+
                                    (errors.idGenero == "0" ? 'is-invalid' : '')}
                                    required
                                    placeholder="Seleccionar Genero"
                                    onChange={handleChange}
                                    value={values.idGenero}
                                    style={{ height: '40px' }}  
                                >
                                    <option value="0">-- Seleccionar --</option>
                                    <option value="1">Masculino</option>
                                    <option value="2">Femenino</option>
                                </Input>
                                
                                <div className="invalid-feedback">
                                   <span>El genero es requerido</span>
                               </div>

                            </FormGroup>
                        </Col>
                        <Col md={6} >
                            <FormGroup >
                                <Label htmlFor="correoElectronico" className='mb-1'>Correo Electr&otilde;nico</Label>
                                <Input 
                                    type="email"  
                                    id="correoElectronico" 
                                    className={' '+
                                    (errors.correoElectronico ? 'is-invalid' : '')}
                                    required
                                    placeholder="Ingresar Correo Electrónico"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.correoElectronico}
                                    style={{ height: '40px' }}  
                               />
                                <div className="invalid-feedback">
                                   <span>El correo electr&otilde;nico es requerido</span>
                               </div>
                            </FormGroup>
                        </Col>
                        <Col md={6} >
                            <FormGroup >
                                <Label htmlFor="telefonoMovil" className='mb-1'>Telefono</Label>
                                <Input 
                                    type="text" 
                                    id="telefonoMovil" 
                                    className={' '+
                                    (errors.telefonoMovil ? 'is-invalid' : '')}
                                    required
                                    placeholder="Ingresar Telefono Movil"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.telefonoMovil}
                                    style={{ height: '40px' }}  
                               />
                                <div className="invalid-feedback">
                                   <span>El telefono es requerido</span>
                               </div>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Col md={6} >
                        <FormGroup className="form-group" >
                            <Label className='mb-1'>Sucursal</Label>
                            <Input 
                                type={"select"}  
                                id="idSucursal"
                                className={' '+
                                (errors.idSucursal ? 'is-invalid' : '')}
                                required
                                placeholder="Seleccionar Sucursal"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.idSucursal}
                                style={{ height: '40px' }}  
                            >
                                <option value="">-- Seleccionar --</option>
                                <option value="1">Sucursal 1</option>
                                <option value="2">Sucursal 2</option>
                            </Input>
                            <div className="invalid-feedback">
                                <span>La sucursal es requerida</span>
                            </div>
                        </FormGroup>
                    </Col>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="submit" disabled={isSubmitting} >Guardar Cambios</Button>{' '}
                        <Button color="secondary" onClick={()=>toggleF()}>Cancelar</Button>
                    </ModalFooter>
                </form>
            )}
            </Formik>               
        </Modal>
    );
}

export default CreateModal;