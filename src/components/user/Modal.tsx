import { FunctionComponent, useState } from "react";
import { Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from "yup";
import { ICreateModal, MODE_ACTION } from "../../models/user/CreateModal";

import { useUser } from "../../hooks/UseUser";
import { useAuthenticationAction } from "../../hooks/UseAuthentication";
import { UsuarioCreate } from "../../context/models/user/user";
import { SUCCESS } from "../../utils/Methods";

const CreateModal: FunctionComponent<ICreateModal> = (props) => {

    const { createUser } = useUser();
    const { sessionInformationResponse  } = useAuthenticationAction();

    const [ message, setMessage ] = useState({ code: "", message: "" });
    const [ confirm, setConfirm ] = useState(false);
    const [submited, setSubmitted] = useState(false);
    
    const { isOpen, toggleF, mode } = props;
    
    const handleSubmitConfirm = function () 
    {
        setConfirm(false);
        setMessage({ code: "", message: "" });
        toggleF();
    }

    return (
        <Modal isOpen={isOpen} toggle={() => toggleF()} className="modal-lg">
            {

                confirm ? (
                    <>
                        <Modal isOpen={isOpen} toggle={() => toggleF()} className="modal-dialog-centered">
                            <ModalHeader toggle={() => toggleF()}>Confirmacion</ModalHeader>
                            <ModalBody>
                                {
                                    message.message != "" && <div className={`alert-${message.code == SUCCESS ? 'success' : ''}`} role="alert">
                                        <p className="p-0 text-center mb-0">{message.message.split(":")[0]}</p>
                                        
                                        <p className="p-0 text-center fs-4 fw-bold">{message.message.split(":")[1]}</p>
                                    </div>
                                }
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={() => handleSubmitConfirm()}>Aceptar</Button>{' '}
                            </ModalFooter>
                        </Modal>
                    </>
                ) :(
                    <>
                        <ModalHeader toggle={() => toggleF()}>
                            {mode === MODE_ACTION.CREATE ? 'Nuevo' : 'Actualizar'}
                        </ModalHeader>

                        <Formik
                            initialValues={{
                                idUsuario: 'caliz',
                                nombre: 'isaac',
                                apellido: 'caliz',
                                idGenero: '1',
                                correoElectronico: 'caliz@tec.com',
                                telefonoMovil: '44887744',
                                fechaNacimiento: '2000-10-30',
                                idSucursal: '1'
                            }}
                            onSubmit={async (values) => {
                                console.log("guardando datos " + JSON.stringify(values, null, 2));
                                
                                setSubmitted(true);
                                
                                const usuarioCreate: UsuarioCreate = {
                                    nombre: values.nombre,
                                    apellido: values.apellido,
                                    correoElectronico: values.correoElectronico,
                                    telefonoMovil: values.telefonoMovil,
                                    fechaNacimiento: values.fechaNacimiento,
                                    idGenero: +values.idGenero,
                                    idUsuario: values.idUsuario,
                                    idSucursal: +values.idSucursal,
                                    requiereCambiarPassword: 0,
                                    fotografia: ""
                                }
                                
                                if(mode == MODE_ACTION.CREATE)
                                {
                                    let resultcreate: any = await createUser(usuarioCreate, sessionInformationResponse.strSessionId);
                                
                                    setTimeout(()=> {
                                        setMessage({ code:resultcreate.strResponseCode, message: resultcreate.strResponseMessage });
                                        
                                        if(resultcreate.strResponseCode == SUCCESS)
                                        {
                                          //  toggleF();
                                            setConfirm(true);
                                        }
                                        else{
                                            setConfirm(true);
                                        }
                                        //toggleF();
                                        setSubmitted(false);
                                    }, 3000)
                                }


                            }}
                            validationSchema={
                                Yup.object().shape({
                                    idUsuario: Yup.string().required("El nombre de usuario es requerido"),
                                    nombre: Yup.string().required("El nombre es requerido"),
                                    apellido: Yup.string().required("El apellido es requerido"),
                                    correoElectronico: Yup.string().email("El correo electrónico no es válido").required("El correo electrónico es requerido"),
                                    telefonoMovil: Yup.string().required("El teléfono es requerido"),
                                    fechaNacimiento: Yup.string().required("La fecha de nacimiento es requerida"),
                                    idGenero: Yup.string().test('required', 'El género es requerido', function(value) {
                                        return value !== "0";
                                    }),
                                    idSucursal: Yup.string().test('required', 'La sucursal es requerida', function(value) {
                                        return value !== "0";
                                    }),
                                })
                            }
                        >
                            {({
                                values,
                                errors,
                                handleChange,
                                handleBlur,
                                handleSubmit
                            }) => (
                                <form noValidate onSubmit={handleSubmit}>
                                    <ModalBody>
                                        <Row>
                                            <Col md={6} className="mb-2">
                                                <img src="/src/assets/images/usuario_create.png" className="img-thumbnail" alt="..." style={{ width: "10rem", height: "10rem" }} />
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="validationDefault00" className='mb-1'>Usuario</Label>
                                                    <Input
                                                        type="text"
                                                        id="idUsuario"
                                                        className={`form-control ${errors.idUsuario ? 'is-invalid' : ''}`}
                                                        required
                                                        placeholder="Nombre de usuario"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.idUsuario}
                                                        style={{ height: '40px' }}
                                                    />
                                                    {errors.idUsuario && <div className="invalid-feedback">{errors.idUsuario}</div>}
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="validationDefault01" className='mb-1'>Nombre</Label>
                                                    <Input
                                                        type="text"
                                                        id="nombre"
                                                        className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                                                        required
                                                        placeholder="Ingresar Nombre"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.nombre}
                                                        style={{ height: '40px' }}
                                                    />
                                                    {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="validationDefault02" className='mb-1'>Apellido</Label>
                                                    <Input
                                                        type="text"
                                                        id="apellido"
                                                        className={`form-control ${errors.apellido ? 'is-invalid' : ''}`}
                                                        required
                                                        placeholder="Ingresar Apellido"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.apellido}
                                                        style={{ height: '40px' }}
                                                    />
                                                    {errors.apellido && <div className="invalid-feedback">{errors.apellido}</div>}
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label htmlFor="fechaNacimiento" className='mb-1'>Fecha de Nacimiento</Label>
                                                    <Input
                                                        type="date"
                                                        id="fechaNacimiento"
                                                        className={`form-control ${errors.fechaNacimiento ? 'is-invalid' : ''}`}
                                                        required
                                                        placeholder="Ingresar Fecha de Nacimiento"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.fechaNacimiento}
                                                        style={{ height: '40px' }}
                                                    />
                                                    {errors.fechaNacimiento && <div className="invalid-feedback">{errors.fechaNacimiento}</div>}
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label className='mb-1'>Género</Label>
                                                    <Input
                                                        type="select"
                                                        id="idGenero"
                                                        className={`form-control ${errors.idGenero ? 'is-invalid' : ''}`}
                                                        required
                                                        placeholder="Seleccionar Género"
                                                        onChange={handleChange}
                                                        value={values.idGenero}
                                                        style={{ height: '40px' }}
                                                    >
                                                        <option value="0">-- Seleccionar --</option>
                                                        <option value="1">Masculino</option>
                                                        <option value="2">Femenino</option>
                                                    </Input>
                                                    {errors.idGenero && <div className="invalid-feedback">{errors.idGenero}</div>}
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label htmlFor="correoElectronico" className='mb-1'>Correo Electrónico</Label>
                                                    <Input
                                                        type="email"
                                                        id="correoElectronico"
                                                        className={`form-control ${errors.correoElectronico ? 'is-invalid' : ''}`}
                                                        required
                                                        placeholder="Ingresar Correo Electrónico"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.correoElectronico}
                                                        style={{ height: '40px' }}
                                                    />
                                                    {errors.correoElectronico && <div className="invalid-feedback">{errors.correoElectronico}</div>}
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label htmlFor="telefonoMovil" className='mb-1'>Teléfono</Label>
                                                    <Input
                                                        type="text"
                                                        id="telefonoMovil"
                                                        className={`form-control ${errors.telefonoMovil ? 'is-invalid' : ''}`}
                                                        required
                                                        placeholder="Ingresar Teléfono Móvil"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.telefonoMovil}
                                                        style={{ height: '40px' }}
                                                    />
                                                    {errors.telefonoMovil && <div className="invalid-feedback">{errors.telefonoMovil}</div>}
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup className="form-group">
                                                    <Label className='mb-1'>Sucursal</Label>
                                                    <Input
                                                        type="select"
                                                        id="idSucursal"
                                                        className={`form-control ${errors.idSucursal ? 'is-invalid' : ''}`}
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
                                                    {errors.idSucursal && <div className="invalid-feedback">{errors.idSucursal}</div>}
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" className={!submited ?  "" : "d-none"} type="submit">Guardar Cambios</Button>{' '}
                                        {
                                            submited &&
                                            <img className='h-100' src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                        }
                                        <Button color="secondary" onClick={() => toggleF()}>Cancelar</Button>
                                    </ModalFooter>
                                </form>
                            )}
                        </Formik>
                    </>
                )
            }


        </Modal>
    );
}

export default CreateModal;
