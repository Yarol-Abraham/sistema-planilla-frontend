import { FunctionComponent } from "react";
import { Button, Modal, ModalFooter, ModalHeader } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from "yup";
import { ICreateModal } from "../../models/auditoria/CreateModal";

const CreateModal: FunctionComponent<ICreateModal> = (props)=> {
    const { isOpen, toggleF } = props; 

    return (
        <Modal isOpen={isOpen} toggle={()=> toggleF()} className="modal-lg">
            <ModalHeader toggle={()=> toggleF()}>Mas Detalles</ModalHeader>

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
                    handleSubmit
                }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        
                        <ModalFooter>

                            <Button color="secondary" onClick={()=>toggleF()}>Cancelar</Button>
                        </ModalFooter>
                    </form>
                )}
            </Formik>               
        </Modal>
    );
}

export default CreateModal;
