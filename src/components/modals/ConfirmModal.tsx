import { FunctionComponent } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { IModalConfirm } from "../../models/modals/Modals";

export const ConfirmModal: FunctionComponent<IModalConfirm> = (props) => {

  const { isOpen, toggleF, action } = props;

  return (
    <Modal isOpen={isOpen} toggle={() => toggleF()} className="modal-dialog-centered">
      <ModalHeader toggle={() => toggleF()}>Confirmacion</ModalHeader>
      <ModalBody>
       
        <img src={"/src/assets/images/solicitud.png"} className="mx-auto d-block" alt="Responsive image" />
      
            <p className="text-center mt-2">¿Estas seguro de realizar esta acción?</p>

      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => {
          action();
          toggleF();

        }}>Si, estoy seguro</Button>{' '}
        <Button color="secondary" onClick={() => toggleF()}>Cancelar</Button>
      </ModalFooter>
    </Modal>
  );
};
