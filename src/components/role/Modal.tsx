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

import { ICreateModal } from "../../models/role/CreateModal";

const CreateModal: FunctionComponent<ICreateModal> = (props)=> 
{
    const { isOpen, toggleF } = props; 
    
    return (
        <Modal isOpen={isOpen} toggle={()=> toggleF()} className="modal-lg">
            <ModalHeader toggle={()=> toggleF()}>Nuevo Rol</ModalHeader>
        
            <Formik
                initialValues={{ id: 1, title: '', userId: 1, categoryId: 1, priority: ''  }}
                onSubmit={async values => {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    values.id = 1;
                }}
                validationSchema={
                    Yup.object().shape({
                        title: Yup.string().required("Required")
                    })
                }
                >
                {({
                values,
                handleSubmit
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
                                <Label for="validationDefault01" className='mb-1'>Nombre </Label>
                                <Input  type="text" id="validationDefault01" defaultValue={"Ingresar Nombre"}  style={{ height: '40px' }} required />
                            </FormGroup>
                        </Col>                       
                    </Row>
                    <Col md={6} >
                    </Col>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={ ()=>toggleF()}>Guardar Cambios</Button>{' '}
                        <Button color="secondary" onClick={()=>toggleF()}>Cancelar</Button>
                    </ModalFooter>
                </form>
            )}
            </Formik>               
        </Modal>
    );
}

export default CreateModal;