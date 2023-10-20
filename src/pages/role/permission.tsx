import { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, FormGroup, Input, Label, Row } from 'reactstrap';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from '../../layout/Layout';

import { useUser } from '../../hooks/UseUser';
import { useAuthenticationAction } from '../../hooks/UseAuthentication';
import { useRole } from '../../hooks/UseRole';

import { RoleAssign } from '../../context/models/role/role';
import { SUCCESS } from '../../utils/Methods';

export default function Permission()
{
    const [ idUsuario, setIdUsuario ] = useState("");
    const [ rolesAssign, setRolesAssign ] = useState<Array<RoleAssign>>([]);
    const [ notrolesAssign, setNotRolesAssign ] = useState<Array<RoleAssign>>([]);

    const { sessionInformationResponse } = useAuthenticationAction();
    const { listuser, listUsuarioResponse } = useUser();
    const { getAssignedRoles, getUnassignedRoles,  roleListAssignResponse, roleListUnassignResponse, grantPermission, notgrantPermission } = useRole();
    
    useEffect(()=> {
        if(sessionInformationResponse.strSessionId != "")
        {
            listuser(sessionInformationResponse.strSessionId);
        }
    }, [sessionInformationResponse.strSessionId])

    const handleAddPermission = function(permission: RoleAssign)
    {
        setRolesAssign([ ...rolesAssign, ...[permission]]);
    }

    const handleNotAddPermission = function(permission: RoleAssign)
    {
        setNotRolesAssign([ ...notrolesAssign, ...[permission]]);
    }

    const addPermission = async function()
    {
        if(rolesAssign.length == 0)
        {
            alert("Asegurate de seleccionar almenos un rol");
            return;
        }
       let result: any = await grantPermission(rolesAssign, sessionInformationResponse.strSessionId);
        if(result.strResponseCode == SUCCESS)
        {
            toast.success(result.strResponseMessage);
        }else
        {
            toast.error(result.strResponseMessage);
        }
        getAssignedRoles(idUsuario, sessionInformationResponse.strSessionId);
        getUnassignedRoles(idUsuario, sessionInformationResponse.strSessionId);
    }

    const notaddPermission = async function()
    {
        if(notrolesAssign.length == 0)
        {
            alert("Asegurate de seleccionar almenos un rol");
            return;
        }
       let result: any = await notgrantPermission(notrolesAssign, sessionInformationResponse.strSessionId);
        if(result.strResponseCode == SUCCESS)
        {
            toast.success(result.strResponseMessage);
        }else
        {
            toast.error(result.strResponseMessage);
        }
        getAssignedRoles(idUsuario, sessionInformationResponse.strSessionId);
        getUnassignedRoles(idUsuario, sessionInformationResponse.strSessionId);
    }

  return (
    <>
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
                            <h3 className='mx-2 fw-bold'>Asignar Roles</h3>
                        </CardHeader>
                        <CardBody className={"iq-card-body "}>
                            <FormGroup className="form-group">
                                <label htmlFor="selectuser">Seleccionar Usuario</label>
                                <Input 
                                    type={"select"} 
                                    className="form-control" 
                                    id="selectuser"
                                    defaultValue={"default"}
                                    onChange={(e)=>{
                                        setIdUsuario(e.target.value);
                                         getAssignedRoles(e.target.value, sessionInformationResponse.strSessionId);
                                         getUnassignedRoles(e.target.value, sessionInformationResponse.strSessionId);
                                    }}

                                >
                                <option  disabled value={"default"}>-- Seleccionar -- </option>
                                    {
                                        listUsuarioResponse.usuarios.map( usuario => (
                                            <option key={usuario.idUsuario} value={usuario.idUsuario}>{usuario.nombre + " " + usuario.apellido}</option>
                                        ))
                                    }
                                </Input>
                            </FormGroup>
                            
                            {/* <Row className='d-flex justify-content-center'>
                                <Col lg={11} className='mb-2'>
                                    <h5>Acciones</h5>
                                </Col>
                                <Col lg={11} className='d-flex flex-row'>
                                   <FormGroup className=''>
                                        <Input type="checkbox" className="border border-info custom-control-input mx-2" />
                                        <Label className="custom-control-label fw-bold" htmlFor={"alta"}>Dar de Alta</Label>  
                                    </FormGroup>  
                                    <FormGroup  className='mx-2'>
                                        <Input type="checkbox" className="border border-info custom-control-input mx-2" />
                                        <Label className="custom-control-label fw-bold" htmlFor={"baja"}>Dar de Baja</Label>  
                                    </FormGroup>  
                                    <FormGroup >
                                        <Input type="checkbox" className="border border-info custom-control-input mx-2" />
                                        <Label className="custom-control-label fw-bold" htmlFor={"cambio"}>Actualizar</Label>  
                                    </FormGroup>   
                                </Col>
                            </Row> */}

                            <Row className='d-flex justify-content-center mb-4'>

                                <Col className='shadow p-0 m-0'  style={{ height: '30rem' }} lg={5}>
                                    <CardHeader className='bg-primary border m-0'>
                                        <h6 className='fw-bold text-white'>No Asignados</h6>
                                    </CardHeader>
                                    <div className="p-4 custom-control custom-checkbox custom-control-inline">
                                        {
                                            roleListUnassignResponse.roles.map( role => (
                                                <div key={role.idRole}>
                                                    <Input 
                                                        value={role.idRole}
                                                        type="checkbox" 
                                                        className="border border-primary custom-control-input mx-2" 
                                                        onChange={(e)=> {
                                                            if(idUsuario.trim() == "")
                                                            {
                                                                e.target.checked = false;
                                                                alert("debes de seleccionar un usuario");
                                                                return;
                                                            }
                                                           if(e.target.checked)
                                                            {
                                                                handleAddPermission({ idRole: e.target.value, idUsuario})
                                                            }
                                                            else{
                                                                setRolesAssign(rolesAssign.filter(role => role.idUsuario == idUsuario && role.idRole != e.target.value ));
                                                            }
                                                        }}
                                                    />
                                                        <Label className="custom-control-label fw-bold" htmlFor={role.nombre}>
                                                        {role.nombre}
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

                                <Col className='shadow p-0 m-0' style={{ height: '30rem' }} lg={5}>
                                    <CardHeader className='bg-primary border m-0'>
                                        <h6 className='fw-bold text-white'>Asignados</h6>
                                    </CardHeader>
                                   <div className="p-4 custom-control custom-checkbox custom-control-inline">
                                        {
                                            roleListAssignResponse.roles.map( role => (
                                                <div key={role.idRole}>
                                                    <Input 
                                                        value={role.idRole}
                                                        type="checkbox" 
                                                        className="border border-primary custom-control-input mx-2" 
                                                        onChange={(e)=> {
                                                            if(idUsuario.trim() == "")
                                                            {
                                                                e.target.checked = false;
                                                                alert("debes de seleccionar un usuario");
                                                                return;
                                                            }
                                                           if(e.target.checked)
                                                            {
                                                                handleNotAddPermission({ idRole: e.target.value, idUsuario})
                                                            }
                                                            else{
                                                                setNotRolesAssign(notrolesAssign.filter(role => role.idUsuario == idUsuario && role.idRole != e.target.value ));
                                                            }
                                                        }}    
                                                    />
                                                        <Label className="custom-control-label fw-bold" htmlFor={role.nombre}>
                                                        {role.nombre}
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
    </>
  );
}