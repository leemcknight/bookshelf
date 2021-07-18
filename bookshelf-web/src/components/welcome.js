import {Form, Container, Row, Col, Button, Jumbotron, Alert} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
const userManager = require('../util/userManager');
const {useState} = require('react');

function Welcome(props) {
    const [error, setError] = useState();

    async function createAccount(event) {
        event.stopPropagation();
        event.preventDefault();
        const account = {
            userName: event.target.formBasicEmail.value,
            password: event.target.formBasicPassword.value,
            firstName: event.target.formFirstName.value,
            lastName: event.target.formLastName.value
        }
        try {
            await userManager.createAccount(account);
            props.createAccountCallback(account);
            props.history.push('/confirm');
        } catch(error) {
            if(error.message) {
                setError(error.message);
            } else {
                setError(JSON.stringify(error));
            }
        }
        
    }

    return (
        <Jumbotron>
            <Container className='rounded-lg shadow bg-light'>
                <Row className='mt-3' hidden={!error}>
                    <Col><Alert variant='danger'>{error}</Alert></Col>
                </Row>
                <Row className='align-center'>
                    <Col><h3>Create an account to build your bookshelf</h3></Col>                
                </Row>
                <Form onSubmit={createAccount}>
                    <Row>                
                        <Col>                        
                            <Form.Group controlId="formFirstName">
                                <Form.Control type="text" placeholder="First Name" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formLastName">
                                <Form.Control type="text" placeholder="Last Name" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="Email" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formBasicPassword">                        
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>                    
                        </Col>
                    </Row>
                    <Row>
                        <Col>
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
