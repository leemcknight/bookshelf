// @flow

import { Form, Container, Row, Col, Jumbotron, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SubmitButton from '../components/SubmitButton';
import * as React from 'react';
import { Auth } from 'aws-amplify';
import { TUser } from '../types';
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
