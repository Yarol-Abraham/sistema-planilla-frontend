
// components
import Layout from '../../layout/Layout';

import { 
  Card, 
  CardBody, 
  CardHeader, 
  Col, 
  Container, 
  Row } from 'reactstrap';

  import ListData from '../../components/role/ListData';

export function Role () {
  return (
    <Layout>
      <Container>
        <Row>
          <Col lg={12}>
            <Card className={"iq-card custom-zindex"}>
                <CardHeader>
                <h3 className='mx-2 fw-bold'>Roles</h3>
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
                            <button type="button" className="btn iq-bg-primary iq-waves-effect btn-lg"  >
                                    Nuevo Rol
                                </button>
                            </div>
                        </Col>
                    </div>
                 
                </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <ListData />
        </Row>
      </Container>
    </Layout>
  );
}
