import { Container, Row, Col, Alert } from 'react-bootstrap';

function SuccessView(props) {
    return (
        <Container>
            <Row>
                <Col><Alert variant='primary'>{props.message}</Alert></Col>
            </Row>
        </Container>
    )
}

export default SuccessView;