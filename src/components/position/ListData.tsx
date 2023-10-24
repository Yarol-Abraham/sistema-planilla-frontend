import { FunctionComponent, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Card, CardBody, Col } from "reactstrap";

import { useAuthenticationAction } from "../../hooks/UseAuthentication";
import { useMenuAction } from "../../hooks/UseMenu";

import { TableHeaderPosition } from "../../models/dataTable/DataTableHeaders";
import { getHeaders } from "../../services/Position";

import { usePositionContext } from "../../hooks/UsePosition";
import CreateModal from "./Modal";
import { MODE_ACTION } from "../../models/position/CreateModal";

export const ListaData: FunctionComponent<{}> = () => 
{
    const { sessionInformationResponse } = useAuthenticationAction();
    const { menuResponse } = useMenuAction();
    const { getPositions, getPosition, positionListResponse, position } = usePositionContext();

    const [ headers, setHeaders ] = useState<TableHeaderPosition>([]);
    const [ data, setData ] = useState<any>([]);
    
    const [ isOpen, setisOpen ] = useState(false);
    const toggle = ()=> setisOpen(!isOpen);

  
    useEffect(()=> {
        if(menuResponse.entModulo.length > 0) setHeaders(getHeaders(menuResponse.entModulo, [toggle, getPosition]));
     }, [menuResponse.entModulo])

     useEffect(()=> {
        if(sessionInformationResponse.strSessionId != "")
        {
            getPositions(sessionInformationResponse.strSessionId);
        }
    }, [sessionInformationResponse])

    useEffect(()=> {
        if(positionListResponse.puestos.length > 0 ) setData(positionListResponse.puestos);
    }, [positionListResponse.puestos])

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
            <CreateModal isOpen={isOpen} toggleF={toggle} mode={MODE_ACTION.UPDATE} data={position} />
        </>
    );
}
