import { FunctionComponent, useEffect, useState } from "react";
import { Button, Card, CardBody, Col } from "reactstrap";
import DataTable, { TableColumn  } from 'react-data-table-component';

import { useMenuAction } from "../../hooks/UseMenu";

import CreateModal from "../../components/user/Modal";
import { ConfirmModal } from "../../components/modals/ConfirmModal";

// models
import { DataColum } from "../../models/dataTable/DataTable";
import { MODE_ACTION } from "../../models/user/CreateModal";

import { useLocation } from "react-router-dom";

type TableHeader = TableColumn<DataColum>[];

const ListData: FunctionComponent<{}> = () => 
{
    const location = useLocation();
    const { menuResponse } = useMenuAction();

    const [ headers, setHeaders ] = useState<TableHeader>([]);

    const [ data, setData ] = useState( [
        {
            "Nombre": "Tiger Nixon",
            "Apellido": "System Architect",
            "Correo": "Edinburgh",
            "Telefono": "61",
            "Sucursal": "2011/04/25",
            "Acciones": ""
        },
        {
            "Nombre": "Garrett Winters",
            "Apellido": "Accountant",
            "Correo": "Tokyo",
            "Telefono": "63",
            "Sucursal": "2011/07/25",
            "Acciones": ""
        },
        {
            "Nombre": "Ashton Cox",
            "Apellido": "Junior Technical Author",
            "Correo": "San Francisco",
            "Telefono": "66",
            "Sucursal": "2009/01/12",
            "Acciones": ""
        }
     
    ]      
    )
 
    const [ isOpen, setisOpen ] = useState(false);
    const toggle = ()=> setisOpen(!isOpen);

    const [ isOpenConfirm, setisOpenConfirm ] = useState(false);
    const toggleConfirm = ()=> setisOpenConfirm(!isOpenConfirm);
    
    useEffect(()=> {
       
        menuResponse.entModulo.map( modulo => {
        modulo.menu.map(
            menu => {
                menu.opciones.map(
                    opcion => {
                        if( opcion.pagina == location.pathname.replace("/", ""))
                        {
                            setHeaders([
                                {
                                    name: "Nombre",
                                    selector: row => row.Nombre,
                                    sortable: true,
                                },
                                {
                                    name: "Apellido",
                                    selector:  row => row.Apellido,
                                    sortable: true,
                                },
                                {
                                    name: "Correo",
                                    selector: row => row.Correo,
                                    sortable: true,
                                },
                                {
                                    name: "Telefono",
                                    selector:  row => row.Telefono,
                                    sortable: true,
                                },
                                {
                                    name: "Sucursal",
                                    selector:  row => row.Sucursal,
                                    sortable: true,
                                },
                                {
                                    name: "Acciones",
                                    cell: (data) => (<>
                                        <Button 
                                            className={`btn btn-info d-flex justify-content-center mx-1 ${ opcion.cambio > 0 ? "" : "d-none" } ` }
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
                                            className={`btn btn-danger mx-1 ${ opcion.baja > 0 ? "" : "d-none" } `}>
                                                <i className="ri-close-circle-line p-0"></i>
                                        </Button>
                                        <Button 
                                            onClick={ ()=> 
                                            {
                                                console.log(data);
                                                toggleConfirm();
                                            }}
                                            className={`btn btn-wargin mx-1 ${ opcion.alta > 0 ? "" : "d-none" } `}>
                                                <i className="ri-checkbox-circle-line p-0"></i>
                                        </Button>
                                        
                                    </>),
                                    sortable: true
                                },
                            
                            ])
                        }
                    }
                )
            }
        )
       });


    }, [menuResponse.entModulo])

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