import { useSelector } from 'react-redux';
import * as React from 'react';
import { RootState } from '../../store';
const { Container, Row, Col, Form, Button, Spinner } = require('react-bootstrap');
const { useUpdateUserProfileMutation, useGetUserProfileQuery } = require('../../services/BookshelfApi');
const { ErrorView } = require('../ErrorView');
const { SuccessView } = require('../SuccessView');

interface FormElements extends HTMLFormControlsCollection {
    email: string,
    displayName: string,
    about: string
}

interface UserProfileFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

function UserProfile(): JSX.Element {
    const currentUser = useSelector((state: RootState) => state.userSession);
    const [updateUserProfile, { isLoading, error, isSuccess, isError }] = useUpdateUserProfileMutation();
    const { data: profile, isFetching } = useGetUserProfileQuery(null, { skip: !currentUser });

    function handleSubmit(e: React.FormEvent<UserProfileFormElement>) {
        e.stopPropagation();
        e.preventDefault();
        const profile = {
            email: e.currentTarget.email,
            displayName: e.currentTarget.displayName,
            about: e.currentTarget.about
        }
        updateUserProfile(profile);
    }

    return (
        <Container>
            {isError && <ErrorView error={error} />}
            {isSuccess && <SuccessView message="Successfully updated profile." />}
            <Row>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={profile.email} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="displayName">
                            <Form.Label>Display Name</Form.Label>
                            <Form.Control type="text" placeholder="Display Name" value={profile.displayName} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="about">
                            <Form.Label>About Me</Form.Label>
                            <Form.Control type="text" placeholder="About Me" value={profile.about} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                            {(isLoading || isFetching) && <Spinner animation='border' variant='light' size='sm' />}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default UserProfile;