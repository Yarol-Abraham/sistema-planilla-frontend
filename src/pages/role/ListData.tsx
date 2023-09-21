import { FunctionComponent, useState } from "react";
import { Button, Card, CardBody, Col } from "reactstrap";
import DataTable, { TableColumn  } from 'react-data-table-component';

import CreateModal from "../../components/role/Modal";
import { ConfirmModal } from "../../components/modals/ConfirmModal";

// models
import { DataColumRol } from "../../models/dataTable/DataTable";
import { MODE_ACTION } from "../../models/role/CreateModal";


type TableHeader = TableColumn<DataColumRol>[];

const ListData: FunctionComponent<{}> = () => 
{
    
    const [ headers, setHeaders ] = useState<TableHeader>( [
        {
            name: "Nombre Rol",
            selector: row => row.Nombre_Rol,
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
            "Nombre_Rol": "Admin",
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
// const handleEdit = (role) => {
//     console.log("Editar:", role);

//     // Resto de la lógica para editar
// };

// const handleDelete = (role) => {
//     console.log("Eliminar:", role);
//     // Resto de la lógica para eliminar
// };



export default  ListData;