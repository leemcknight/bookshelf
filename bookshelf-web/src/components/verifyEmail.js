import { Form, Container, Row, Col, Button, Modal, Spinner, Alert } from "react-bootstrap";
import { withRouter } from 'react-router-dom';
import { useState } from 'react';
const { signIn, confirmAccount } = require('../util/userManager');

function VerifyEmail(props) {
    const [busy, setBusy] = useState();
    const [error, setError] = useState();
    const [email, setEmail] = useState();
    const [confirmed, setConfirmed] = useState(false);

    /*
    async function resendCode(event) {
        event.stopPropagation();
        event.preventDefault();

        const email = event.target.email.value;
        setEmail(email);
        await resendConfirmationCode(email);
    }
    */

    async function login(event) {
        event.stopPropagation();
        event.preventDefault();
        const password = event.target.password.value;
        const response = await signIn(email, password);
        await props.loginCallback(response)
        props.history.push('/home');
    }

    async function verify(event) {
        event.stopPropagation();
        event.preventDefault();

        const email = event.target.email.value;
        setEmail(email);
        const code = event.target.code.value;
        setBusy(true);
        try {
            const response = await confirmAccount(email, code);
            setConfirmed(true);
            console.log(response);
        } catch (error) {
            if (error.message) {
                setError(error.message);
            } else {
                setError(JSON.stringify(error));
            }
        }
        setBusy(false);
    }

    return (
        <Container>
            {props.account &&
                <Row>
                    <Col>We have sent a confirmation email to {props.account.userName}.  Please enter the confirmation code attached.
                    </Col>
                </Row>

            }
            {confirmed &&
                <Row>
                    <Col><Alert variant='success'></Alert>
                    </Col>
                </Row>
            }
            {error &&
                <Row>
                    <Col><Alert variant='warning'>{error}</Alert></Col>
                </Row>
            }
            <Row className='m-5'>
                <Col>
                    <Form onSubmit={verify}>
                        <Form.Row>
                            <Col>
                                <Form.Control type='email' placeholder='Email Address' id='email' />
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Form.Control type='input' placeholder='Confirmation Code' id='code' />
                            </Col>
                        </Form.Row>
                        <Button type='submit' disabled={busy}>Verify {busy && <Spinner animation='border' size='sm' />}</Button>
                        <Button onClick='resendCode'>Resend Confirmation Code</Button>
                    </Form>
                </Col>
            </Row>
            <Modal show={confirmed}>
                <Form onSubmit={login}>
                    <Form.Row>
                        <Col>
                            <Form.Control type='password' placeholder='Password' id='password' />
                        </Col>
                    </Form.Row>
                    <Button type='submit' disabled={busy}>Login {busy && <Spinner animation='border' size='sm' />}</Button>
                </Form>
            </Modal>
        </Container>
    );
}

export default withRouter(VerifyEmail);
