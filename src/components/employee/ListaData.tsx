import { FunctionComponent, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Card, CardBody, Col } from "reactstrap";

import { useAuthenticationAction } from "../../hooks/UseAuthentication";
import { useMenuAction } from "../../hooks/UseMenu";
import { useEmployee } from "../../hooks/UseEmployee";

import { TableHeaderEmployee } from "../../models/dataTable/DataTableHeaders";
import { getHeaders } from "../../services/Employee";
import { MODE_ACTION } from "../../models/employee/CreateModal";
import { CreateModal } from "./CreateModal";
import { usePeople } from "../../hooks/UsePeople";
import { useDepartmentContext } from "../../hooks/UseDepartment";
import { usePositionContext } from "../../hooks/UsePosition";

export const ListaData: FunctionComponent<{}> = () => 
{
    const { sessionInformationResponse } = useAuthenticationAction();
    const { menuResponse } = useMenuAction();
    const { getEmployees, employeeListResponse, employee, getEmployee } = useEmployee();
    const { getPeoples } = usePeople();
    const { getDepartments } = useDepartmentContext();
    const { getPositionByDeparment } = usePositionContext();

    const [ headers, setHeaders ] = useState<TableHeaderEmployee>([]);
    const [ data, setData ] = useState<any>([]);
    
    const [ isOpen, setisOpen ] = useState(false);
    const toggle = ()=> setisOpen(!isOpen);

    function getData() 
    {
        getPeoples(sessionInformationResponse.strSessionId);
        getDepartments(sessionInformationResponse.strSessionId);
    }

    useEffect(()=> {
        if(employee.puesto.idPuesto > 0)
        {
            getPositionByDeparment(+employee.puesto.idDepartamento, sessionInformationResponse.strSessionId);
        }  
    }, [employee])

    useEffect(()=> {
        if(menuResponse.entModulo.length > 0) setHeaders(getHeaders(menuResponse.entModulo, [toggle, getEmployee, getData]));
     }, [menuResponse.entModulo])

     useEffect(()=> {
        if(sessionInformationResponse.strSessionId != "")
        {
            getEmployees(sessionInformationResponse.strSessionId);
        }
    }, [sessionInformationResponse])

    useEffect(()=> {
        if(employeeListResponse.empleados.length > 0 ) setData(employeeListResponse.empleados);
    }, [employeeListResponse.empleados])

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
            <CreateModal isOpen={isOpen} toggleF={toggle} mode={MODE_ACTION.UPDATE} data={employee} />
        </>
    );
}
