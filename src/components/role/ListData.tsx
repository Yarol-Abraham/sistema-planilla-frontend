import { FunctionComponent, useState } from "react";
import { Button, Card, CardBody, Col } from "reactstrap";
import DataTable, { TableColumn  } from 'react-data-table-component';

import { ConfirmModal } from "../../components/modals/ConfirmModal";

type TableHeader = TableColumn<{}>[];

const ListData: FunctionComponent<{}> = () => 
{

    const [ headers, setHeaders ] = useState([]);
    const [ data, setData ] = useState([]);

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
                        noDataComponent={"No hay información para mostrar en este momento"}
                    />
                </CardBody>
            </Card>
        </Col>
        {/* <CreateModal isOpen={isOpen} toggleF={toggle} mode={MODE_ACTION.UPDATE} /> */}
        <ConfirmModal isOpen={isOpenConfirm} toggleF={toggleConfirm} />
       </>
    );

}

export default ListData;