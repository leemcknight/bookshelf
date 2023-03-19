// @flow

import { Container, Row, Col, Form, FloatingLabel } from 'react-bootstrap';
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
            .then(() => navigate('/library'))
            .catch(error => {
                setError(error);
                setBusy(false);
            }
            )
    }

    return (
        <Form onSubmit={handleSignIn}>
            <Container>
                {error &&
                    <ErrorView error={error} />
                }
                <Row className="mb-3">
                    <Col>
                        <FloatingLabel label="Username" controlId='username'>
                            <Form.Control type="text" id='username' />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <FloatingLabel label="Password" controlId='password'>
                            <Form.Control type="password" placeholder="Password" id="password" />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row>
                    <Col className='md-auto'>
                        <SubmitButton title="Sign In" isLoading={busy} />
                    </Col>
                </Row>

            </Container>
        </Form>

    );
}
