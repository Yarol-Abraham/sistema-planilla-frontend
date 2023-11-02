import { FunctionComponent, useState, useEffect } from "react";
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

// models
import { ICreateModal, MODE_ACTION } from "../../models/department/CreateModal";

// hookss
import { useAuthenticationAction } from "../../hooks/UseAuthentication";

// utils
import { SUCCESS } from "../../utils/Methods";
import { useDepartmentContext } from "../../hooks/UseDepartment";

const CreateModal: FunctionComponent<ICreateModal> = (props) => {
    
    const { sessionInformationResponse  } = useAuthenticationAction();
    const { departmentListResponse, getDepartments, createDepartment, updateDepartment } = useDepartmentContext();
    

    const [ message, setMessage ] = useState({ code: "", message: "" });
    const [submited, setSubmitted] = useState(false);
    const [ idEmpresa, setIdEmpresa  ] = useState(1); 

    const { isOpen, toggleF, mode, data } = props;

    useEffect(()=> {
        if(sessionInformationResponse.strSessionId != "") getDepartments(sessionInformationResponse.strSessionId );
    }, [sessionInformationResponse.strSessionId])

    return (
        <Modal isOpen={isOpen} toggle={() => toggleF()} className="modal-lg">
            <ModalHeader toggle={() => toggleF()}>{mode === MODE_ACTION.CREATE ? 'Nuevo' : 'Actualizar'} </ModalHeader>

            <Formik
                initialValues={{ nombre: data?.nombre || "", idDepartamento: data?.idDepartamento || 0 }}
                onSubmit={async (values) => {
                    
                    setSubmitted(true);
                   
                    if(mode == MODE_ACTION.CREATE)
                    {
                        const formatData = {
                            nombre: values.nombre, 
                            idDepartamento: values.idDepartamento,
                            idEmpresa
                         }   

                        let resultcreate: any = await createDepartment(formatData, departmentListResponse, sessionInformationResponse.strSessionId);

                        setTimeout(()=> {  
                            setSubmitted(false); 
                            setMessage({ code:resultcreate.strResponseCode, message: resultcreate.strResponseMessage });
                        }, 1000)

                        setTimeout(()=>{ if(resultcreate.strResponseCode == SUCCESS) toggleF(); }, 2000);                                
                    }
                    else if (mode == MODE_ACTION.UPDATE) 
                    {
                        
                        const formatData = { 
                            nombre: values.nombre, 
                            idDepartamento: values.idDepartamento,
                            idEmpresa
                           }   
                        
                        let resultupdate: any = await updateDepartment(formatData, departmentListResponse, sessionInformationResponse.strSessionId);

                        setTimeout(()=> {  
                            setSubmitted(false); 
                            setMessage({ code:resultupdate.strResponseCode, message: resultupdate.strResponseMessage });
                        }, 1000);

                        setTimeout(()=>{ if(resultupdate.strResponseCode == SUCCESS) toggleF(); }, 2000); 
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

                                <Col md={6}>
                                    <FormGroup>
                                        <Label className='mb-1'>Género</Label>
                                        <Input
                                            type="select"
                                            id="idEmpresa"
                                            required
                                            placeholder="Seleccionar Género"
                                            onChange={(e) => setIdEmpresa(+e.target.value)}
                                            value={idEmpresa}
                                            style={{ height: '40px' }}
                                            disabled
                                        >
                                            <option value="1">Software Inc.</option>
                                        </Input>
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

export default CreateModal;
