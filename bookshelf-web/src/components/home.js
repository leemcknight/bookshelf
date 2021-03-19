import { withRouter } from "react-router-dom";
import {Container, Row, Col} from 'react-bootstrap';

function Home() {
    return (
        <Container>
            <Row>
                <Col>
                    My Books
                </Col>
            </Row>
        </Container>
    );
}

export default withRouter(Home);