import { useState } from 'react';

import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { ListaData } from "../../components/department/ListData";
import Layout from "../../layout/Layout";
import CreateModal from '../../components/department/Modal';

import { MODE_ACTION } from '../../models/department/CreateModal';
import { useDepartmentContext } from '../../hooks/UseDepartment';

export default function Department() 
{
    const { department  } = useDepartmentContext();

    const [ isOpen, setisOpen ] = useState(false);
    const toggle = ()=> setisOpen(!isOpen);

    return (
        <Layout>
           <Container>
                <Row>
                    <Col lg={12}>
                        <Card className={"iq-card"}>
                            <CardHeader>
                                <h3 className='mx-2 fw-bold'>Departamentos</h3>
                            </CardHeader>

                            <CardBody className={"iq-card-body "}>
                                <div className="d-flex justify-content-between align-items-center flex-wrap flex-column-reverse flex-md-row mb-2 ">
                                    <Col className='iq-todo-page col-12 col-md-8 col-lg-6'>
                                        <form className="position-relative">
                                            <div className="form-group mb-0">
                                                <input type="text" className="form-control todo-search" id="exampleInputEmail002"  placeholder="Search" />
                                                <a className="search-link" href="#"><i className="ri-search-line"></i></a>
                                            </div>
                                        </form>
                                    </Col>
                                    
                                    <Col  className={"d-flex justify-content-end mb-2 mb-md-0 col-12 col-md-4 col-lg-6"}>
                                        <div className=" todo-notification d-flex align-items-center">
                                        <button type="button" className="btn iq-bg-primary iq-waves-effect btn-lg" onClick={toggle} >
                                                Agregar Departamento
                                            </button>
                                        </div>
                                    </Col>
                                </div>
                            </CardBody>
                        </Card>       
                    </Col>
                    <CreateModal isOpen={isOpen} toggleF={toggle} mode={MODE_ACTION.CREATE}  data={department} />
                </Row>

                <Row>
                    <ListaData />
                </Row>
           </Container>
        </Layout>
    )
}

