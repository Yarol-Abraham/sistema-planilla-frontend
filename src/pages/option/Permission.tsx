
import { Button, Card, CardBody, CardHeader, Col, Container, FormGroup, Input, Label, Row } from 'reactstrap';
import Layout from '../../layout/Layout';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { useRole } from '../../hooks/UseRole';
import { useAuthenticationAction } from '../../hooks/UseAuthentication';
import { useEffect, useState } from 'react';
import { OptionAssign } from '../../context/models/role/role';
import { SUCCESS } from '../../utils/Methods';

export default function Permission()
{   
    const [ idRole, setIdRole ] = useState("");
    const [ rolesOptionAssign, setRolesOptionAssign ] = useState<Array<OptionAssign>>([]);
    const [ notrolesOptionUnassign, setNotRolesOptionUnassign ] = useState<Array<OptionAssign>>([]);
    const [ optionUp, setOptionUp ] = useState("0");
    const [ optionDown, setOptionDown ] = useState("0");
    const [ optionUpdate, setOptionUpdate ] = useState("0");

    const { sessionInformationResponse } = useAuthenticationAction();
    
    const { getRols, roleListResponse, 
            getOptionUnassigned, roleListOptionUnassignResponse, 
            getOptionAssigned, roleListOptionAssignResponse,
            grantOptionPermission, notgranOptionPermission
        } = useRole();
    
    const handleAddPermission = function(permission: OptionAssign)
    {
        setRolesOptionAssign([ ...rolesOptionAssign, ...[permission]]);
    }

    const handleNotAddPermission = function(permission: OptionAssign)
    {
        setNotRolesOptionUnassign([ ...notrolesOptionUnassign, ...[permission]]);
    }

    const addPermission = async function()
    {
        if(rolesOptionAssign.length == 0)
        {
            alert("Asegurate de seleccionar almenos una opcion");
            return;
        }
       let result: any = await grantOptionPermission(rolesOptionAssign, sessionInformationResponse.strSessionId);
        if(result.strResponseCode == SUCCESS)
        {
            toast.success(result.strResponseMessage);
        }else
        {
            toast.error(result.strResponseMessage);
        }
        getOptionUnassigned(idRole, sessionInformationResponse.strSessionId);
        getOptionAssigned(idRole, sessionInformationResponse.strSessionId);
        setRolesOptionAssign([]);
    }

    const notaddPermission = async function()
    {
        if(notrolesOptionUnassign.length == 0)
        {
            alert("Asegurate de seleccionar almenos una opcion");
            return;
        }
       let result: any = await notgranOptionPermission(notrolesOptionUnassign, sessionInformationResponse.strSessionId);
        if(result.strResponseCode == SUCCESS)
        {
            toast.success(result.strResponseMessage);
        }else
        {
            toast.error(result.strResponseMessage);
        }
        getOptionUnassigned(idRole, sessionInformationResponse.strSessionId);
        getOptionAssigned(idRole, sessionInformationResponse.strSessionId);
        setNotRolesOptionUnassign([]);
    }

    useEffect(()=> {
        if(sessionInformationResponse.strSessionId != "") getRols(sessionInformationResponse.strSessionId);
    }, [sessionInformationResponse])

    return (
        <Layout>
            <Container>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
                <Row>
                    <Col lg={12}>
                        <Card>
                            <CardHeader>
                                <h3 className='mx-2 fw-bold'>Asignar Opciones</h3>
                            </CardHeader>

                            <CardBody>
                                <FormGroup className="form-group">
                                    <label htmlFor="selectuser">Seleccionar Usuario</label>
                                    <Input 
                                        type={"select"} 
                                        className="form-control" 
                                        id="selectuser"
                                        defaultValue={"default"}
                                        onChange={(e)=>{
                                            setIdRole(e.target.value);
                                            getOptionAssigned(e.target.value, sessionInformationResponse.strSessionId);
                                            getOptionUnassigned(e.target.value, sessionInformationResponse.strSessionId);
                                        }}

                                    >
                                        <option  disabled value={"default"}>-- Seleccionar -- </option>
                                        {
                                            roleListResponse.roles.map( role => (
                                                <option key={role.idRole} value={role.idRole}>{role.nombre}</option>
                                            ))
                                        }
                                    </Input>
                                </FormGroup>
                                
                                <Row className='d-flex justify-content-center'>
                                    <Col lg={11} className='mb-2'>
                                        <h5>Acciones</h5>
                                    </Col>
                                    <Col lg={11} className='d-flex flex-row'>
                                    <FormGroup >
                                            <Input 
                                                type="checkbox"
                                                className="border border-info custom-control-input mx-2" 
                                                name="alta"
                                                onChange={(e)=>{
                                                    setOptionUp(e.target.checked ? "1" : "0");
                                                    if(rolesOptionAssign.length > 0)
                                                    {
                                                        setRolesOptionAssign( rolesOptionAssign.map( option => {
                                                            if(option.idRole == idRole )
                                                            {
                                                                option.alta = e.target.checked ? "1" : "0"; 
                                                            }
                                                            return option;
                                                        }));
                                                    }
                                                } }
                                            />
                                            <Label className="custom-control-label fw-bold" htmlFor={"alta"}>Dar de Alta</Label>  
                                        </FormGroup>  
                                        <FormGroup >
                                            <Input 
                                                type="checkbox" 
                                                className="border border-info custom-control-input mx-2" 
                                                name="baja"
                                                onChange={(e)=>{ 
                                                    setOptionDown(e.target.checked ? "1" : "0")
                                                    if(rolesOptionAssign.length > 0)
                                                    {
                                                        setRolesOptionAssign( rolesOptionAssign.map( option => {
                                                            if(option.idRole == idRole )
                                                            {
                                                                option.baja = e.target.checked ? "1" : "0"; 
                                                            }
                                                            return option;
                                                        }));
                                                    }
                                                }}
                                            />
                                            <Label className="custom-control-label fw-bold" htmlFor={"baja"}>Dar de Baja</Label>  
                                        </FormGroup>  
                                        <FormGroup >
                                            <Input 
                                                type="checkbox" 
                                                className="border border-info custom-control-input mx-2" 
                                                name="cambio"
                                                onChange={(e)=>{ 
                                                    setOptionUpdate(e.target.checked ? "1" : "0")
                                                    if(rolesOptionAssign.length > 0)
                                                    {
                                                        setRolesOptionAssign( rolesOptionAssign.map( option => {
                                                            if(option.idRole == idRole )
                                                            {
                                                                option.cambio = e.target.checked ? "1" : "0"; 
                                                            }
                                                            return option;
                                                        }));
                                                    }
                                                }}
                                            />
                                            <Label className="custom-control-label fw-bold" htmlFor={"cambio"}>Actualizar</Label>  
                                        </FormGroup>   
                                    </Col>
                                </Row> 
                                
                                <Row className='d-flex justify-content-center mb-4 '>
                                    <Col className='shadow p-0 m-0  overflow-auto'  style={{ height: '30rem' }} lg={5}>
                                        <CardHeader className='bg-primary border m-0'>
                                            <h6 className='fw-bold text-white'>No Asignados</h6>
                                        </CardHeader>
                                        <div className="p-4 custom-control custom-checkbox custom-control-inline">
                                            {
                                                roleListOptionUnassignResponse.option.map( op => (
                                                    <div key={op.idOpcion}>
                                                        <Input 
                                                            value={op.idOpcion}
                                                            type="checkbox" 
                                                            className="border border-primary custom-control-input mx-2" 
                                                            onChange={(e)=> {
                                                                if(idRole.trim() == "")
                                                                {
                                                                    e.target.checked = false;
                                                                    alert("debes de seleccionar un usuario");
                                                                    return;
                                                                }
                                                            if(e.target.checked)
                                                                {
                                                                    handleAddPermission({ 
                                                                        idOpcion: e.target.value, 
                                                                        idRole,
                                                                        alta: optionUp,
                                                                        baja: optionDown,
                                                                        cambio: optionUpdate,
                                                                        exportar: "0",
                                                                        imprimir: "0"
                                                                    })
                                                                }
                                                                else{
                                                                    setRolesOptionAssign(rolesOptionAssign.filter(option => option.idRole == idRole && option.idOpcion != e.target.value ));
                                                                }
                                                            }}
                                                        />
                                                            <Label className="custom-control-label fw-bold" htmlFor={op.nombre}>
                                                            {op.nombre}
                                                        </Label>    
                                                    </div>
                                                ) )
                                            }
                                        </div>
                                    </Col>

                                    <Col lg={1} className=' d-flex justify-content-center align-items-center flex-column'>
                                        <Button className='text-center mb-1 ' onClick={addPermission}>
                                            <i className="p-0 ri-arrow-right-line"></i>
                                        </Button>
                                        <Button className='text-center mt-1' onClick={notaddPermission}>
                                            <i className="p-0 ri-arrow-left-line"></i>
                                        </Button>
                                    </Col>
                                    
                                    <Col className='shadow p-0 m-0  overflow-auto'  style={{ height: '30rem' }} lg={5}>
                                        <CardHeader className='bg-primary border m-0'>
                                            <h6 className='fw-bold text-white'>No Asignados</h6>
                                        </CardHeader>
                                        <div className="p-4 custom-control custom-checkbox custom-control-inline">
                                            {
                                                roleListOptionAssignResponse.option.map( op => (
                                                    <div key={op.idOpcion}>
                                                        <Input 
                                                            value={op.idOpcion}
                                                            type="checkbox" 
                                                            className="border border-primary custom-control-input mx-2" 
                                                            onChange={(e)=> {
                                                                if(idRole.trim() == "")
                                                                {
                                                                    e.target.checked = false;
                                                                    alert("debes de seleccionar un usuario");
                                                                    return;
                                                                }
                                                            if(e.target.checked)
                                                                {
                                                                    handleNotAddPermission({ 
                                                                        idOpcion: e.target.value, 
                                                                        idRole,
                                                                        alta: optionUp,
                                                                        baja: optionDown,
                                                                        cambio: optionUpdate,
                                                                        exportar: "0",
                                                                        imprimir: "0"
                                                                    })
                                                                }
                                                                else{
                                                                    setNotRolesOptionUnassign(notrolesOptionUnassign.filter(option => option.idRole == idRole && option.idOpcion != e.target.value ));
                                                                }
                                                            }}
                                                        />
                                                            <Label className="custom-control-label fw-bold" htmlFor={op.nombre}>
                                                            {op.nombre}
                                                        </Label>    
                                                    </div>
                                                ) )
                                            }
                                        </div>
                                    </Col>

                                </Row>

                            </CardBody>

                        </Card>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}