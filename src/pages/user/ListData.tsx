import { FunctionComponent, useEffect, useState,  useRef } from "react";
import { Alert, Card, CardBody, Col } from "reactstrap";
import DataTable, { TableColumn  } from 'react-data-table-component';

import { useMenuAction } from "../../hooks/UseMenu";
import { useUser } from "../../hooks/UseUser";
import { useAuthenticationAction } from "../../hooks/UseAuthentication";

import CreateModal from "../../components/user/Modal";
import { ConfirmModal } from "../../components/modals/ConfirmModal";

// models
import { DataColumUser } from "../../models/dataTable/DataTableColumns";
import { MODE_ACTION } from "../../models/user/CreateModal";
import { getHeaders } from "../../services/User";
import { CSSTransition } from "react-transition-group";
import { SUCCESS } from "../../utils/Methods";


type TableHeader = TableColumn<DataColumUser>[];

const ListData: FunctionComponent<{}> = () => 
{
  
    const { menuResponse } = useMenuAction();
    const {  usuario, listuser, deleteUser, updateUpUser, listUsuarioResponse, getUser } = useUser();
    const { sessionInformationResponse } = useAuthenticationAction();

    const [ headers, setHeaders ] = useState<TableHeader>([]);
    const [ data, setData ] = useState<any>([]);
    const [ id, setId ] = useState("");

    const [ isOpen, setisOpen ] = useState(false);
    const toggle = ()=> setisOpen(!isOpen);

    const [ isOpenConfirmDelete, setisOpenConfirmDelete ] = useState(false);
    const toggleConfirmDelete = ()=> setisOpenConfirmDelete(!isOpenConfirmDelete);
    
    const [ isOpenConfirmUpdate, setisOpenConfirmUpdate ] = useState(false);
    const toggleConfirmUpdate = ()=> setisOpenConfirmUpdate(!isOpenConfirmUpdate);
    
    const [showMessage, setShowMessage] = useState(false);
    const nodeRef = useRef(null);

    useEffect(()=> {
        if(menuResponse.entModulo.length > 0) setHeaders(getHeaders(menuResponse.entModulo, [toggle, setId, toggleConfirmUpdate, toggleConfirmDelete, getUser, setShowMessage]));
     }, [menuResponse.entModulo])

    useEffect(()=> {
        if(listUsuarioResponse.usuarios.length > 0 ) setData(listUsuarioResponse.usuarios);
    }, [listUsuarioResponse.usuarios])

    useEffect(()=> { 
        if(sessionInformationResponse.strSessionId != "") listuser(sessionInformationResponse.strSessionId);
    }, [sessionInformationResponse.strSessionId])

    return (
       <>
        <Col sm="12">
        <CSSTransition
              in={showMessage}
              timeout={1500}
              nodeRef={nodeRef}
              classNames="alert"
              unmountOnExit
        >
             <Alert  
                color="success" 
                className={"text-white bg-success"}
            >
                <div className="iq-alert-icon">
                    <i className="ri-alert-line" />
                </div>
                <div className="iq-alert-text">Se realizado la acción <b>correctamente</b>!</div>
            </Alert>

        </CSSTransition>
           
            <Card className="iq-card">
                <CardBody className="iq-card-body">
                    <DataTable
                        columns={headers}
                        data={data}
                        pagination
                        highlightOnHover
                    />
                </CardBody>
            </Card>
        </Col>
        <CreateModal isOpen={isOpen} toggleF={toggle} mode={MODE_ACTION.UPDATE} data={usuario} />
        <ConfirmModal isOpen={isOpenConfirmDelete} toggleF={toggleConfirmDelete} action={ async () => {
            let result: any = await deleteUser(id, listUsuarioResponse, sessionInformationResponse.strSessionId);
            if(result == SUCCESS) setShowMessage(true);
            setTimeout(()=> setShowMessage(false), 2500);
        }} />
        <ConfirmModal isOpen={isOpenConfirmUpdate} toggleF={toggleConfirmUpdate} action={ async () => {
             let result: any = await updateUpUser(id, listUsuarioResponse, sessionInformationResponse.strSessionId);
             if(result == SUCCESS) setShowMessage(true);
             setTimeout(()=> setShowMessage(false), 2500);
       }} />
       </>
    );

}

export default  ListData;