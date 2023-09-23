import { FunctionComponent } from "react";
import { Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from "yup";
import { ICreateModal, MODE_ACTION } from "../../models/perfil/CreateModal";
import { useAuthenticationAction } from "../../hooks/UseAuthentication";

const CreateModal: FunctionComponent<ICreateModal> = (props) => {
    const { usuarioResponse } = useAuthenticationAction();

    const { isOpen, toggleF, mode } = props;

    return (
        <Modal isOpen={isOpen} toggle={() => toggleF()} className="modal-lg">
            <ModalHeader toggle={() => toggleF()}>
                {mode === MODE_ACTION.CREATE ? 'Nuevo' : 'Actualizar'}
            </ModalHeader>

            <Formik
                initialValues={usuarioResponse.entUsuario}
                onSubmit={async (values) => {
                    console.log("guardando datos " + values);
                   // await new Promise((resolve) => setTimeout(resolve, 500));
                //    values.id = 1;
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
                    handleSubmit,
                    isSubmitting
                }) => (
                    <form noValidate onSubmit={handleSubmit}>
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
                            <Button color="primary" type="submit">Guardar Cambios</Button>{' '}
                            <Button color="secondary" onClick={() => toggleF()}>Cancelar</Button>
                        </ModalFooter>
                    </form>
                )}
            </Formik>
        </Modal>
    );
}

export default CreateModal;


