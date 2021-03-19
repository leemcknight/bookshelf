import {Container, Row, Col, Button, Form, Spinner} from 'react-bootstrap';
import userManager from '../util/userManager';
import {useState} from 'react';

function BookshelfLogin(props) {

    const [busy, setBusy] = useState(false);

    async function signIn(event) {
        event.preventDefault();
        const username = event.target.formUsername;
        const password = event.target.formPassword;
        setBusy(true);
        const loginResponse = await userManager.login(username, password);
        console.log(loginResponse);
        setBusy(false);
    }

    return (        
        <Container>
            <Form>
                <Row>
                    <Form.Group controlId="formUsername">
                        <Form.Control type="text" placeholder="Username" />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group controlId="formPassword">
                        <Form.Control type="text" placeholder="Password" />
                    </Form.Group>
                </Row>
                <Row>                    
                    <Button variant="primary" type="submit" className='mb-4' disabled={busy} onClick={signIn}>
                        Sign In
                        {busy && <Spinner animation='border' variant='primary' />}
                    </Button>                    
                </Row>    
            </Form>
        </Container>

    );
}

export default BookshelfLogin;