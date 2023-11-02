import React, { useState } from 'react';
import {
  Button,
  FormGroup,
  Input,
  Label,
  Container,
  Row,
  Col,
} from 'reactstrap';
import Layout from '../../layout/Layout';

interface FormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function Cambio() 
{
  
  const [formData, setFormData] = useState<FormData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  //const [isOpen, setisOpen] = useState(false);

//  const toggle = () => setisOpen(!isOpen);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
  
    const errors: Partial<FormData> = {};
    let isValid = true;

    if (!formData.currentPassword) {
      errors.currentPassword = 'La contraseña actual es obligatoria';
      isValid = false;
    }

    if (!formData.newPassword) {
      errors.newPassword = 'La nueva contraseña es obligatoria';
      isValid = false;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
      isValid = false;
    }

    if (!isValid) {
      setFormErrors(errors);
    } else {
     
      console.log('Formulario válido. Enviar datos al servidor:', formData);

      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setFormErrors({});
    }
  };

  return (
    <>
      <Layout>
        <Container>
          <Row>
            <Col lg={6} className='bg-white'>
              <form className="mt-4" onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="currentPassword">Contraseña actual</Label>
                  <Input
                    type="password"
                    id="currentPassword"
                    placeholder="Introducir contraseña actual"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                  />
                  {formErrors.currentPassword && (
                    <div className="text-danger">{formErrors.currentPassword}</div>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label for="newPassword">Nueva contraseña</Label>
                  <Input
                    type="password"
                    id="newPassword"
                    placeholder="Introducir nueva contraseña"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                  />
                  {formErrors.newPassword && (
                    <div className="text-danger">{formErrors.newPassword}</div>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label for="confirmPassword">Confirmar nueva contraseña</Label>
                  <Input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirmar nueva contraseña"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  {formErrors.confirmPassword && (
                    <div className="text-danger">{formErrors.confirmPassword}</div>
                  )}
                </FormGroup>
                <div className="d-inline-block w-100">
                  <Button color="primary" className="float-right">
                    Cambiar contraseña
                  </Button>
                </div>
              </form>
            </Col>
          </Row>
        </Container>
      </Layout>
    </>
  );
}









 
