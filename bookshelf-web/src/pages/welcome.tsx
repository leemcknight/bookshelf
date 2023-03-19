// @flow

import { Form, Container, Row, Col, Alert, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SubmitButton from '../components/SubmitButton';
import * as React from 'react';
import { Auth } from 'aws-amplify';
import { TUser } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThemedCard } from '../components/ThemedCard';
const { useState } = require('react');


type TWorkingState = {
    createAccountCallback: (user: TUser) => void
}

interface AccountFormElements extends HTMLFormControlsCollection {
    userName: string,
    password: string,
    displayName: string,
    firstname: string,
    lastName: string
}

interface AccountFormElement extends HTMLFormElement {
    readonly elements: AccountFormElements
}

function Welcome({ createAccountCallback }: TWorkingState): JSX.Element {
    const [error, setError] = useState();
    const [busy, setBusy] = useState(false);
    const navigate = useNavigate();

    async function createAccount(event: React.FormEvent<AccountFormElement>) {
        event.stopPropagation();
        event.preventDefault();
        try {
            setBusy(true);
            await Auth.signUp({
                username: event.currentTarget.userName,
                password: event.currentTarget.password,
                attributes: {
                    given_name: event.currentTarget.firstName,
                    family_name: event.currentTarget.lastName,
                    email: event.currentTarget.userName
                }
            });
            createAccountCallback({
                email: event.currentTarget.userName,
                firstName: event.currentTarget.firstName,
                lastName: event.currentTarget.lastName,
                displayName: event.currentTarget.firstName
            });
            setBusy(false);
            navigate('/confirm');
        } catch (error: any) {
            if (error.message) {
                setError(error.message);
            } else {
                setError(JSON.stringify(error));
            }
            setBusy(false);
        }

    }

    return (

        <Container>
            <Row className='mt-3' hidden={!error}>
                <Col><Alert variant='danger'>{error}</Alert></Col>
            </Row>

            <ThemedCard title='Create Account'>

                <Form onSubmit={createAccount}>
                    <Row>
                        <Col>

                            <FloatingLabel controlId="formFirstName" label="First Name" className="mb-3">
                                <Form.Control type="text" />
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel controlId="formLastName" label="Last Name" className="mb-3">
                                <Form.Control type="text" />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FloatingLabel controlId="formBasicEmail" label="Email" className="mb-3">
                                <Form.Control type="email" />
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel controlId="formBasicPassword" label="Password" className="mb-3">

                                <Form.Control type="password" />

                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <SubmitButton title="CreateAccount" isLoading={busy} />
                        </Col>
                    </Row>
                </Form>
            </ThemedCard>
        </Container>

    )
}

export default Welcome;
