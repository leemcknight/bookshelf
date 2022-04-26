import { useSelector } from 'react-redux';
const { Container, Row, Col, Form, Button, Spinner } = require('react-bootstrap');
const { useUpdateUserProfileMutation, useGetUserProfileQuery } = require('../../services/BookshelfApi');
const { ErrorView } = require('../ErrorView');
const { SuccessView } = require('../SuccessView');

function UserProfile() {
    const currentUser = useSelector((state) => state.userSession.currentUser);
    const [updateUserProfile, { isLoading, error, isSuccess, isError }] = useUpdateUserProfileMutation();
    const { data: profile, isFetching } = useGetUserProfileQuery(null, { skip: !currentUser });

    function handleSubmit(e) {
        e.stopPropagation();
        e.preventDefault();
        const profile = {
            email: e.target.email.value,
            displayName: e.target.displayName.value,
            about: e.target.about.value
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
                            <Form.Control type="text" placeholder="Display Name" value={profile.email} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="about">
                            <Form.Label>About Me</Form.Label>
                            <Form.Control type="text" placeholder="About Me" value={profile.about} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                            {isLoading && <Spinner animation='border' variant='light' size='sm' />}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default UserProfile;