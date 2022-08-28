// @flow

import { Form, Container, Row, Col, Button, Modal, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import React, { useState, MouseEvent } from 'react';
import SubmitButton from "../components/SubmitButton";
import { CognitoUser } from "amazon-cognito-identity-js";
import { Auth } from "aws-amplify";
import { TUser } from "../types";

type TWorkingState = {
    loginCallback: (response: CognitoUser) => void,
    account: TUser
}

interface ResendFormElements extends HTMLFormControlsCollection {
    email: string
}

interface ResendFormElement extends HTMLFormElement {
    readonly elements: ResendFormElements
}

interface VerifyFormElements extends HTMLFormControlsCollection {
    email: string,
    code: string
}

interface VerifyFormElement extends HTMLFormElement {
    readonly elements: VerifyFormElements
}

interface LoginFormElements extends HTMLFormControlsCollection {
    username: string,
    password: string
}

interface LoginFormElement extends HTMLFormElement {
    readonly elements: LoginFormElements
}

function VerifyEmail({ loginCallback, account }: TWorkingState): JSX.Element {
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");
    const [email, setEmail] = useState();
    const [confirmed, setConfirmed] = useState(false);
    const navigate = useNavigate();


    async function resendCode(event: React.MouseEvent<HTMLElement>) {
        /*
        event.stopPropagation();
        event.preventDefault();
        const email = event.currentTarget.email;
        setEmail(email);
        await resendConfirmationCode(email);
        */
    }


    async function login(event: React.FormEvent<LoginFormElement>) {
        event.stopPropagation();
        event.preventDefault();
        const password = event.currentTarget.password;
        const email = event.currentTarget.email;
        const user = await Auth.signIn(email, password);
        loginCallback(user)
        navigate('/home');
    }

    async function verify(event: React.FormEvent<VerifyFormElement>) {
        event.stopPropagation();
        event.preventDefault();

        const email = event.currentTarget.email;
        setEmail(email);
        const code = event.currentTarget.code;
        setBusy(true);
        try {
            await Auth.confirmSignUp(email, code);
            setConfirmed(true);
        } catch (error: any) {
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
            {account &&
                <Row>
                    <Col>We have sent a confirmation email to {account.email}.  Please enter the confirmation code attached.
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
                        <SubmitButton title="Verify" isLoading={busy} />
                        <Button onClick={resendCode}>Resend Confirmation Code</Button>
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
                    <SubmitButton title="Login" isLoading={busy} />
                </Form>
            </Modal>
        </Container>
    );
}

export default VerifyEmail;
