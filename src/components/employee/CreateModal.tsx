import { FunctionComponent, useState, useEffect } from 'react';

import { ICreateModal, MODE_ACTION } from '../../models/employee/CreateModal';

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

import SelectSearch from 'react-select-search';

import { useEmployee } from '../../hooks/UseEmployee';
import { useAuthenticationAction } from '../../hooks/UseAuthentication';
import { SUCCESS } from '../../utils/Methods';
import { usePeople } from '../../hooks/UsePeople';
import { useDepartmentContext } from '../../hooks/UseDepartment';
import { usePositionContext } from '../../hooks/UsePosition';

export const CreateModal: FunctionComponent<ICreateModal> = (props) => 
{
    const { sessionInformationResponse } = useAuthenticationAction();
    const { employeeListResponse, createEmployee, updateEmployee, getEmployee } = useEmployee();
    const { peopleListResponse } = usePeople();
    const { departmentListResponse } = useDepartmentContext();
    const { getPositionByDeparment, positionDeparmentListResponse } = usePositionContext();

    const { isOpen, toggleF, mode, data } = props;
    
    const [ personas, setPersonas ] = useState<any[]>([]);
    const [ departamentos, setDepartamentos ] = useState<any[]>([]);

    const [ message, setMessage ] = useState({ code: "", message: "" });
    const [ submited, setSubmitted ] = useState(false);

    const [ idPersona, setIdPersona ] = useState(0);

    useEffect(()=> {
        if(departmentListResponse.departamentos.length > 0)
        {
           let searchDepartment = departmentListResponse.departamentos.map((departamento) => {
                return {
                    value: departamento.idDepartamento,
                    name: `${departamento.nombre}`
                }
            });
            setDepartamentos(searchDepartment);
        }
    }, [departmentListResponse.departamentos])

    useEffect(()=> {
      
        if(peopleListResponse.personas.length > 0)
        {
           let searchPeople = peopleListResponse.personas.map((persona) => {
                return {
                    value: persona.idPersona,
                    name: `${persona.nombre} ${persona.apellido}`
                }
            });
            setPersonas(searchPeople);
        }
    }, [peopleListResponse.personas])

    return (
        <Modal isOpen={isOpen} toggle={() => {
            toggleF();
            getEmployee(0);
        }} className="modal-lg">
             <ModalHeader toggle={() => {
                toggleF();
                getEmployee(0);    
            }}>{mode === MODE_ACTION.CREATE ? 'Nuevo' : 'Actualizar'} </ModalHeader>
            
            <Formik
                initialValues={{
                    idPersona: data?.persona.idPersona || 0,
                    idSucursal: data?.sucursal.idSucursal || 0,
                    fechaContratacion: data?.fechaContratacion || "",
                    idPuesto: data?.puesto.idPuesto || 0,
                    idStatusEmpleado: data?.idStatusEmpleado || 0,
                    ingresoSueldoBase: data?.ingresoSueldoBase || 0,
                    ingresoBonificacionDecreto: data?.ingresoBonificacionDecreto || 0,
                    ingresoOtrosIngresos: data?.ingresoOtrosIngresos || 0,
                    descuentoIgss: data?.descuentoIgss || 0,
                    descuentoIsr: data?.descuentoIsr || 0,
                    descuentoInasistencias: data?.descuentoInasistencias || 0,
                    idDepartamento: data?.puesto.idDepartamento
                  }}
                onSubmit={ async (values)=> {
                    
                    setSubmitted(true);

                    if(mode == MODE_ACTION.CREATE)
                    {
                        let formatValues = {
                            idPersona: +idPersona,
                            idSucursal: +values.idSucursal,
                            fechaContratacion: values.fechaContratacion,
                            idPuesto: +values.idPuesto,
                            idStatusEmpleado: values.idStatusEmpleado,
                            ingresoSueldoBase: values.ingresoSueldoBase,
                            ingresoBonificacionDecreto: values.ingresoBonificacionDecreto,
                            ingresoOtrosIngresos: values.ingresoOtrosIngresos,
                            descuentoIgss: values.descuentoIgss,
                            descuentoIsr: values.descuentoIsr,
                            descuentoInasistencias: values.descuentoInasistencias
                        }
                         
                        let resultcreate: any = await createEmployee(formatValues, employeeListResponse, sessionInformationResponse.strSessionId);

                        setTimeout(()=> {  
                            setSubmitted(false); 
                            setMessage({ code:resultcreate.strResponseCode, message: resultcreate.strResponseMessage });
                        }, 1000)

                        setTimeout(()=>{ if(resultcreate.strResponseCode == SUCCESS) 
                        {
                            toggleF();
                            setMessage({ code: "", message: "" });
                        } }, 2000);      
                          
                    }
                    else if(mode == MODE_ACTION.UPDATE)
                    {
                        let formatValues = {
                            idEmpleado: data?.idEmpleado || 0,
                            idPersona: data?.persona.idPersona || 0,
                            idSucursal: +values.idSucursal,
                            fechaContratacion: values.fechaContratacion,
                            idPuesto: +values.idPuesto,
                            idStatusEmpleado: values.idStatusEmpleado,
                            ingresoSueldoBase: values.ingresoSueldoBase,
                            ingresoBonificacionDecreto: values.ingresoBonificacionDecreto,
                            ingresoOtrosIngresos: values.ingresoOtrosIngresos,
                            descuentoIgss: values.descuentoIgss,
                            descuentoIsr: values.descuentoIsr,
                            descuentoInasistencias: values.descuentoInasistencias
                        }
                        
                        let resultUpdate: any = await updateEmployee(formatValues, employeeListResponse, sessionInformationResponse.strSessionId);

                        setTimeout(()=> {  
                            setSubmitted(false); 
                            setMessage({ code: resultUpdate.strResponseCode, message: resultUpdate.strResponseMessage });
                        }, 1000);

                        setTimeout(()=>{ if(resultUpdate.strResponseCode == SUCCESS) 
                        {
                            toggleF();
                            setMessage({ code: "", message: "" });
                            getEmployee(0);   
                        } }, 2000); 
                    }
                }}
                validationSchema={
                    Yup.object().shape({
                        idPersona: Yup.number().required("La persona del empleo es requerido"),
                        idSucursal:  Yup.number().required("La persona del empleo es requerido")
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
                                <Col md={12} className="mb-2">
                                    <img src="/src/assets/images/rol.png" className="img-thumbnail" alt="..." style={{ width: "10rem", height: "10rem" }} />
                                </Col>

                                <Col sm={12} md={12} lg={6}>
                                    <FormGroup>
                                        <Label for="Persona" className='mb-1'>Persona</Label>
                                        <SelectSearch 
                                            id='idPersona'
                                            search={true} 
                                            options={personas} 
                                            placeholder="Seleccionar Persona" 
                                            defaultValue={`${values.idPersona}`}
                                            onChange={(id)=> setIdPersona(+id)}
                                            disabled={ mode == MODE_ACTION.UPDATE ? true : false }
                                        />
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
                                            <option value="1">Oficinas Centrales</option>
                                        </Input>
                                        {errors.idSucursal && <div className="invalid-feedback">{errors.idSucursal}</div>}
                                    </FormGroup>
                                </Col>

                                <Col sm={12} md={12} lg={6}>
                                    <FormGroup>
                                        <Label for="Persona" className='mb-1'>Departamento</Label>
                                        <SelectSearch 
                                            id='idDepartamento'
                                            search={true} 
                                            options={departamentos} 
                                            placeholder="Seleccionar Departamento" 
                                            defaultValue={`${values.idDepartamento}`}
                                            onChange={(id)=> getPositionByDeparment(+id, sessionInformationResponse.strSessionId)}
                                        />
                                    </FormGroup>
                                </Col>

                                <Col md={6}>
                                    <FormGroup className="form-group">
                                        <Label className='mb-1'>Puesto</Label>
                                        <Input
                                            type="select"
                                            id="idPuesto"
                                            className={`form-control ${errors.idPuesto ? 'is-invalid' : ''}`}
                                            required
                                            placeholder="Seleccionar Puesto"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.idPuesto}
                                            style={{ height: '40px' }}
                                        >
                                            <option value="">-- Seleccionar --</option>
                                            {
                                                positionDeparmentListResponse.puestos.map(puesto => (
                                                    <option key={puesto.idPuesto} value={puesto.idPuesto}>
                                                        {puesto.nombre}
                                                    </option>
                                                ))
                                            }
                                        </Input>
                                        {errors.idPuesto && <div className="invalid-feedback">{errors.idPuesto}</div>}
                                    </FormGroup>
                                </Col>
                              
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="ingresoSueldoBase" className='mb-1'>Sueldo Base</Label>
                                        <Input
                                            type="number"
                                            id="ingresoSueldoBase"
                                            className={`form-control ${errors.ingresoSueldoBase ? 'is-invalid' : ''}`}
                                            required
                                            placeholder="Ingresar Sueldo Base"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.ingresoSueldoBase}
                                            style={{ height: '40px' }}
                                        />
                                        {errors.ingresoSueldoBase && <div className="invalid-feedback">{errors.ingresoSueldoBase}</div>}
                                    </FormGroup>
                                </Col>

                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="ingresoBonificacionDecreto" className='mb-1'>Bonificacion Decreto</Label>
                                        <Input
                                            type="number"
                                            id="ingresoBonificacionDecreto"
                                            className={`form-control ${errors.ingresoBonificacionDecreto ? 'is-invalid' : ''}`}
                                            required
                                            placeholder="Ingresar Bonificacion Decreto"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.ingresoBonificacionDecreto}
                                            style={{ height: '40px' }}
                                        />
                                        {errors.ingresoBonificacionDecreto && <div className="invalid-feedback">{errors.ingresoBonificacionDecreto}</div>}
                                    </FormGroup>
                                </Col>

                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="ingresoOtrosIngresos" className='mb-1'>Otros Ingresos</Label>
                                        <Input
                                            type="number"
                                            id="ingresoOtrosIngresos"
                                            className={`form-control ${errors.ingresoOtrosIngresos ? 'is-invalid' : ''}`}
                                            required
                                            placeholder="Ingresar Otros Ingresos"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.ingresoOtrosIngresos}
                                            style={{ height: '40px' }}
                                        />
                                        {errors.ingresoOtrosIngresos && <div className="invalid-feedback">{errors.ingresoOtrosIngresos}</div>}
                                    </FormGroup>
                                </Col>

                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="descuentoIgss" className='mb-1'>Descuento Igss</Label>
                                        <Input
                                            type="number"
                                            id="descuentoIgss"
                                            className={`form-control ${errors.descuentoIgss ? 'is-invalid' : ''}`}
                                            required
                                            placeholder="Ingresar Descuento Igss"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.descuentoIgss}
                                            style={{ height: '40px' }}
                                        />
                                        {errors.descuentoIgss && <div className="invalid-feedback">{errors.descuentoIgss}</div>}
                                    </FormGroup>
                                </Col>

                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="descuentoIsr" className='mb-1'>Descuento Isr</Label>
                                        <Input
                                            type="number"
                                            id="descuentoIsr"
                                            className={`form-control ${errors.descuentoIsr ? 'is-invalid' : ''}`}
                                            required
                                            placeholder="Ingresar Descuento Isr"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.descuentoIsr}
                                            style={{ height: '40px' }}
                                        />
                                        {errors.descuentoIsr && <div className="invalid-feedback">{errors.descuentoIsr}</div>}
                                    </FormGroup>
                                </Col>

                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="descuentoInasistencias" className='mb-1'>Descuento Inasistencias</Label>
                                        <Input
                                            type="number"
                                            id="descuentoInasistencias"
                                            className={`form-control ${errors.descuentoInasistencias ? 'is-invalid' : ''}`}
                                            required
                                            placeholder="Ingresar Descuento Inasistencias"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.descuentoInasistencias}
                                            style={{ height: '40px' }}
                                        />
                                        {errors.descuentoInasistencias && <div className="invalid-feedback">{errors.descuentoInasistencias}</div>}
                                    </FormGroup>
                                </Col>
                                
                                <Col md={6}>
                                    <FormGroup className="form-group">
                                        <Label className='mb-1'>Estado</Label>
                                        <Input
                                            type="select"
                                            id="idStatusEmpleado"
                                            className={`form-control ${errors.idStatusEmpleado ? 'is-invalid' : ''}`}
                                            required
                                            placeholder="Seleccionar Sucursal"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.idStatusEmpleado}
                                            style={{ height: '40px' }}
                                        >
                                            <option value="">-- Seleccionar --</option>
                                            <option value="1">Activo</option>
                                            <option value="2">Suspendido por el IGSS</option>
                                            <option value="3">Suspendido por RH</option>
                                            <option value="4">Baja</option>
                                            <option value="5">Despedido</option>
                                        </Input>
                                        {errors.idStatusEmpleado && <div className="invalid-feedback">{errors.idStatusEmpleado}</div>}
                                    </FormGroup>
                                </Col>

                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="fechaContratacion" className='mb-1'>Fecha de contratación</Label>
                                        <Input
                                            type="date"
                                            id="fechaContratacion"
                                            className={`form-control ${errors.fechaContratacion ? 'is-invalid' : ''}`}
                                            required
                                            placeholder="Ingresar Fecha de Contratación"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.fechaContratacion}
                                            style={{ height: '40px' }}
                                        />
                                        {errors.fechaContratacion && <div className="invalid-feedback">{errors.fechaContratacion}</div>}
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
                            <Button color="secondary" onClick={() =>{ 
                                toggleF();
                                getEmployee(0);
                            }}>Cancelar</Button>
                        </ModalFooter>
                    </form>  
                )}
            </Formik>

        </Modal>
    );
}