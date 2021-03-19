import {Form, Container, Row, Col, Button, Jumbotron} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
const userManager = require('../util/userManager');


function Welcome(props) {
    async function createAccount(event) {
        event.stopPropagation();
        event.preventDefault();
        const account = {
            userName: event.target.formBasicEmail.value,
            password: event.target.formBasicPassword.value,
            firstName: event.target.formFirstName.value,
            lastName: event.target.formLastName.value
        }
        await userManager.createAccount(account);
        props.createAccountCallback(account);
        props.history.push('/confirm');
        
    }

    return (
        <Jumbotron>
            <Container className='rounded-lg shadow bg-light'>
                <Row className='align-center'>
                    <Col lg='12'><h3>Create an account to build your bookshelf</h3></Col>                
                </Row>
                <Form onSubmit={createAccount}>
                    <Row>                
                        <Col lg='6'>                        
                            <Form.Group controlId="formFirstName">
                                <Form.Control type="text" placeholder="First Name" />
                            </Form.Group>
                        </Col>
                        <Col lg='6'>
                            <Form.Group controlId="formLastName">
                                <Form.Control type="text" placeholder="Last Name" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg='3'>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="Email" />
                            </Form.Group>
                        </Col>
                        <Col lg='3'>
                            <Form.Group controlId="formBasicPassword">                        
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>                    
                        </Col>
                    </Row>
                    <Row>
                        <Col lg='3'>
                            <Button variant="primary" type="submit" className='mb-4'>
                                Create Account
                            </Button>
                        </Col>
                    </Row>                                            
                </Form>
            </Container>
        </Jumbotron>
    )
}

export default withRouter(Welcome);