import { FunctionComponent, useState } from 'react';

import { ICreateModal, MODE_ACTION } from '../../models/people/CreateModal';

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

import { usePeople } from '../../hooks/UsePeople';
import { useAuthenticationAction } from '../../hooks/UseAuthentication';
import { SUCCESS } from '../../utils/Methods';

export const CreateModal: FunctionComponent<ICreateModal> = (props) => 
{
    const {  sessionInformationResponse } = useAuthenticationAction();
    const { createPeople, peopleListResponse, updatePeople } = usePeople();
    const { isOpen, toggleF, mode, data } = props;

    const [ message, setMessage ] = useState({ code: "", message: "" });
    const [ submited, setSubmitted ] = useState(false);

    return (
        <Modal isOpen={isOpen} toggle={() => toggleF()} className="modal-lg">
             <ModalHeader toggle={() => toggleF()}>{mode === MODE_ACTION.CREATE ? 'Nuevo' : 'Actualizar'} </ModalHeader>
            
            <Formik
                initialValues={{ 
                    nombre: data?.nombre || "", 
                    apellido: data?.apellido || "", 
                    fechaNacimiento: data?.fechaNacimiento || "", 
                    idGenero: data?.idGenero || 0,
                    direccion: data?.direccion || "" ,
                    telefono: data?.telefono || "",
                    correoElectronico: data?.correoElectronico || "",
                    idEstadoCivil: data?.idEstadoCivil || 0
                }}
                onSubmit={ async (values)=> {
                    
                    setSubmitted(true);

                    if(mode == MODE_ACTION.CREATE)
                    {
                        
                        let resultcreate: any = await createPeople(values, peopleListResponse, sessionInformationResponse.strSessionId);

                        setTimeout(()=> {  
                            setSubmitted(false); 
                            setMessage({ code:resultcreate.strResponseCode, message: resultcreate.strResponseMessage });
                        }, 1000)

                        setTimeout(()=>{ if(resultcreate.strResponseCode == SUCCESS) toggleF(); }, 2000);        
                    }
                    else if(mode == MODE_ACTION.UPDATE)
                    {
                        const formatData = {
                            idPersona: data?.idPersona,
                            nombre: values.nombre, 
                            apellido: values.apellido, 
                            fechaNacimiento: values.fechaNacimiento, 
                            idGenero: values.idGenero,
                            direccion: values.direccion ,
                            telefono: values.telefono,
                            correoElectronico: values.correoElectronico,
                            idEstadoCivil: values.idEstadoCivil
                        }
                        
                        let resultUpdate: any = await updatePeople(formatData, peopleListResponse, sessionInformationResponse.strSessionId);

                        setTimeout(()=> {  
                            setSubmitted(false); 
                            setMessage({ code: resultUpdate.strResponseCode, message: resultUpdate.strResponseMessage });
                        }, 1000);

                        setTimeout(()=>{ if(resultUpdate.strResponseCode == SUCCESS) 
                        {
                            setMessage({ code: "", message: "" });
                            toggleF();
                        } }, 2000); 
                    }

                }}
                validationSchema={
                    Yup.object().shape({
                        nombre: Yup.string().required("El nombre es requerido"),
                        apellido: Yup.string().required("El apellido es requerido"),
                        fechaNacimiento: Yup.string().required("La fecha de nacimiento es requerido"),
                        idGenero: Yup.number().required("El genero es requerido"),
                        direccion: Yup.string().required("La dirección es requerido"),
                        telefono: Yup.string().required("El telefono es requerido"),
                        correoElectronico: Yup.string().required("El correo electrónico es requerido"),
                        idEstadoCivil: Yup.number().required("El estado civil es requerido")
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
                    <form  noValidate onSubmit={handleSubmit}>
                         {
                            message.message != "" && <div className={`alert-${message.code == SUCCESS ? 'success' : ''}`} role="alert">
                                <p className="p-2 text-center mb-0">{message.message}</p>
                            </div>
                        }
                         <ModalBody>
                            <Row>
                                <Col md={6} className="mb-2">
                                    <img src="/src/assets/images/rol.png" className="img-thumbnail" alt="..." style={{ width: "10rem", height: "10rem" }} />
                                </Col>
                                <Col></Col>
                                
                                <Col md={6} >
                                    <FormGroup>
                                        <Label for="Nombre" className='mb-1'>Nombre</Label>
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

                                <Col md={6} >
                                    <FormGroup>
                                        <Label for="Apellido" className='mb-1'>Apellido</Label>
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

                                <Col md={6} >
                                    <FormGroup>
                                        <Label for="Apellido" className='mb-1'>Fecha Nacimiento</Label>
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

                                <Col md={6} >
                                    <FormGroup>
                                        <Label for="Apellido" className='mb-1'>Dirección</Label>
                                        <Input
                                            type="text"
                                            id="direccion"
                                            className={`form-control ${errors.direccion ? 'is-invalid' : ''}`}
                                            required
                                            placeholder="Ingresar Dirección"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.direccion}
                                            style={{ height: '40px' }}
                                        />
                                        {errors.direccion && <div className="invalid-feedback">{errors.direccion}</div>}
                                    </FormGroup>
                                </Col>

                                <Col md={6} >
                                    <FormGroup>
                                        <Label for="Apellido" className='mb-1'>Telefono</Label>
                                        <Input
                                            type="text"
                                            id="telefono"
                                            className={`form-control ${errors.telefono ? 'is-invalid' : ''}`}
                                            required
                                            placeholder="Ingresar Telefono"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.telefono}
                                            style={{ height: '40px' }}
                                        />
                                        {errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}
                                    </FormGroup>
                                </Col>

                                <Col md={6} >
                                    <FormGroup>
                                        <Label for="Apellido" className='mb-1'>Correo Electronico</Label>
                                        <Input
                                            type="text"
                                            id="correoElectronico"
                                            className={`form-control ${errors.correoElectronico ? 'is-invalid' : ''}`}
                                            required
                                            placeholder="Ingresar Correo Electronico"
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
                                        <Label className='mb-1'>Estado Civil</Label>
                                        <Input
                                            type="select"
                                            id="idEstadoCivil"
                                            className={`form-control ${errors.idEstadoCivil ? 'is-invalid' : ''}`}
                                            required
                                            placeholder="Seleccionar Género"
                                            onChange={handleChange}
                                            value={values.idEstadoCivil}
                                            style={{ height: '40px' }}
                                        >
                                            <option value="0">-- Seleccionar --</option>
                                            <option value="1">Casado(a)</option>
                                            <option value="2">Soltero(a)</option>
                                            <option value="3">Divorciado(a)</option>
                                            <option value="4">Viudo(a)</option>
                                            <option value="5">Union de hecho</option>
                                        </Input>
                                        {errors.idEstadoCivil && <div className="invalid-feedback">{errors.idEstadoCivil}</div>}
                                    </FormGroup>
                                </Col>

                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary"  className={!submited ?  "" : "d-none"} type="submit">Guardar Cambios</Button>{' '}
                            {
                                submited &&
                                <img className='h-100' src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            }
                            <Button color="secondary" onClick={() => toggleF()}>Cancelar</Button>
                        </ModalFooter>
                    </form>  
                )}
            </Formik>

        </Modal>
    );
}