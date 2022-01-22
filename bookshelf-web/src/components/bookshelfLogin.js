import { Container, Row, Col, Button, Form, Spinner, Alert } from 'react-bootstrap';
import userManager from '../util/userManager';
import { useState } from 'react';
import ErrorView from './errorView';

function BookshelfLogin(props) {

    const [busy, setBusy] = useState(false);
    const [error, setError] = useState();

    async function signIn(event) {
        event.preventDefault();
        event.stopPropagation();
        const username = event.target.username.value;
        const password = event.target.password.value;
        setBusy(true);
        try {
            const loginResponse = await userManager.login(username, password);
            console.log(loginResponse);
            props.loginCallback(loginResponse);
            setError(null);
        } catch (error) {
            setError(error);
        }
        setBusy(false);
    }

    return (
        <Container>
            {error &&
                <ErrorView error={error} />
            }
            <Form onSubmit={signIn}>
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
