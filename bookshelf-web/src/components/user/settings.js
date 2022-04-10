const { Container, Row, Col, Form, Button } = require('react-bootstrap');

function UserSettings() {

    function handleSubmit() {

    }

    return (
        <Container>
            <Row>
                <Col>
                    <Form onSubmit={() => handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="displayName">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="text" placeholder="Display Name" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>

    );
}

export default UserSettings;