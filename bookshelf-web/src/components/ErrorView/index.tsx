// @flow

import { Container, Row, Col, Alert } from 'react-bootstrap';
import * as React from 'react';


type TWorkingState = {
    error: any
}

function ErrorView({ error }: TWorkingState): JSX.Element {
    return (
        <Container>
            <Row>
                <Col><Alert variant='danger'>{error.message}</Alert></Col>
            </Row>
        </Container>
    )
}

export default ErrorView;