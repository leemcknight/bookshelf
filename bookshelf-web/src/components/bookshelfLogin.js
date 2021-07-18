import {Container, Row, Col, Button, Form, Spinner, Alert} from 'react-bootstrap';
import userManager from '../util/userManager';
import {useState} from 'react';

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
            props.loginCallback(loginResponse);
            console.log(loginResponse);
        } catch(error) {
            if(error.message) {
                setError(error.message);
            } else {
                setError(JSON.stringify(error));
            }
        }        
        setBusy(false);
    }

    return (        
        <Container>
            {error && 
            <Row>
                <Col><Alert variant='danger'>{error}</Alert></Col>
            </Row>
}
            <Form onSubmit={signIn}>
                <Row>
                    <Col>
                        <Form.Group controlId="formUsername">
                            <Form.Control type="text" placeholder="Username" id='username' />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="formPassword">
                            <Form.Control type="password" placeholder="Password" id='password' />
                        </Form.Group>
                    
                    </Col>
                </Row>
                <Row>           
                    <Col className='md-auto'>
                        <Button variant="primary" type="submit" className='mb-4' disabled={busy}>
                            Sign In
                            {busy && <Spinner animation='border' variant='primary' />}
                        </Button>
                    </Col>
                </Row>    
            </Form>
        </Container>

    );
}

export default BookshelfLogin;
