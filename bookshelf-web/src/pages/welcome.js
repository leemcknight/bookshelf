import { Form, Container, Row, Col, Jumbotron, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SubmitButton from '../components/SubmitButton';
import Home from './home';
const userManager = require('../util/userManager');
const { useState } = require('react');

function Welcome(props) {
    const [error, setError] = useState();
    const [busy, setBusy] = useState(false);
    const navigate = useNavigate();

    async function createAccount(event) {
        event.stopPropagation();
        event.preventDefault();
        const account = {
            userName: event.target.formBasicEmail.value,
            password: event.target.formBasicPassword.value,
            displayName: event.target.formFirstName.value,
            firstName: event.target.formFirstName.value,
            lastName: event.target.formLastName.value
        }
        try {
            setBusy(true);
            await userManager.createAccount(account);
            props.createAccountCallback(account);
            setBusy(false);
            navigate('/confirm');
        } catch (error) {
            if (error.message) {
                setError(error.message);
            } else {
                setError(JSON.stringify(error));
            }
            setBusy(false);
        }

    }

    return (
        <Jumbotron style={{ backgroundImage: `url('bookshelf-home.jpg')`, backgroundSize: 'cover' }}>
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
                            <SubmitButton title="CreateAccount" isLoading={busy} />
                        </Col>
                    </Row>
                </Form>
            </Container>
        </Jumbotron>
    )
}

export default Welcome;
