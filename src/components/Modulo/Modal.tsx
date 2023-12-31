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

import { ICreateModal, MODE_ACTION } from "../../models/modulo/CreateModal";

const CreateModal: FunctionComponent<ICreateModal> = (props) => {
    const { isOpen, toggleF, mode } = props;

    return (
        <Modal isOpen={isOpen} toggle={() => toggleF()} className="modal-lg">
            <ModalHeader toggle={() => toggleF()}>
                {mode === MODE_ACTION.CREATE ? 'Nuevo' : 'Actualizar'}
            </ModalHeader>
            <Formik
                initialValues={{ id: 1, nombreModulo: '', idorden: '0' }}
                onSubmit={async (values) => {
                    console.log("guardando datos " + values);
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    values.id = 1;
                }}
                validationSchema={
                    Yup.object().shape({
                        nombreModulo: Yup.string().required("El nombre es requerido"),
                        idorden: Yup.string().test('required', 'El orden es requerido', function(value) {
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
                }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <ModalBody>
                            <Row>
                                <Col md={6} className="mb-2">
                                    <img src="/src/assets/images/modulo.png" className="img-thumbnail" alt="..." style={{ width: "10rem", height: "10rem" }} />
                                </Col>

                                <Col></Col>
                                <Col></Col>

                                <Col md={6} >
                                    <FormGroup>
                                        <Label for="validationDefault01" className='mb-1'>Nombre</Label>
                                        <Input
                                            type="text"
                                            id="nombreModulo"
                                            className={`form-control ${errors.nombreModulo ? 'is-invalid' : ''}`}
                                            required
                                            placeholder="Ingresar Nombre"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.nombreModulo}
                                            style={{ height: '40px' }}
                                        />
                                        {errors.nombreModulo && <div className="invalid-feedback">{errors.nombreModulo}</div>}
                                    </FormGroup>
                                </Col>
                                <Col md={6} >
                                    <FormGroup>
                                        <Label for="validationDefault01" className='mb-1'>Orden</Label>
                                        <Input
                                            type="select"
                                            id="idorden"
                                            className={`form-control ${errors.idorden? 'is-invalid' : ''}`}
                                            required
                                            placeholder="Seleccionar orden"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.idorden}
                                            style={{ height: '40px' }}
                                        >
                                            <option value="">-- Seleccionar --</option>
                                            <option value="1">Orden 1</option>
                                            <option value="2">Orden 2</option>
                                            </Input>
                                        {errors.idorden && <div className="invalid-feedback">{errors.idorden}</div>}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Col md={6} >
                            </Col>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => toggleF()}>Guardar Cambios</Button>{' '}
                            <Button color="secondary" onClick={() => toggleF()}>Cancelar</Button>
                        </ModalFooter>
                    </form>
                )}
            </Formik>
        </Modal>
    );
}

export default CreateModal;
