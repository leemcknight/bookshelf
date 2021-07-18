import { Form, Container, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import UserManager from '../util/userManager';
import {withRouter} from 'react-router-dom';
import {useState} from 'react';

function VerifyEmail(props) {
    const  [busy, setBusy] = useState();
    const [verificationResult, setVerificationResult] = useState();
    async function verify(event) {
        event.stopPropagation();
        event.preventDefault();

        const email = event.target.email.value;
        const code = event.target.code.value;
        const password = event.target.password.value;
        setBusy(true);
        const response = await UserManager.confirmAccount(email, code);
        const loginResponse = await UserManager.login(email, password);
        props.loginCallback(loginResponse);
        setBusy(false);
    }
    
    return(
        <Container>
            {props.account && 
            <Row>
                <Col>We have sent a confirmation email to {props.account.userName}.  Please enter the confirmation code attached.
                </Col>
            </Row>
            
            }
            {verificationResult &&
            <Row>
                <Col><Alert variant='warning'>{verificationResult}</Alert>
            </Col>
        </Row>
            }
            <Row>
                <Col>
                    <Form onSubmit={verify}>
                        <Form.Row>
                            <Col>
                                <Form.Control type='input' placeholder='Email Address' id='email' />
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Form.Control type='input' placeholder='Confirmation Code' id='code' />
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Form.Control type='input' placeholder='Password' id='password' />
                            </Col>
                        </Form.Row>
                        <Button type='submit' disabled={busy}>Verify {busy && <Spinner animation='border' size='sm' />}</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default withRouter(VerifyEmail);
