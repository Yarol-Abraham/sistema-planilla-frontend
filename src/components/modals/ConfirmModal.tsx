import { FunctionComponent } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { IModalConfirm } from "../../models/modals/Modals";

export const ConfirmModal: FunctionComponent<IModalConfirm> = (props) => {

  const { isOpen, toggleF } = props;

  return (
    <Modal isOpen={isOpen} toggle={() => toggleF()} className="modal-dialog-centered">
      <ModalHeader toggle={() => toggleF()}>Confirmacion</ModalHeader>
      <ModalBody>
        {/* <Alert color="secondary" className={"text-white bg-secondary"}>
              <div className="iq-alert-icon">
                  <i className="ri-information-line" />
              </div>
              A simple secondary alert with <Link to="/dashboard1/alert" className="alert-link">an example link</Link>. Give it a click if you like.
            </Alert> */}


        <img src={"/src/assets/images/solicitud.png"} className="mx-auto d-block" alt="Responsive image" />
      
            <p className="text-center mt-2">¿Estas seguro de realizar esta acción?</p>

      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => toggleF()}>Si, estoy seguro</Button>{' '}
        <Button color="secondary" onClick={() => toggleF()}>Cancelar</Button>
      </ModalFooter>
    </Modal>
  );
};
