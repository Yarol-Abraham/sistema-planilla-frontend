import { FunctionComponent, useState, useEffect } from "react";
import { Card, CardBody, Col } from "reactstrap";
import DataTable from 'react-data-table-component';

import CreateModal from "../../components/role/Modal";

// models
import { MODE_ACTION } from "../../models/role/CreateModal";
import { TableHeaderRole } from "../../models/dataTable/DataTableHeaders";

// services
import { getHeaders } from "../../services/Role";

import { useRole } from "../../hooks/UseRole";
import { useAuthenticationAction } from "../../hooks/UseAuthentication";
import { useMenuAction } from "../../hooks/UseMenu";

const ListData: FunctionComponent<{}> = () => 
{
    const { sessionInformationResponse } = useAuthenticationAction();
    const { getRols, roleListResponse, getRole, role } = useRole();
    const { menuResponse } = useMenuAction();

    const [ headers, setHeaders ] = useState<TableHeaderRole>([]);
    const [ data, setData ] = useState<any>([])
 
    const [ isOpen, setisOpen ] = useState(false);
    const toggle = ()=> setisOpen(!isOpen);

    useEffect(()=> {
       if(menuResponse.entModulo.length > 0) setHeaders(getHeaders(menuResponse.entModulo, [getRole, toggle]));
    }, [menuResponse.entModulo])
    
    useEffect(()=> {
        if(roleListResponse.roles.length > 0 ) setData(roleListResponse.roles);
    }, [roleListResponse.roles])

    useEffect(()=> {
        if(sessionInformationResponse.strSessionId != "") getRols(sessionInformationResponse.strSessionId);
    }, [sessionInformationResponse])

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
        <CreateModal isOpen={isOpen} toggleF={toggle} mode={MODE_ACTION.UPDATE} data={role} />
       </>
    );

}

export default  ListData;