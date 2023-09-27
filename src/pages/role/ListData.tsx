import { FunctionComponent, useState, useEffect } from "react";
import { Button, Card, CardBody, Col } from "reactstrap";
import DataTable, { TableColumn  } from 'react-data-table-component';

import CreateModal from "../../components/role/Modal";
import { ConfirmModal } from "../../components/modals/ConfirmModal";

// models
import { DataColumRol } from "../../models/dataTable/DataTable";
import { MODE_ACTION } from "../../models/role/CreateModal";

import { useRole } from "../../hooks/UseRole";
import { useAuthenticationAction } from "../../hooks/UseAuthentication";
import { useMenuAction } from "../../hooks/UseMenu";
type TableHeader = TableColumn<DataColumRol>[];

const ListData: FunctionComponent<{}> = () => 
{
    const { sessionInformationResponse } = useAuthenticationAction();
    const { getRols, roleListResponse } = useRole();
    const { menuResponse } = useMenuAction();

    const [ headers, setHeaders ] = useState<TableHeader>([]);
    const [ data, setData ] = useState<any>([])
 
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
                                        
                                        
                                    </>),
                                    sortable: true
                                },
                            
                            ]);
                            if(sessionInformationResponse.strSessionId != "")
                            {
                                getRols(sessionInformationResponse.strSessionId);
                            }
                        }
                    }
                )
            }
        )
       });
    }, [menuResponse.entModulo])
    
    
    useEffect(()=> {
        if(roleListResponse.roles.length > 0 ) setData(roleListResponse.roles);
    }, [roleListResponse.roles])


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