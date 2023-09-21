import { FunctionComponent, useState } from "react";
import { Button, Card, CardBody, Col } from "reactstrap";
import DataTable, { TableColumn  } from 'react-data-table-component';

import CreateModal from "../../components/auditoria/Modal";
import { ConfirmModal } from "../../components/modals/ConfirmModal";

// models
import { DataColumBitacora } from "../../models/dataTable/DataTable";
import { MODE_ACTION } from "../../models/auditoria/CreateModal";


type TableHeader = TableColumn<DataColumBitacora>[];

const ListData: FunctionComponent<{}> = () => 
{
    
    const [ headers, setHeaders ] = useState<TableHeader>( [
        {
            name: "Nombre de Bitacora",
            selector: row => row.Nombre_Bitacora,
            sortable: true,
        },
        {
            name: "Usuario Creacion",
            selector:  row => row.Usuario_Creacion,
            sortable: true,
        },
        {
            name: "Usuario Modificacion",
            selector: row => row.Usuario_Modificacion,
            sortable: true,
        },
        {
            name: "Dispositivo",
            selector: row => row.Dispositivo,
            sortable: true,
        },
        {
            name: "Acciones",
            cell: (data) => (<>
                <Button 
                    className="btn btn-info d-flex justify-content-center mx-1"
                    onClick={ ()=> 
                    {
                        console.log(data);
                        toggle();
                    }}
                >
                         <i className="ri-checkbox-circle-line p-0"></i>
                </Button>
              
                
            </>),
            sortable: true
        },
    
    ]);

    const [ data, setData ] = useState( [
        {
            "Nombre_Bitacora": "Tiger Nixon",
            "Usuario_Creacion": "System Architect",
            "Usuario_Modificacion": "Edinburgh",
            "Dispositivo": "PC",
        },
     
    ]      
    )
 
    const [ isOpen, setisOpen ] = useState(false);
    const toggle = ()=> setisOpen(!isOpen);

    const [ isOpenConfirm, setisOpenConfirm ] = useState(false);
    const toggleConfirm = ()=> setisOpenConfirm(!isOpenConfirm);
    
    return (
       <>
        <Col sm="12">
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
        <CreateModal isOpen={isOpen} toggleF={toggle} mode={MODE_ACTION.UPDATE} />
        <ConfirmModal isOpen={isOpenConfirm} toggleF={toggleConfirm} />
       </>
    );

}

export default  ListData;