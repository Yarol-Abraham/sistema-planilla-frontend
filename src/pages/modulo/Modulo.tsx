import { useState } from 'react';
import { 
    Button,
    Card, 
    CardBody, 
    CardHeader, 
    Col, 
    Container, 
    Input, 
    Row } from 'reactstrap';

// components
import Layout from '../../layout/Layout';
import CreateModal from "../../components/Modulo/Modal";
import ListData from './ListData';

// interfaces
import { MODE_ACTION } from '../../models/modulo/CreateModal';

import DateRangePicker from '@wojtekmaj/react-daterange-picker';

import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];


export default function modulo() 
{

    const [ isOpen, setisOpen ] = useState(false);
    const toggle = ()=> setisOpen(!isOpen);

       
    const [value, onChange] = useState<Value>([new Date(), new Date()]);




    return (
        <>
            <Layout>
                <Container>
                    <Row>
                        <Col lg={12}>
                            <Card className={"iq-card custom-zindex"}>
                                <CardHeader>
                                <h3 className='mx-2 fw-bold'>Modulo</h3>
                                </CardHeader>
                                <CardBody className={"iq-card-body "}>
                                    <div className="d-flex justify-content-between align-items-center flex-wrap flex-column-reverse flex-md-row mb-2 ">
                                    
                                        <Col className='iq-todo-page col-12 col-md-8 col-lg-6'>
                                        <form className="position-relative">
                                            <div className="form-group mb-0">
                                                <input type="text" className="form-control todo-search" id="exampleInputEmail002"  placeholder="Search"
                                                />
                                                <a className="search-link" href="#"><i className="ri-search-line"></i></a>
                                            </div>
                                        </form>
                                           
                                        </Col>
                                        
                                        <Col  className={"d-flex justify-content-end mb-2 mb-md-0 col-12 col-md-4 col-lg-6"}>
                                            <div className=" todo-notification d-flex align-items-center">
                                            <button type="button" className="btn iq-bg-primary iq-waves-effect btn-lg" onClick={toggle} >
                                                    Nuevo Modulo
                                                </button>
                                            </div>
                                        </Col>
                                    </div>
                                    <div className='d-flex justify-content-first   flex-wrap flex-column-reverse flex-xl-row '>
                                        <Col className=' col-12 col-md-8 col-lg-5 col-xl-3 mb-0 mx-xl-1'>
                                                <DateRangePicker className={"form-control"} onChange={onChange} value={value} />
                                        </Col>

                                        <Col  className=' col-12 col-md-8 col-lg-5 col-xl-2 mb-0'>
                                            <Input type={"select"} className="form-control" style={{height: '41px' }} >
                                                <option defaultValue={""}>Seleccionar Estado</option>
                                                <option>0-18</option>
                                                <option>18-26</option>
                                                <option>26-46</option>
                                                <option>46-60</option>
                                                <option>Above 60</option>
                                            </Input>
                                        </Col>
                                        <Col>
                                       <Button color="dark" className='mx-2'   style={{height: '41px' }} >Filtrar</Button>{' '}
                                        </Col>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <CreateModal isOpen={isOpen} toggleF={toggle} mode={MODE_ACTION.CREATE} />
                    </Row>
                    <Row>
                        <ListData />
                    </Row>
                </Container>    
            </Layout>
        </>
            );
          }
          