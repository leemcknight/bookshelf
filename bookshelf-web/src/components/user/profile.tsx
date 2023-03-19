import { useSelector } from 'react-redux';
import * as React from 'react';
import { RootState } from '../../store';
import { useAppSelector } from '../../hooks';
import { ThemedCard } from '../ThemedCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
const { Container, Row, Col, Form, Button, Spinner } = require('react-bootstrap');
const { useUpdateUserProfileMutation, useGetUserProfileQuery } = require('../../services/BookshelfApi');
const { ErrorView } = require('../ErrorView');
const { SuccessView } = require('../SuccessView');

interface FormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement,
    displayName: HTMLInputElement,
    about: HTMLInputElement
}

interface UserProfileFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

function UserProfile(): JSX.Element {
    const currentUser = useAppSelector(state => state.userSession)
    const [updateUserProfile, { isLoading, error, isSuccess, isError }] = useUpdateUserProfileMutation();
    const { data: profile, isFetching, isSuccess: profileRetrievalSuccess } = useGetUserProfileQuery({ skip: !currentUser });

    function handleSubmit(e: React.FormEvent<UserProfileFormElement>) {
        e.stopPropagation();
        e.preventDefault();
        const elements = e.currentTarget.elements
        const profile = {
            email: elements.email.value,
            displayName: elements.displayName.value,
            about: elements.about.value
        }
        updateUserProfile(profile);
    }

    return (
        <ThemedCard title="User Profile" icon={<FontAwesomeIcon icon={faUserEdit} />}>
            {isError && <ErrorView error={error} />}
            {isSuccess && <SuccessView message="Successfully updated profile." />}
            {isFetching && <Spinner animation="border" variant="success" size="sm" />}
            {profileRetrievalSuccess &&
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
                                {(isLoading) && <Spinner animation='border' variant='light' size='sm' />}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            }
        </ThemedCard>
    );
}

export default UserProfile;