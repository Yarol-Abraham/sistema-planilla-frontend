import { FunctionComponent, useState, useEffect } from "react";
import DataTable from "react-data-table-component";

import { Card, CardBody, Col } from "reactstrap";
import { CreateModal } from "./Modal";

import { MODE_ACTION } from "../../models/people/CreateModal";

import { useAuthenticationAction } from "../../hooks/UseAuthentication";
import { useMenuAction } from "../../hooks/UseMenu";
import { usePeople } from "../../hooks/UsePeople";
import { TableHeaderPeople } from "../../models/dataTable/DataTableHeaders";
import { getHeaders } from "../../services/People";

export const ListaData: FunctionComponent<{}> = () => 
{
    const { sessionInformationResponse } = useAuthenticationAction();
    const { menuResponse } = useMenuAction();
    const { getPeoples, peopleListResponse } = usePeople();

    const [ headers, setHeaders ] = useState<TableHeaderPeople>([]);
    const [ data, setData ] = useState<any>([]);

    const [ isOpen, setisOpen ] = useState(false);
    const toggle = ()=> setisOpen(!isOpen);

    useEffect(()=> {
        if(menuResponse.entModulo.length > 0) setHeaders(getHeaders(menuResponse.entModulo, [toggle]));
     }, [menuResponse.entModulo])

     useEffect(()=> {
        if(sessionInformationResponse.strSessionId != "") getPeoples(sessionInformationResponse.strSessionId);
    }, [sessionInformationResponse])

    useEffect(()=> {
        if(peopleListResponse.personas.length > 0 ) setData(peopleListResponse.personas);
    }, [peopleListResponse.personas])

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
        <CreateModal isOpen={isOpen} toggleF={toggle} mode={MODE_ACTION.UPDATE} data={{}} />
    </>
    );
}