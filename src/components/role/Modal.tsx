import React, { FunctionComponent } from "react";
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

const CreateModal: FunctionComponent<ICreateModal> = (props) => {
    const { isOpen, toggleF, mode } = props;

    return (
        <Modal isOpen={isOpen} toggle={() => toggleF()} className="modal-lg">
            <ModalHeader toggle={() => toggleF()}>
                {mode === MODE_ACTION.CREATE ? 'Nuevo' : 'Actualizar'}
            </ModalHeader>

            <Formik
                initialValues={{ id: 1, nombreRol: '' }}
                onSubmit={async (values) => {
                    console.log("guardando datos " + values);
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    values.id = 1;
                }}
                validationSchema={
                    Yup.object().shape({
                        nombreRol: Yup.string().required("El nombre es requerido")
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
                                            id="nombreRol"
                                            className={`form-control ${errors.nombreRol ? 'is-invalid' : ''}`}
                                            required
                                            placeholder="Ingresar Nombre"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.nombreRol}
                                            style={{ height: '40px' }}
                                        />
                                        {errors.nombreRol && <div className="invalid-feedback">{errors.nombreRol}</div>}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Col md={6} >
                            </Col>
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
