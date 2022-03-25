import { Container, Row, Col, Button, Form, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import ErrorView from './errorView';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
const { signIn } = require('../util/userManager');
const { login } = require('../features/userSession');

function BookshelfLogin(props) {

    const [busy, setBusy] = useState(false);
    const [error, setError] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    async function handleSignIn(event) {
        event.preventDefault();
        event.stopPropagation();
        const username = event.target.username.value;
        const password = event.target.password.value;
        setBusy(true);
        try {
            const loginResponse = await Auth.signIn(username, password);
            console.log(loginResponse);
            navigate('/home');
        } catch (error) {
            setError(error);
            setBusy(false);
        }
    }

    return (
        <Container>
            {error &&
                <ErrorView error={error} />
            }
            <Form onSubmit={handleSignIn}>
                <Row>
                    <Col>
                        <Form.Group controlId="username">
                            <Form.Control type="text" placeholder="Username" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="password">
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>

                    </Col>
                </Row>
                <Row>
                    <Col className='md-auto'>
                        <Button variant="primary" type="submit" className='mb-4' disabled={busy}>
                            Sign In
                            {busy && <Spinner animation='border' variant='light' size='sm' />}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>

    );
}

export default BookshelfLogin;
