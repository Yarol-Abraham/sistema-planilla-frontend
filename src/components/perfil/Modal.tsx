import { FunctionComponent, useState } from "react";
import { Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from "yup";
import { ICreateModal, MODE_ACTION } from "../../models/perfil/CreateModal";
import { useAuthenticationAction } from "../../hooks/UseAuthentication";
import { EntUsuario } from "../../context/models/sessionInformation/sessionInformation";
import { SUCCESS } from "../../utils/Methods";

const CreateModal: FunctionComponent<ICreateModal> = (props) => {

    const { usuarioResponse, sessionInformationResponse, updatePerfil } = useAuthenticationAction();
    const [ message, setMessage ] = useState({
        code: "",
        message: ""
    });
    const [submited, setSubmitted] = useState(false);
    const { isOpen, toggleF, mode } = props;

    return (
        <Modal isOpen={isOpen} toggle={() => toggleF()} className="modal-lg">
            <ModalHeader toggle={() => toggleF()}>
                {mode === MODE_ACTION.CREATE ? 'Nuevo' : 'Actualizar'}
            </ModalHeader>

            <Formik
                initialValues={usuarioResponse.entUsuario}
                onSubmit={async (values: EntUsuario ) => {
                    setSubmitted(true);
                    usuarioResponse.entUsuario = values;
                    let resultUpdate: any = await updatePerfil(usuarioResponse, sessionInformationResponse);
                    setTimeout(()=> {
                        setMessage({ code:resultUpdate.strResponseCode, message: resultUpdate.strResponseMessage });
                        //toggleF();
                        setSubmitted(false);
                    }, 3000)

                    setTimeout(()=> setMessage({ code: "", message: "" }), 6000);
                }}
                validationSchema={
                    Yup.object().shape({
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
                        {
                            message.message  && <div className={`alert alert-${message.code == SUCCESS ? 'success' : 'danger'}`}>
                                <span className="p-0"> {message.message} </span>
                            </div>
                        }
                        <ModalBody>
                            <Row>
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
                                            disabled
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
                                            disabled
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
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" className={!submited ? "" : "d-none"} type="submit">Guardar Cambios</Button>{' '}
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


