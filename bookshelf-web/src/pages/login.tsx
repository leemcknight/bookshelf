// @flow

import { Container, Row, Col, Form } from 'react-bootstrap';
import { useState } from 'react';
import * as React from 'react';
import ErrorView from '../components/ErrorView';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth'
import { login } from '../features/userSession';
import SubmitButton from '../components/SubmitButton';

export default function Login(): JSX.Element {

    interface FormElements extends HTMLFormControlsCollection {
        username: HTMLInputElement,
        password: HTMLInputElement
    }

    interface LoginFormElement extends HTMLFormElement {
        readonly elements: FormElements
    }

    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<Error>();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signIn = (username: string, password: string): Promise<CognitoUser> => Auth.signIn(username, password)

    async function handleSignIn(event: React.FormEvent<LoginFormElement>) {
        event.preventDefault();
        event.stopPropagation();
        const username = event.currentTarget.elements.username.value;
        const password = event.currentTarget.elements.password.value;
        setBusy(true);

        signIn(username, password)
            .then(user => user.getUsername())
            .then(userName => dispatch(login(userName)))
            .then(() => navigate('/home'))
            .catch(error => {
                setError(error);
                setBusy(false);
            }
            )
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
                        <SubmitButton title="Sign In" isLoading={busy} />
                    </Col>
                </Row>
            </Form>
        </Container>

    );
}
