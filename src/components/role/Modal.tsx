import { FunctionComponent, useState } from "react";
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

import { ICreateModal, MODE_ACTION } from "../../models/role/CreateModal";
import { useAuthenticationAction } from "../../hooks/UseAuthentication";
import { useRole } from "../../hooks/UseRole";
import { Role } from "../../context/models/role/role";
import { SUCCESS } from "../../utils/Methods";

const CreateModal: FunctionComponent<ICreateModal> = (props) => {
    
    const  { createRol, roleListResponse } = useRole();
    const { sessionInformationResponse  } = useAuthenticationAction();

    const [ message, setMessage ] = useState({ code: "", message: "" });
    const [submited, setSubmitted] = useState(false);

    const { isOpen, toggleF, mode } = props;

    return (
        <Modal isOpen={isOpen} toggle={() => toggleF()} className="modal-lg">
            <ModalHeader toggle={() => toggleF()}>{mode === MODE_ACTION.CREATE ? 'Nuevo' : 'Actualizar'} </ModalHeader>

            <Formik
                initialValues={{ idRole: 1, nombre: '' }}
                onSubmit={async (values) => {
                    
                    setSubmitted(true);

                    if(mode == MODE_ACTION.CREATE)
                    {
                        const rol: Role = {
                            idRole: 0,
                            nombre: values.nombre
                        }
                        
                        let resultcreate: any = await createRol(rol, roleListResponse, sessionInformationResponse.strSessionId);

                        setTimeout(()=> {  
                            setSubmitted(false); 
                            setMessage({ code:resultcreate.strResponseCode, message: resultcreate.strResponseMessage });
                        }, 1000)

                        setTimeout(()=>{ if(resultcreate.strResponseCode == SUCCESS) toggleF(); }, 3000);                                
                    }
                }}
                validationSchema={
                    Yup.object().shape({
                        nombre: Yup.string().required("El nombre es requerido")
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
                                <Col></Col>

                                <Col md={6} >
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
                            </Row>
                            <Col md={6} >
                            </Col>
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

export default CreateModal;
