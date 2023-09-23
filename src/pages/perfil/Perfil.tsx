import React, { useState, useEffect } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap';
import Layout from '../../layout/Layout';

import { MODE_ACTION } from '../../models/perfil/CreateModal';
import CreateModal from "../../components/perfil/Modal";
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Perfil() {
    const [isOpen, setisOpen] = useState(false);
    const toggle = () => setisOpen(!isOpen);

    const [value, onChange] = useState<Value>([new Date(), new Date()]);

    const [userData, setUserData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        fechaNacimiento: '',
        genero: '',
        telefono: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes enviar los datos actualizados al servidor si es necesario
        console.log('Datos actualizados:', userData);
    };

    useEffect(() => {
        // Simulación de solicitud para recuperar datos del usuario
        const fetchUserData = async () => {
            try {
                const response = await fetch('/api/usuario'); // Reemplaza con la URL correcta para obtener datos del usuario
                if (response.ok) {
                    const userData = await response.json();
                    setUserData(userData);
                } else {
                    console.error('Error al recuperar datos del perfil');
                }
            } catch (error) {
                console.error('Error al recuperar datos del perfil:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <Layout>
            <Container>
                <Row>
                    <Col lg={6}>
                        <Card className={'iq-card custom-zindex'}>
                            <CardHeader>
                                <h3 className='mx-2 fw-bold'>Mi perfil</h3>
                            </CardHeader>
                            <CardBody className={'iq-card-body '}>
                            <Row>
                            <Col lg={5}>
                                <FormGroup>
                                    <Label for='nombre'>Nombre</Label>
                                    <Input
                                        type='text'
                                        name='nombre'
                                        id='nombre'
                                        value={userData.nombre}
                                        onChange={handleChange}
                                        disabled
                                    />
                                </FormGroup>
                                </Col >
                                <Col lg={5}>
                                <FormGroup>
                                    <Label for='apellido'>Apellido</Label>
                                    <Input
                                        type='text'
                                        name='apellido'
                                        id='apellido'
                                        value={userData.apellido}
                                        onChange={handleChange}
                                        disabled
                                    />
                                </FormGroup>
                                </Col >
                                </Row> 
                                <Row> 
                                <Col lg={5}>
                                <FormGroup>
                                    <Label for='correo'>Correo</Label>
                                    <Input
                                        type='email'
                                        name='correo'
                                        id='correo'
                                        value={userData.correo}
                                        onChange={handleChange}
                                        disabled
                                    />
                                </FormGroup>
                                </Col>
                            <Col lg={5}>
                        <FormGroup>
                            <Label for='telefono'>Teléfono</Label>
                            <Input
                                type='tel'
                                name='telefono'
                                id='telefono'
                                value={userData.telefono}
                                onChange={handleChange}
                                disabled
                            />
                        </FormGroup>
                    </Col>
                    </Row> 
                    <Row>
                    <Col lg={5}>
                                <FormGroup>
                                    <Label for='fechaNacimiento'>Fecha de Nacimiento</Label>
                                    <Input
                                        type='date'
                                        name='fechaNacimiento'
                                        id='fechaNacimiento'
                                        value={userData.fechaNacimiento}
                                        onChange={handleChange}
                                        disabled
                                    />
                                </FormGroup>
                    </Col>
                    <Col lg={5}>
                        <FormGroup>
                            <Label for='genero'>Género</Label>
                            <Input
                                type='select'
                                name='genero'
                                id='genero'
                                value={userData.genero}
                                onChange={handleChange}
                                disabled
                            >
                                <option value='masculino'>Masculino</option>
                                <option value='femenino'>Femenino</option>
                                <option value='otro'>Otro</option>
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>

                <Row className="justify-content-end">
                    <Col lg={6}>
                        <Button color="primary" onClick={toggle}>Editar</Button>
                        <CreateModal isOpen={isOpen} toggleF={toggle} mode={MODE_ACTION.UPDATE} />
                    </Col>
                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    
                    <Col lg={6}>
                     <div className="text-center mt-4">
             <img src="/src/assets/images/usuario.png" className="img-thumbnail" alt="..." style={{ width: "10rem", height: "10rem" }} />
             <br />
                   <Button color="primary" className="mt-2">Choose File</Button>
                   </div>
                  </Col>

                </Row>
                
            </Container>
        </Layout>
    );
}
