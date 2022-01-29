import { Container, Row, Col, Alert } from 'react-bootstrap';

function ErrorView(props) {
    return (
        <Container>
            <Row>
                <Col><Alert variant='danger'>{props.error.message}</Alert></Col>
            </Row>
        </Container>
    )
}

export default ErrorView;