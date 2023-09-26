import { FunctionComponent, useEffect, useState } from "react";
import { Button, Card, CardBody, Col } from "reactstrap";
import DataTable, { TableColumn  } from 'react-data-table-component';

import { useMenuAction } from "../../hooks/UseMenu";
import { useUser } from "../../hooks/UseUser";
import { useAuthenticationAction } from "../../hooks/UseAuthentication";

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
    const { listuser, listUsuarioResponse } = useUser();
    const { sessionInformationResponse } = useAuthenticationAction();

    const [ headers, setHeaders ] = useState<TableHeader>([]);
    const [ data, setData ] = useState<any>([]);

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
                                    selector: row => row.nombre,
                                    sortable: true,
                                },
                                {
                                    name: "Apellido",
                                    selector:  row => row.apellido,
                                    sortable: true,
                                },
                                {
                                    name: "Correo",
                                    selector: row => row.correoElectronico,
                                    sortable: true,
                                },
                                {
                                    name: "Telefono",
                                    selector:  row => row.telefonoMovil,
                                    sortable: true,
                                },
                                {
                                    name: "Sucursal",
                                    selector:  row => row.nombreSucursal,
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
                                            disabled={ data.idStatusUsuario === 3 ? true : false }
                                            onClick={ ()=> 
                                            {
                                                console.log(data);
                                                toggleConfirm();
                                            }}
                                            className={`btn btn-danger mx-1 ${ opcion.baja > 0 ? "" : "d-none" } `}>
                                                <i className="ri-close-circle-line p-0"></i>
                                        </Button>
                                        <Button 
                                            disabled={ data.idStatusUsuario === 1 ? true : false }
                                            onClick={ ()=> 
                                            {
                                                console.log(data);
                                                toggleConfirm();
                                            }}
                                            className={`btn btn-success mx-1 ${ opcion.alta > 0 ? "" : "d-none" }  `}>
                                                <i className="ri-checkbox-circle-line p-0"></i>
                                        </Button>
                                        
                                    </>),
                                    sortable: true
                                },
                            
                            ]);
                            if(sessionInformationResponse.strSessionId != "")
                            {
                                listuser(sessionInformationResponse.strSessionId);
                            }
                        }
                    }
                )
            }
        )
       });
    }, [menuResponse.entModulo])

    useEffect(()=> {
        if(listUsuarioResponse.usuarios.length > 0 ) setData(listUsuarioResponse.usuarios);
    }, [listUsuarioResponse.usuarios])

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