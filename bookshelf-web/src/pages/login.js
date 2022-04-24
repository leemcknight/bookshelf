import { Container, Row, Col, Button, Form, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import ErrorView from '../components/errorView';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { login } from '../features/userSession';

function Login() {

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
            await Auth.signIn(username, password);
            const user = await Auth.currentAuthenticatedUser();
            dispatch(login(user.attributes));
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
                            {busy && <Spinner animation='border' className='ml-2' variant='light' size='sm' />}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>

    );
}

export default Login;
