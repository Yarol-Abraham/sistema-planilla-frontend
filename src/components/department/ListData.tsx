import { FunctionComponent, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Card, CardBody, Col } from "reactstrap";

import { useAuthenticationAction } from "../../hooks/UseAuthentication";
import { useMenuAction } from "../../hooks/UseMenu";

import { TableHeaderDepartment } from "../../models/dataTable/DataTableHeaders";
import { getHeaders } from "../../services/Department";

import { useDepartmentContext } from "../../hooks/UseDepartment";
import CreateModal from "./Modal";
import { MODE_ACTION } from "../../models/department/CreateModal";

export const ListaData: FunctionComponent<{}> = () => 
{
    const { sessionInformationResponse } = useAuthenticationAction();
    const { menuResponse } = useMenuAction();
    const { getDepartments, getDepartment, departmentListResponse, department } = useDepartmentContext();

    const [ headers, setHeaders ] = useState<TableHeaderDepartment>([]);
    const [ data, setData ] = useState<any>([]);
    
    const [ isOpen, setisOpen ] = useState(false);
    const toggle = ()=> setisOpen(!isOpen);

  
    useEffect(()=> {
        if(menuResponse.entModulo.length > 0) setHeaders(getHeaders(menuResponse.entModulo, [toggle, getDepartment]));
     }, [menuResponse.entModulo])

     useEffect(()=> {
        if(sessionInformationResponse.strSessionId != "")
        {
            getDepartments(sessionInformationResponse.strSessionId);
        }
    }, [sessionInformationResponse])

    useEffect(()=> {
        if(departmentListResponse.departamentos.length > 0 ) setData(departmentListResponse.departamentos);
    }, [departmentListResponse.departamentos])

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
            <CreateModal isOpen={isOpen} toggleF={toggle} mode={MODE_ACTION.UPDATE} data={department} />
        </>
    );
}
