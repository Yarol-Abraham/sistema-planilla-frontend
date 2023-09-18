
import { FunctionComponent, useState } from "react";
import { Button, Card, CardBody, Col } from "reactstrap";
import DataTable, { TableColumn  } from 'react-data-table-component';

import CreateModal from "../../components/user/Modal";
import { ConfirmModal } from "../../components/modals/ConfirmModal";

// models
import { DataColumModulo } from "../../models/dataTable/DataTable";
import { MODE_ACTION } from "../../models/user/CreateModal";


type TableHeader = TableColumn<DataColumModulo>[];

const ListData: FunctionComponent<{}> = () => 
{
    
    const [ headers, setHeaders ] = useState<TableHeader>( [
        {
            name: "Nombre_Modulo",
            selector: row => row.Nombre_Modulo,
            sortable: true,
        },
        {
            name: "Usuario_Creacion",
            selector:  row => row.Usuario_Creacion,
            sortable: true,
        },
        {
            name: "Usuario_Modificacion",
            selector: row => row.Usuario_Modificacion,
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
                        <i className="ri-edit-box-line p-0"></i>
                </Button>
                <Button 
                    onClick={ ()=> 
                    {
                        console.log(data);
                        toggleConfirm();
                    }}
                    className="btn btn-danger mx-1">
                        <i className="ri-close-circle-line p-0"></i>
                </Button>
                <Button 
                    onClick={ ()=> 
                    {
                        console.log(data);
                        toggleConfirm();
                    }}
                    className="btn btn-wargin mx-1">
                        <i className="ri-checkbox-circle-line p-0"></i>
                </Button>
                
            </>),
            sortable: true
        },
    
    ]);

    const [ data, setData ] = useState( [
        {
            "Nombre_Modulo": "Tiger Nixon",
            "Usuario_Creacion": "System Architect",
            "Usuario_Modificacion":"dfjfh"
        },
        {
            "Nombre_Modulo": "Nixon",
            "Usuario_Creacion": "Architect",
            "Usuario_Modificacion":"dh"
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